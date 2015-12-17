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

		beforeEnableProcess: function (done) {
			done();
		},

		enable: function (done) {
			done();
		},

		afterEnableProcess: function (done) {
			done();
		},

		beforeDisableProcess: function (done) {
			done();
		},

		disable: function (done) {
			done();
		},

		afterDisableProcess: function (done) {
			done();
		},

		toString: function() {
			return  this.container.metaInfos && this.container.metaInfos.id ? this.container.metaInfos.id : "IDModNotFound";
		}

	});
});
