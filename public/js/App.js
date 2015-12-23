GollumJS.NS(function() {

	var Promise = GollumJS.Promise;

	this.App = new GollumJS.Class({
		
		loaded: {},
		sass: null,

		initialize: function () {
			console.log("Start App");

			this.sass = new Sass();
			this.match($(document));
		},

		match: function (root) {
			var domComponents = root.find('component');
			var _this = this;

			return GollumJS.Utils.Collection.eachStep(domComponents, function (i, dom, step){
				var el   = $(dom);
				var id = el.attr('id');
				_this.display(el, id)
					.then(step)
					.catch(console.error)
				;
			});
		},

		display: function (el, id) {
			var _this = this;
			return this.load(id)
				.then(function (infos) {
					var html = $.parseHTML(infos.html);
					var div = $('<div>').append(html);
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
			return this._loadHtml(id)
				.then(function(html) {
					return _this._parseInfos(id, html);
				})
				.then(this._loadJS.bind(this))
				.then(this._loadCSS.bind(this))
				.then(function (infos) {
					_this.loaded[id] = infos;
					return infos;
				})
			;
		},

		_loadHtml: function(id) {
			return Ajax.request({
				url: this.getBaseUrl(id)+id.split(':')[2]+'.html'
			});
		},

		_parseInfos: function(id, html) {
			var match = html.match(/<!--{[\s\S]+}-->/);
			if (match) {
				var data = match[0].substr(match[0].indexOf('{'));
				data = data.substr(0, data.lastIndexOf('}')+1);
				html = html.substr(match[0].length);
				var json = {};
				try {
					json = JSON.parse(data);
				} catch (e) {
					console.error(e);
				}
				json = $.extend({
					id: id,
					html: html,
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
				return Ajax.request({
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
			if (json.css) {
				return Ajax.request({
					url: this.getBaseUrl(json.id)+json.css,
					dataType: 'text'
				})
					.then(function (content) {
						_this.sass.compile(content, function(result) {
							if (result.status) {
								throw new Error(result.message);
							} else {
								var style = $('<style>'+result.text+'</style>');
								style.appendTo(document.head);
							}
						});
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

		getBaseUrl: function(id) {

			var split      = id.split(':');
			var plugin     = split[0] ? +split[0]+'.static' : 'static';
			var controller = split[1];
			var action     = split[2];
			
			return '/'+plugin+'/components/'+controller+'/'+action+'/';
		}
	});

});