GollumJS.NS(Ajax, function() {

	var JSON = JSON3;

	this.Proxy = new GollumJS.Class({

		Extends: Ajax,

		initialize: function() {
			this.parent().apply(this, arguments);
		},


		request: function (param) {

			console.log (JSON, param);

			return this.parent().request(param);
		}
	});

});