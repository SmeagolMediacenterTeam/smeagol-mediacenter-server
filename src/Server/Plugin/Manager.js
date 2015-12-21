GollumJS.NS(Server.Plugin, function() {

	var FS         = require('fs-promise');
	var Promise    = GollumJS.Promise;
	var Collection = GollumJS.Utils.Collection;

	var callForAllPlugins = function (iterable, cbName) {
		return Collection.eachStep(iterable, function (i, plugin, step) {
			try {
				plugin[cbName](function() {
					step();
				});
			} catch (e) {
				console.error(e);
				step();
			}
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
					console.error ("Error to load all plugin", error);
				})
			;
		},

		loadPlugins: function () {
			var _this = this;
			return (new Server.Plugin.Loader(this)).loadAll()
				.then(function (plugins) {
					_this.plugins = plugins;
					return Promise.resolve(plugins);
				})
			;
		},

		start: function () {
			console.log ('Start Plugin Manager');
			return this.enable(this.plugins)
				.then(this._registerStaticPath.bind(this))
			;
		},

		_registerStaticPath: function() {
			var _this = this;
			return Collection.eachStep(this.plugins, function (i, plugin, step) {
				plugin.container.getRunPath()
					.then(function(runPath) {
						var staticPath = runPath + '/public';
						return FS.exists(staticPath)
							.then(function(exist) {
								if (exist) {
									return FS.stat(staticPath)
										.then(function(stat){
											if (stat.isDirectory()) {
												_this.server.http.registerStaticPath('/'+plugin.id()+'-static', staticPath);
											}
										})
									;
								}
							})
						;
					})
					.then(step)
					.catch (function (e) {
						console.error(e);
						step();
					})
				;
			});
		},

		enable: function (plugins) {
			console.log("Plugin Manager: Start enable plugins: [ "+plugins+" ]");
			return this._beforeProcessEnableProcess()
				.then(function () { 
					console.log("Plugin Manager: Enable plugins: [ "+plugins+" ]");
					return callForAllPlugins(plugins, 'enable'); 
				})
				.then(this._afterProcessEnable.bind(this))
			;
		},

		getPlugin: function (id) {
			for (var i = 0; i < this.plugins.length; i++) {
				if (this.plugins[i].id() == id) {
					return this.plugins[i];
				}
			}
			return null;
		},

		_beforeProcessEnableProcess: function () {
			console.log("Plugin Manager: before load process");
			return callForAllPlugins(this.plugins, 'beforeProcessEnable');
		},

		_afterProcessEnable: function () {
			console.log("Plugin Manager: after load process");
			return callForAllPlugins(this.plugins, 'afterProcessEnable');
		}

	});

});