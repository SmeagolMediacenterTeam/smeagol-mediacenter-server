GollumJS.NS(App, function() {

	this.AHierarchyTree = new GollumJS.Class({

		instanceChilds: {},
		
		addChild: function (element, fieldName) {
			fieldName = fieldName || 'childs';

			if (!element.name) {
				element.name = App.Component.Manager.DEFAULT_INSTANCE_NAME + '_'+element.uniqId;
			}
			while (this.instanceChilds[element.name]) {
				element.name += '_'+element.uniqId;
			}
			this.instanceChilds[element.name] = element;
		},
		
		newComponentInstanceById: function (id, param, options) {

		}

	});

});