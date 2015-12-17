GollumJS.NS(function() {

	var Path    = require('path');
	var Promise = require('rsvp').Promise;

	this.Server = new GollumJS.Class({
		
		pluginsManager: null,
		http: null,

		initialize: function () {
			console.log ('Initialize SMC Server');
			this.pluginsManager = new Server.Plugin.Manager(this);
			this.http           = new Server.Http(this);

			this.init()
				.then(this.start.bind(this))
				.catch(function (error) {
					console.error ("Server: Error on Runtime:", error);
				})
			;
		},

		init: function () {
			return this.pluginsManager.init()
				.then(this.http.init.bind(this.http))
			;
		},

		start: function () {
			console.log ('Start SMC Server');
			return this.pluginsManager.start()
				.then(this.http.start.bind(this.http))
			;
		},

		getRootPath: function () {
			return Path.resolve("./");
		}
	});

});