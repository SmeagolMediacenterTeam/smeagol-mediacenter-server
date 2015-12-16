GollumJS.NS(Server.Utils, function() {

	var Promise = require('rsvp').Promise;

	this.Promise = {
		
		resolve: function (data) {
			return new Promise(function(resolve, reject) {
				resolve(data);
			});
		},

		reject: function (error) {
			return new Promise(function(resolve, reject) {
				reject(error);
			});
		}
		 

	};

});
