GollumJS.NS(Server, function() {

	var Promise = GollumJS.Promise;

	this.Source = new GollumJS.Class({

		plugin: null,
		name: null,

		initialize: function (plugin, name) {
			name = name || "";
			this.plugin = plugin;
			this.name   = name;
		},

		sourceName: function () {
			return this.plugin.id()+(this.name != "" ? '_'+this.name : "");
		},

		getGroups: function (name) {
			return Promise.resolve([]);
		},

		getMedias: function (group) {
			returnPromise.resolve([]);
		},

		getDetails: function (group, id) {
			return Promise.resolve(null);
		}

	});

});