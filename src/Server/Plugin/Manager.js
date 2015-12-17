GollumJS.NS(Server.Plugin, function() {
	
	var Promise    = require('rsvp').Promise;
	var Collection = GollumJS.Utils.Collection;

	var callForAllPlugins = function (iterable, cbName) {
		return new Promise(function(resolve, reject) {
			Collection.eachStep(iterable, function (i, plugin, step) {
				try {
					plugin[cbName](function() {
						step();
					});
				} catch (e) {
					console.error(e);
					step();
				}
			},
			function () {
				resolve();
			});
		});
	};

	this.Manager = new GollumJS.Class({

		server: null,
		plugins: [],

		initialize: function (server) {
			this.server = server;
		},

		init: function () {
			console.log ('Initialize Plugin Manager');
			return this.loadPlugins()
				.then(function(plugins) {
		  			console.log ("Plugin loaded[ "+plugins+" ]");
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
			console.log ('Start Plugin Manager');
			var _this = this;
			return this._beforeEnableProcess()
				.then (function () { return _this.enable(_this.plugins) })
				.then (this._afternableProcess.bind(this))
			;
		},

		enable: function (plugins) {
			console.log("Plugin Manager: enable plugin: [ "+plugins+" ]");
			return callForAllPlugins(plugins, 'enable');
		},

		_beforeEnableProcess: function () {
			console.log("Plugin Manager: before load process");
			return callForAllPlugins(this.plugins, 'beforeEnableProcess');
		},

		_afternableProcess: function () {
			console.log("Plugin Manager: after load process");
			return callForAllPlugins(this.plugins, 'afterEnableProcess');
		}

	});

});