GollumJS.NS(Server.Plugin, function () {
	
	var Promise = require('rsvp').Promise;
	var fs      = require('fs-promise');

	this.DirectoryContainer = new GollumJS.Class({

		Extends: Server.Plugin.Container,

		Static: {
			isPlugin:function (pluginPath) {
				return new Promise(function(resolve, reject) {
					fs.stat(pluginPath).
						then(function (stats) {
							if (!stats.isDirectory()) {
								resolve(false);
								return;
							}
							var pluginFile = pluginPath+'/'+Server.Plugin.Loader.PLUGIN_FILE_DESCRIPTOR;
							fs.stat(pluginFile).
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
		}
		
	});

});