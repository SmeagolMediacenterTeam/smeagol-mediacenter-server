GollumJS.NS(Server, function() {

	var Promise = require('rsvp').Promise;

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

		getMedias: function (group) {
			return Server.Utils.Promise.resolve([]);
		},

		getDetails: function (group, id) {
			return Server.Utils.Promise.resolve(null);
		}

	});

});