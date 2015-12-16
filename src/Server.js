GollumJS.NS(null, function() {

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
			return new Promise(function(resolve, reject) {
				(new Server.Plugin.Loader()).load().
				then(function (plugins) {
					_this.plugins = plugins;
					resolve(plugins);
				}).
				catch(function (error) {
					reject(error);
				});
			});
		}
	});

});