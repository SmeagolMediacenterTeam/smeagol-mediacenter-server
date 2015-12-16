GollumJS.NS(Server.Plugin, function() {

	var fs      = require('fs-promise');
	var Promise = require('rsvp').Promise;

	this.Loader = new GollumJS.Class({
		
		Static: {
			PLUGIN_DIR: 'plugins',
			PLUGIN_FILE_DESCRIPTOR: 'plugin.json'
		},

		initialize: function () {
		},

		load: function () {
			var _this = this;
			return new Promise(function(resolve, reject) {

				var plugins     = [];
				var pluginsPath = './'+_this.self.PLUGIN_DIR;

				fs.readdir(pluginsPath).
					then(function (files) {

						var step = GollumJS.Utils.step(files.length, function () {
							resolve(plugins);
						});

						GollumJS.Utils.each(files, function (i, file) {
							var pluginPath = pluginsPath+'/'+file;
							fs.stat(pluginPath).
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
								catch(console.error)
							;
						});
					}).
					catch(function (err) {
						console.error (err);
						reject(err);
					})
				;
			});
		}
		
	});
});