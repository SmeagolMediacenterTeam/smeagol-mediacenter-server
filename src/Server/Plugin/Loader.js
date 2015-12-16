GollumJS.NS(Server.Plugin, function() {

	var FS      = require('fs-promise');
	var Promise = require('rsvp').Promise;

	this.Loader = new GollumJS.Class({
		
		Static: {
			PLUGIN_DIR: 'plugins',

			PLUGIN_FILE_DESCRIPTOR: 'plugin.json',
			PLUGIN_FILE_INCLUDE   : 'include.json'
		},

		server: null,

		initialize: function (server) {
			this.server = server;
		},

		loadAll: function () {
			return this._search()
				.then(this._load.bind(this))
				.then(this._createPluginObject.bind(this))
			;
		},

		_search: function () {
			var _this = this;
			return new Promise(function(resolve, reject) {

				var plugins     = [];
				var pluginsPath = _this.server.getRootPath()+'/'+_this.self.PLUGIN_DIR;

				FS.readdir(pluginsPath).
					then(function (files) {

						var step = GollumJS.Utils.step(files.length, function () {
							resolve(plugins);
						});

						GollumJS.Utils.each(files, function (i, file) {
							var pluginPath = pluginsPath+'/'+file;
							FS.stat(pluginPath).
								then(function (stats) {
									if (stats.isDirectory()) {
										Server.Plugin.DirectoryContainer.isPlugin(pluginPath).
											then(function(isPlugin) {
												if (isPlugin) {
													plugins.push(new Server.Plugin.DirectoryContainer(pluginPath));
												};
												step();
											}).
											catch(console.error)
										;
									} else {
										// TODO ZipContainer not implemented
										step();
									}
								}).
								catch(function () {
									console.error
									step();
								})
							;
						});
					}).
					catch(function (err) {
						console.error (err);
						reject(err);
					})
				;
			});
		},

		_load: function (pluginContainers) {

			var _this = this;

			return new Promise(function(resolve, reject) {

				var step = GollumJS.Utils.step(pluginContainers.length, function () {
					resolve(pluginContainers);
				});

				GollumJS.Utils.each(pluginContainers, function (i, container) {
					try {
						_this._loadMetaInfosFile (container)
							.then(function ()      { return container.getInclude();                       })
							.then(function (files) { return _this._requireJsFile     (container, files);  })
							.then(step)
							.catch (function (e) {
								throw e;
							})
						;
					} catch (e) {
						console.log (e);
						step();
					}
				});
			});
		},

		_loadMetaInfosFile: function (container) {
			var _this = this;
			return container.getRunPath()
				.then(function (runPath) {
					return FS.readFile(runPath+'/'+_this.self.PLUGIN_FILE_DESCRIPTOR, "utf8").
						then(JSON.parse)
					;
				})
				.then(function (json) {
					container.metaInfos = json;
					console.log ("SMC Loader: load meta infos for \"" + container.metaInfos.name + "\"");
					return Server.Utils.Promise.resolve(container.metaInfos);
				})
			;
		},

		_requireJsFile: function (container, files) {
			return container.getRunPath().
				then(function(runPath) {
					return new Promise(function(resolve, reject) {

						var step = GollumJS.Utils.step(files.length, function () {
							console.log ("SMC Loader: JS files are loaded");
							resolve();
						});

						GollumJS.Utils.each(files, function (i, file) {
							try {
								var jsFilePath = runPath+"/"+file;
								console.info ("SMC Loader: load JS file:", jsFilePath);
								require(jsFilePath);
								step();
							} catch (e) {
								console.log (e);
								step();
							}
						});
					});
				})
			;
		},

		
		_createPluginObject: function (pluginContainers) {
			var plugin = [];
			
			return Server.Utils.Promise.resolve(plugin);
			/*
			console.info ("Create plugin instance", container.metaInfos.name);
			return new Promise(function(resolve, reject) {
				console.log ("metaInfos", metaInfos);
				resolve();
			});
			*/
		}
		
		
	});
});