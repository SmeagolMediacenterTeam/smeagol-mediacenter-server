GollumJS.NS(Server.Controller, function() {

	var JSON = require('json3');

	this.App = new GollumJS.Class({
		
		Extends: Server.Controller,

		beforeAction: function (action, req, res, done) {
			res.setHeader('Content-Type', 'text/html');
			res.setHeader('Access-Control-Allow-Origin', '*');
			done();
		},

		actions: {

			'/': function(req, res, done) {
				res.sendFile(GollumJS.getParameter('node.run_path')+'/public/index.html');
			}
		}

	});

});