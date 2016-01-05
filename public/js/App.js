GollumJS.NS(function() {

	this.App = new GollumJS.Class({
		
		initialize: function () {
			console.log("Start App");

			this.componentManager = new App.Component.Manager(this);
		}

	});

});