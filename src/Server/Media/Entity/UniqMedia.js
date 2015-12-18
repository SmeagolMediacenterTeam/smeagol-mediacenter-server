GollumJS.NS(Server.Media.Entity, function() {

	this.UniqMedia = new GollumJS.Class({
		
		source: null,
		id    : null,
		name  : null,

		initialize: function (source, id, name) {
			this.source = source;
			this.id     = id;
			this.name   = name;
		},

		toJSON: function () {
			return {
				source: this.source.sourceName(),
				id    : this.id,
				name  : this.name
			};
		}

	});
	
});