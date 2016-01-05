GollumJS.NS(App, function() {

	var Promise = GollumJS.Promise;
	var ajax = new Ajax.Proxy;

	this.Component = new GollumJS.Class({
		
		id: null,
		manager: null,
		infos: null,

		initialize: function (id, manager) {
			this.id = id;
			this.manager = manager;
		},

		display: function (el) {
			var _this = this;
			var options = {}; // TODO mapper les options depuis l'element DOM

			return this.load()
				.then(function (infos) {

					infos = GollumJS.Utils.clone(infos);
					var element = null;

					try {
						if (infos['class']) {

							var clazz = GollumJS.Reflection.ReflectionClass.getClassByName(infos['class']);
							if (!clazz) {
								throw new GollumJS.Exception('Class '+infos['class']+' not found for component id:', _this.id);
							}
							if (!GollumJS.Utils.isGollumJsClass(clazz) || clazz.getExtendsClass().indexOf(App.Component.Element) == -1) {
								throw new GollumJS.Exception('Class '+infos['class']+' not an extend of App.Component.Element for component id:', _this.id);
							}
							element = new clazz(_this);
						}
					} catch (e) {
						console.error(e);
					}

					var render = function() {

						if (element) {
							infos = element.infos;
							options = element.options;
						}

						var html = ejs.render(infos.tpl, options);
						var dom = $.parseHTML(html);
						var div = $('<div>').append(dom);

						if (element) {
							element.dom = dom;
							element.afterDisplay(options);
						}

						return _this.manager.match(div)
							.then(function () {
								el.after(div.contents());
								el.remove();
								return infos;
							})
						;
					}

					if (element) {
						return new Promise(function (resolve, reject) {
							try {
								element.infos = infos,
								element.options = options,
								element.beforeRender(function () {
									resolve(render());
								});
							} catch(e) {
								reject(e);
							}
						});
						
					} else {
						return render();
					}

					
				})
				.catch(function(e) {
					console.error(e);
				})
			;
		},

		load: function() {
			if (this.infos) {
				return Promise.resolve(this.infos);
			}

			var _this = this;
			return this._loadTpl()
				.then(function(tpl) {
					return _this._parseInfos(tpl);
				})
				.then(this._loadJS.bind(this))
				.then(this._loadCSS.bind(this))
				.then(function (infos) {
					_this.infos = infos;
					return _this.infos;
				})
			;
		},

		_loadTpl: function() {
			return ajax.request({
				url: this.getBaseUrl(this.id)+this.id.split(':')[2]+'.ejs'
			});
		},

		_parseInfos: function(tpl) {
			var match = tpl.match(/<% \/\*{[\s\S]+}\*\/ %>/);
			if (match) {
				var data = match[0].substr(match[0].indexOf('{'));
				data = data.substr(0, data.lastIndexOf('}')+1);
				var json = {};
				try {
					json = JSON.parse(data);
				} catch (e) {
					console.error(e);
				}
				json = $.extend({
					id: this.id,
					tpl: tpl,
					'class': null,
					js: null,
					css: null,
				}, json);
				return json;
			}

		},

		_loadJS: function(json) {
			if (json.js) {
				return ajax.request({
					url: this.getBaseUrl(json.id)+json.js,
					dataType: 'text'
				})
					.then(function (content) {
						eval(content);
						return json;
					})
					.then(function () {
						return json;
					})
					.catch(function (e) {
						console.error('Error on load component JS:', json.id, e);
						return json;
					})
				;
			}
			return Promise.resolve(json);
		},

		_loadCSS: function(json) {
			var _this = this;

			cssFiles = json.css;

			if (cssFiles) {
				if (typeof cssFiles == 'string') {
					cssFiles = [cssFiles];
				}
				
				return GollumJS.Utils.Collection.eachStep(cssFiles, function (i, file, step) {

					if (!file) {
						step();
						return;
					}

					var url = _this.getBaseUrl(json.id)+file;

					ajax.request({
						url: url,
						dataType: 'text'
					})
						.then(function (content) {
							_this.manager.sass.compile(content, function(result) {
								try {
									if (result.status) {
										throw new GollumJS.Exception(result.message);
									} else {
										// TODO replace if exist
										var style = $('<style data-src="'+url+'" >'+"\n/* "+url+" */\n\n"+result.text+'</style>');
										style.appendTo(document.head);
									}
								} catch (e) {
									console.error('Error on compile component CSS:', json.id, e);
								}
							});
						})
						.then(function () {
							step();
						})
						.catch(function (e) {
							console.error('Error on load component CSS:', json.id, e);
							step();
						})
					;
				})
					.then(function () {
						return json;
					})
				;
			}
			return Promise.resolve(json);
		},

		getBaseUrl: function() {

			var split      = this.id.split(':');
			var plugin     = split[0] ? +split[0]+'.static' : 'static';
			var controller = split[1];
			var action     = split[2];
			
			return '/'+plugin+'/components/'+controller+'/'+action+'/';
		}

	});

});