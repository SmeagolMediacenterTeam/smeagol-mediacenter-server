GollumJS.NS(Server, function() {

	var Promise = require('rsvp').Promise;
	var needle = require('needle');

	this.Request = new GollumJS.Class({
		
		get: function (url, param) {
			return new Promise(function(resolve, reject) {
				param= param || {};
				needle.get(url, function(error, response) {
					if (error) {
						reject(error);
						return;
					} 
					if (param.resolveWithFullResponse) {
						resolve(response);
					} else {
						resolve(response.body);
					}
				});
		 	});
		}

	});

});