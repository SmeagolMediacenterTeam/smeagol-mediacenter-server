GollumJS.NS(function() {

	var Promise = GollumJS.Promise;
	var ajax = new Ajax;


	this.App = new GollumJS.Class({
		
		loaded: {},
		sass: null,

		initialize: function () {
			console.log("Start App");

			this.sass = new Sass();
			this.match();
		},

		match: function (root) {
			root = root || $(document);
			var domComponents = root.find('component');
			var _this = this;

			return GollumJS.Utils.Collection.eachStep(domComponents, function (i, dom, step){
				var el   = $(dom);
				var id = el.attr('id');
				var options = {};

				_this.display(el, id, options)
					.then(step)
					.catch(console.error)
				;
			});
		},

		display: function (el, id, options) {
			var _this = this;
			return this.load(id)
				.then(function (infos) {
					var html = ejs.render(infos.tpl, options) ;
					var dom = $.parseHTML(html);
					var div = $('<div>').append(dom);
					return _this.match(div)
						.then(function (infos) {
							el.after(div.contents());
							el.remove();
							return infos;
						})

					;
				})
				.catch(function(e) {
					console.error(e);
				})
			;
		},

		load: function(id) {
			if (this.loaded[id]) {
				return Promise.resolve(this.loaded[id]);
			}

			var _this = this;
			return this._loadTpl(id)
				.then(function(tpl) {
					return _this._parseInfos(id, tpl);
				})
				.then(this._loadJS.bind(this))
				.then(this._loadCSS.bind(this))
				.then(function (infos) {
					_this.loaded[id] = infos;
					return infos;
				})
			;
		},

		_loadTpl: function(id) {
			return ajax.request({
				url: this.getBaseUrl(id)+id.split(':')[2]+'.ejs'
			});
		},

		_parseInfos: function(id, tpl) {
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
					id: id,
					tpl: tpl,
					'class': null,
					js: null,
					css: null,
					load: false
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
							_this.sass.compile(content, function(result) {
								if (result.status) {
									throw new Error(result.message);
								} else {
									// TODO replace if exist
									var style = $('<style data-src="'+url+'" >'+"\n/* "+url+" */\n\n"+result.text+'</style>');
									style.appendTo(document.head);
								}
							});
						})
						.then(function () {
							step();
						})
						.catch(function (e) {
							console.error('Error on load component JS:', json.id, e);
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

		getBaseUrl: function(id) {

			var split      = id.split(':');
			var plugin     = split[0] ? +split[0]+'.static' : 'static';
			var controller = split[1];
			var action     = split[2];
			
			return '/'+plugin+'/components/'+controller+'/'+action+'/';
		}
	});

});