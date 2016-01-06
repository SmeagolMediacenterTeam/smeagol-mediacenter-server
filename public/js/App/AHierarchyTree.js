GollumJS.NS(App, function() {

	this.AHierarchyTree = new GollumJS.Class({

		Static: {
			KEYWORD_TARGET: '_target',
			KEYWORD_PARENT: '_parent',
			KEYWORD_ROOT: '_root'
		},

		instanceChilds: {},


		addChild: function (element, fieldName) {
			fieldName = fieldName || 'childs';
			var isKeyword = this._isKeyword(element.name);

			if (!element.name || isKeyword) {
				if (isKeyword) {
					console.warn('Can not use keyword \''+element.name+'\' for name a component instance. This component will be renamed.');
				}
				element.name = App.Component.Manager.DEFAULT_INSTANCE_NAME + '_'+element.uniqId;
			}
			while (this.instanceChilds[element.name]) {
				element.name += '_'+element.uniqId;
			}
			this.instanceChilds[element.name] = element;
		},

		newComponentInstanceById: function (id, param, options, contentEjs) {

			var el = $('<component id="'+id+'" >'+contentEjs+'</component>');
			var div = $('<div>').append(el);

			for (var i in param) {
				el.attr(param, param[i]);
			}
			for (var i in options) {
				el.attr("options-"+options, param[i]);
			}

			return this.getManager().match(div, this)
				.then (function(elements) {
					if (elements.length) {
						return elements[0];
					}
					return null;
				})
			;
		},

		find: function (path) {

			var split = path.split('.');
			var name = split.shift();
			var subPath = split.join('.');
			var target = null;

			if (name == this.self.KEYWORD_ROOT) {
				target = this.getManager();
			} else if (name == this.self.KEYWORD_PARENT) {
				target = this.getParentElement();
			} else if (name == this.self.KEYWORD_TARGET) {
				target = this;
			} else {
				target = this.getChildByName(name);
			}

			if (target) {
				if (split.length) {
					return target.find(subPath);
				}
				return target;
			}

			console.log ('Component with path \''+path+'\' not found');
			return null;

		},

		getChildByName: function (name) {
			for (var key in this.instanceChilds) {
				if (key == name) {
					return this.instanceChilds[key];
				}
			}
			console.warn('Element '+name+' not found in ', this);
			return null;
		},

		_isKeyword: function (str) {
			return
				str == this.self.KEYWORD_TARGET ||
				str == this.self.KEYWORD_PARENT ||
				str == this.self.KEYWORD_ROOT
			;
		},

		getManager: function () {
			throw GollumJS.Exception('must be override');
		},

		getParentElement: function () {
			throw GollumJS.Exception('must be override');
		}

	});

});