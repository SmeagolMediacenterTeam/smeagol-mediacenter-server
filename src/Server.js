GollumJS.NS(function() {

	var Path    = require('path');
	var Promise = require('rsvp').Promise;

	this.Server = new GollumJS.Class({
		
		pluginsManager: null,

		initialize: function () {
			console.log ('Initialize SMC Server');
			this.pluginsManager = new Server.Plugin.Manager(this);

			this.init()
				.then(this.start.bind(this))
				.catch(function (error) {
					console.error ("Server: Error on Runtime:", error);
				})
			;
		},

		init: function () {
			return this.pluginsManager.init();
		},

		start: function () {
			console.log ('Start SMC Server');
			return this.pluginsManager.start();
		},

		getRootPath: function () {
			return Path.resolve("./");
		}
	});

});