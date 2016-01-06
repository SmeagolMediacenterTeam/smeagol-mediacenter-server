GollumJS.NS(App.Component, function() {

	var componentIndex = 0;
	
	this.Element = new GollumJS.Class({
		
		Extends: App.AHierarchyTree,

		name: null,
		uniqId: null,
		component: null,
		infos: null,
		options: null,
		dom: null,
		parentElement: null,
		
		initialize: function (component, parentElement, data) {
			this.component = component;
			this.uniqId    = ++componentIndex;
			this.name      = data.name    || null;
			this.options   = data.options || null;

			this.parentElement = parentElement;
			if (this.parentElement) {
				this.parentElement.addChild(this);
			} else {
				this.getManager().addChild(this);
			}

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
		beforeRender: function (done) {
			done();
		},
		
		/**
		 * Can be override
		 */
		afterDisplay: function() {
		}

	});

});