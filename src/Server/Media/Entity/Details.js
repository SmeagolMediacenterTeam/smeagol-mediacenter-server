GollumJS.NS(Server.Media.Entity, function() {

	this.Details = new GollumJS.Class({
		
		uniq: null,
		subtitle: null,
		picture: null,
		synopsys: null,

		initialize: function (uniq, subtitle, picture, synopsys) {
			this.uniq     = uniq;
			this.subtitle = subtitle;
			this.picture  = picture;
			this.synopsys = synopsys;
		},

		toJSON: function () {
			return {
				uniq     : this.uniq,
				subtitle : this.subtitle,
				picture  : this.picture,
				synopsys : this.synopsys
			};
		}

	});
	
});