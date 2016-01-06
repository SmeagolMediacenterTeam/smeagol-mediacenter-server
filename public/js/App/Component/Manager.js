GollumJS.NS(App.Component, function() {

	this.Manager = new GollumJS.Class({
		
		Extends: App.AHierarchyTree,

		Static: {
			DEFAULT_INSTANCE_NAME: 'instance'
		},

		components: {},
		app: null,
		sass: null,

		initialize: function (app) {
			this.app = app;
			this.sass = new Sass();

			this.match()
				.catch (function(e) {
					console.error(e);
				})
			;
		},

		match: function (root, parent) {
			root = root || $(document);
			parent = parent || null;
			var domComponents = root.find('component');
			var _this = this;

			return GollumJS.Utils.Collection.eachStep(domComponents, function (i, dom, step){
				
				var el   = $(dom);
				var id = el.attr('id');

				var component = _this.getComponent(id);
				
				component.display(el, parent)
					.then(step)
					.catch(console.error)
				;
			});
		},

		getComponent: function (id) {
			if (!this.components[id]) {
				 this.components[id] = new App.Component(id, this);
			}
			return this.components[id];
		}

	});

});