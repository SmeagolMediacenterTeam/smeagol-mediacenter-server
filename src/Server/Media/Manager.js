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

			console.log ('Media Manager: Index All Media on '+this.sources.length+' sources');

			var _this = this;
			this.index = {};

			return this.getGroups()
				.then(function(groups) {
					console.log("Media Manager: groups find:", groups);
					return Collection.eachStep(groups, function (i, group, stepI) {
						_this.index[group] = [];
						Collection.eachStep(_this.sources, function (i, source, stepJ) {
							try {
								source.getMedias(group)
									.then(function (medias) {
										_this.index[group] = _this.index[group].concat(medias);
										stepJ();
									})
									.catch(function (error) {
										console.error ("Error on index media:", "group="+group, "source="+source.id(), error);
										stepJ();
									})
								;
							} catch (error) {
								console.error ("Exception on index media:", "group="+group, "source="+source.id(), error);
								stepJ();
							}
						})
							.then(function () {
								console.log ('Media Manager: '+_this.index[group].length+' "'+group+'" Indexed');
								stepI();
							})
							.catch(function (error) {
								console.error ("Error on index media:", "group="+group, error);
								stepI();
							})
						;
					})
						.then(function() {
							return _this;
						})
						.catch(function (error) {
							console.error ("Error on index media:", error);
							throw error;
						})
					;
				})
			;
			
		},

		getMedias: function (group) {
			var medias = [];
			if (this.index[group]) {
				medias = this.index[group];

			}
			return medias;
		},
		
		getSource: function (name) {
			for (var i = 0; i < this.sources.length; i++) {
				if (name == this.sources[i].sourceName()) {
					return this.sources[i];
				}
			}
			return null;
		},
		
		getGroups: function () {
			var _this = this;
			var group = [];
			return GollumJS.Utils.Collection.eachStep(_this.sources, function(i, source, step) {
				try {
					source.getGroups()
						.then(function (g) {
							for (var j = 0; j < g.length; j++) {
								if (group.indexOf(g[j]) == -1) {
									group.push(g[j]);
								}
							}
							step();
						})
						.catch(function(e) {
							console.error('Media Manager: Error on get groups', e);
							step();
						})
					;
				} catch (e) {
					console.error('Media Manager: Exception on get groups', e);
					step();
				}
			})
				.then(function () {
					return group;
				})
			;
		}


	});

});