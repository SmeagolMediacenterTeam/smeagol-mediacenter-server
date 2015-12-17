GollumJS.NS(Server.Plugin, function() {

	var Promise = require('rsvp').Promise;
	var FS      = require('fs-promise');

	this.Container = new GollumJS.Class({
		
		metaInfos: null,

		getRunPath: function () {
			return Server.Utils.Promise.reject(new GollumJS.Exception('Not implemented, can be override.'));
		},

		getInclude: function () {

			var _this = this;
			
			return _this.getRunPath().
				then(function (runPath) {
					
					var includeFile = runPath+'/'+Server.Plugin.Loader.PLUGIN_FILE_INCLUDE;
					
					return FS.exists(includeFile).
						then(function (exist) {
							if (exist) {
								return FS.readFile(includeFile, "utf8").
									then(JSON.parse)
								;
							} else {
								return Server.Utils.Promise.resolve([]);
							}
						})
					;
				})
			;
		}
		
	});

});