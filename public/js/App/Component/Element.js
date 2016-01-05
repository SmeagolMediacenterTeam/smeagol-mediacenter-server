GollumJS.NS(App.Component, function() {
	
	this.Element = new GollumJS.Class({

		component: null,
		dom: null,
		
		initialize: function (component) {
			this.component = component;
			this.init();
		},

		getApp: function () {
			return this.component.manager.app;
		},

		getManager: function () {
			return this.component.manager;
		},
		
		/**
		 * Can be override
		 */
		init: function () {
		},
		
		/**
		 * Can be override
		 */
		beforeRender: function (infos, options, done) {
			done();
		},
		
		/**
		 * Can be override
		 */
		afterDisplay: function(options) {
		}

	});

});