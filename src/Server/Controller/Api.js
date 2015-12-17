GollumJS.NS(Server.Controller, function() {

	this.Api = new GollumJS.Class({
		
		Extends: Server.Controller,

		beforeAction: function (action, req, res, done) {
			res.setHeader('Content-Type', 'application/json');
			res.setHeader('Access-Control-Allow-Origin', '*');
			done();
		},

		actions: {

			'/serie': function(req, res, done) {
				var medias = this.server().mediasManager.getMedias('serie')
				res.end(JSON.stringify(medias));
				done();
			}
		}

	});

});