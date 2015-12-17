GollumJS.NS(Server, function() {

	this.Controller = new GollumJS.Class({
		
		actions: {
		},

		beforeAction: function (action, req, res, done) {
			done();
		},

		afterAction: function (action, req, res, done) {
			done();
		}
		
	});

});