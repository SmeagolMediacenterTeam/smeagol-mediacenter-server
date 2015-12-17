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
				this.server().mediasManager.getMedias('serie')
					.then(function (medias) {
						res.end(JSON.stringify(medias));
						done();
					})
				;
			}
		}

	});

});