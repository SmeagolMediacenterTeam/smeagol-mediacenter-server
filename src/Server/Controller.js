GollumJS.NS(Server, function() {

	this.Controller = new GollumJS.Class({
		http: null,

		initialize: function (http) {
			this.http = http;
		},

		actions: {
		},

		beforeAction: function (action, req, res, done) {
			done();
		},

		afterAction: function (action, req, res, done) {
			done();
		},

		server: function () {
			return this.http.server;
		}
		
	});

});