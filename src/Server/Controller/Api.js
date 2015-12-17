GollumJS.NS(Server.Controller, function() {

	this.Api = new GollumJS.Class({
		
		Extends: Server.Controller,

		beforeAction: function (action, req, res, done) {
			res.setHeader('Content-Type', 'application/json');
			res.setHeader('Access-Control-Allow-Origin', '*');
			done();
		},

		actions: {

			'/series': function(req, res, done) {
				var list = [];
				res.end(JSON.stringify(list));
				done();
			}
		}

	});

});