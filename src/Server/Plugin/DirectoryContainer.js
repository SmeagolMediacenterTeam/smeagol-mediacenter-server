GollumJS.NS(Server.Plugin, function () {
	
	var Promise = GollumJS.Promise;
	var FS      = require('fs-promise');

	this.DirectoryContainer = new GollumJS.Class({

		Extends: Server.Plugin.Container,

		Static: {
			isPlugin:function (pluginPath) {
				return new Promise(function(resolve, reject) {
					FS.stat(pluginPath).
						then(function (stats) {
							if (!stats.isDirectory()) {
								resolve(false);
								return;
							}
							var pluginFile = pluginPath+'/'+Server.Plugin.Loader.PLUGIN_FILE_DESCRIPTOR;
							FS.stat(pluginFile).
								then(function (stats) {
									if (!stats.isFile()) {
										resolve(false);
										return;
									}
									resolve(true);
								}).
								catch (function (error) {
									reject(error);
								})
							;
						}).
						catch (reject)
					;

				});
			}

		},

		pathSource: null,

		initialize: function (pathSource) {
			this.pathSource = pathSource;
		},

		getRunPath: function () {
			return Server.Utils.Promise.resolve(this.pathSource);
		}
	});

});