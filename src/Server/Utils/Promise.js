GollumJS.NS(Server.Utils, function() {

	var Promise    = require('rsvp').Promise;
	var Collection = GollumJS.Utils.Collection;

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
		},
		
		eachStep: function (iterable, cbIter, cbStep) {
			return new Promise(function(resolve, reject) {
				Collection.eachStep(iterable, cbIter,
				function () {
					resolve();
				}, cbStep);
			});
		}

	};

});
