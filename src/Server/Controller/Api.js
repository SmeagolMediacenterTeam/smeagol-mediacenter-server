GollumJS.NS(Server.Controller, function() {

	var JSON = require('json3');

	this.Api = new GollumJS.Class({
		
		Extends: Server.Controller,

		beforeAction: function (action, req, res, done) {
			res.setHeader('Content-Type', 'application/json');
			res.setHeader('Access-Control-Allow-Origin', '*');
			done();
		},

		actions: {

			'/group': function(req, res, done) {
				this.server().mediasManager.getGroups()
					.then(function(groups) {
						res.end(JSON.stringify(groups));
						done();
					})
					.catch(function (error) {
						console.error(error);
						res.end(JSON.stringify(null));
						done();
					})
				;
			},
			'/media/:group': function(req, res, done) {
				var medias = this.server().mediasManager.getMedias(req.params.group);
				res.end(JSON.stringify(medias));
				done();
			},
			'/media/:group/:source/:id': function(req, res, done) {
				var source = this.server().mediasManager.getSource(req.params.source);
				if (source) {
					source.getDetails(req.params.group, req.params.id)
						.then(function(datails) {
							res.end(JSON.stringify(datails));
							done();
						})
						.catch(function (error) {
							console.error(error);
							res.end(JSON.stringify(null));
							done();
						})
					;
				} else {
					console.warn("Source \""+req.params.source+"\" not found");
					done();
				}
			}
		}

	});

});