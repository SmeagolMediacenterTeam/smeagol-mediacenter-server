GollumJS.NS(function() {

	var Path    = require('path');
	var Promise = require('rsvp').Promise;

	this.Server = new GollumJS.Class({
		
		plugins: [],

		initialize: function () {
			console.log ('Start SMC Server');

			this.loadPlugins().
			then(function(plugins) {
	  			console.log ("Plugin loaded", plugins);
			}).
			catch(function(error) {
	  			console.log ("Error to load plugin", error);
			});
		},

		loadPlugins: function () {
			var _this = this;
			return (new Server.Plugin.Loader(this)).loadAll().
				then(function (plugins) {
					_this.plugins = plugins;
					return Server.Utils.Promise.resolve(plugins);
				})
			;
		},

		getRootPath: function () {
			return Path.resolve("./");
		}
	});

});