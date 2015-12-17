Server.Media = {};
GollumJS.NS(Server.Media, function() {

	var Collection = GollumJS.Utils.Collection;
	var Promise    = require('rsvp').Promise;

	this.Manager = new GollumJS.Class({

		server: null,
		sources: [],
		index: {},

		initialize: function (server) {
			this.server  = server;
		},

		registerSource: function (source) {
			console.log ('Media Manager: Register Source');
			this.sources.push(source);
		},

		unregisterSource: function (source) {
			console.log ('Media Manager: Unregister Source');	
			var i = this.sources.indexOf(source);
			if (i > 0) {
				this.sources.splice(i, 1);
			}
		},

		init: function () {
			console.log ('Initialize Media Manager');
		},

		start: function () {
			console.log ('Start Media Manager');
			return this.indexMedias();
		},

		indexMedias: function () {

			console.log ('Media Manager: Index All Media on '+this.sources.length+' souces');

			var _this = this;

			return new Promise(function(resolve, reject) {
				
				var groups = [ 'serie' ];
				_this.index = {};

				Collection.eachStep(groups, function (i, group, stepI) {
					_this.index[group] = [];
					Collection.eachStep(_this.sources, function (i, source, stepJ) {
						source.getMedias(group)
							.then(function (medias) {
								_this.index[group] = _this.index[group].concat(medias);
								stepJ();
							})
							.catch(function (error) {
								console.log ("Error on index media:", error);
								stepJ();
							})
						;
					}, function () {
						console.log ('Media Manager: '+_this.index[group].length+' '+group+' Indexed');
						stepI();
					});
				},
				function() {
					resolve(_this);
				});

			});
		},

		getMedias: function (group) {
			var medias = [];
			if (this.index[group]) {
				medias = this.index[group];

			}
			return medias;
		}


	});

});