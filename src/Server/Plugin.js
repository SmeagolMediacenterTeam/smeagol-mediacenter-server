GollumJS.NS(Server, function() {

	this.Plugin = new GollumJS.Class({

		Static: {
			instance: null,
		},

		container: null,
		isEnable: false,

		initialize: function (container) {
			this.container = container;
		},

		beforeEnableProcess: function () {
		},

		enable: function () {
		},

		afterEnableProcess: function () {
		},

		beforeDisableProcess: function () {
		},

		disable: function () {
		},

		afterDisableProcess: function () {
		}

	});
});
