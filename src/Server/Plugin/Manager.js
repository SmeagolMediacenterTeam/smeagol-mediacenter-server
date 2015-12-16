GollumJS.NS(Server.Plugin, function() {

	var Promise    = require('rsvp').Promise;
	var Collection = GollumJS.Utils.Collection;

	this.Manager = new GollumJS.Class({

		server: null,
		plugins: [],

		initialize: function (server) {
			console.log ('Initialize Plugin Manager');
			this.server = server;
		},

		init: function () {
			return this.loadPlugins()
				.then(function(plugins) {
		  			console.log ("Plugin loaded", plugins);
				})
				.catch(function(error) {
		  			console.log ("Error to load all plugin", error);
				})
			;
		},

		loadPlugins: function () {
			var _this = this;
			return (new Server.Plugin.Loader(this)).loadAll()
				.then(function (plugins) {
					_this.plugins = plugins;
					return Server.Utils.Promise.resolve(plugins);
				})
			;
		},

		start: function () {
			var _this = this;
			return this._beforeEnableProcess('beforeEnableProcess')
				.then (function () { return _this.enable(_this.plugins) })
				.then (function () { return _this._callForAllPlugins('afterEnableProcess') })
			;
		},

		enable: function(plugins) {
			var _this = this;
			return new Promise(function(resolve, reject) {
				Collection.eachStep(plugins, function (i, plugin, step) {
					try {
						plugin.enable();
						plugin.isEnable = true;
					} catch (e) {
						console.error(e);
					}
					step();
				},
				function () {
					resolve();
				});
			}); 
		},

		_callForAllPlugins: function (cbName) {
			var _this = this;
			return new Promise(function(resolve, reject) {
				Collection.eachStep(_this.plugins, function (i, plugin, step) {
					try {
						plugin[cbName]();
					} catch (e) {
						console.error(e);
					}
					step();
				},
				function () {
					resolve();
				});
			});
		},

		_beforeEnableProcess: function () {
			return this._callForAllPlugins('beforeEnableProcess');
		},

		_afternableProcess: function () {
			return this._callForAllPlugins('afterEnableProcess');
		}

	});

});