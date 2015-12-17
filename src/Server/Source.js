GollumJS.NS(Server, function() {

	var Promise = require('rsvp').Promise;

	this.Source = new GollumJS.Class({

		getMedias: function (group) {
			return new Promise(function(resolve, reject) {
				resolve([]);
			});
		}

	});

});