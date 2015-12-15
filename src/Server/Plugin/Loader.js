Server.Plugin.Loader = new GollumJS.Class({
	
	Static: {
		PLUGIN_DIR: 'plugins'
	},

	initialize: function () {
	},

	load: function (cb) {

		var plugins     = [];
		var fs          = require('fs');
		var pluginsPath = './'+this.self.PLUGIN_DIR;

		fs.readdir(pluginsPath, function (err, files) {

			if (err) {
				console.error (err);
				cb(err, null);
				return;
			}

			var step = GollumJS.Utils.step(files.length, function () {
				cb(null, plugins);
			});

			for (var i = 0; i < files.length; i++) {
				// TODO Zip file not implement
				var file = files[i];
				fs.stat(pluginPath, function (err, stats) {
					if (err) {
						console.error (err);
					}
					if (stats.isDirectory()) {
						console.log (pluginPath);
						step();
					} else {
						// TODO ZipContainer not implemented
						step();
					}
				})
			}
		});
		
	}
	
});