GollumJS.NS(Ajax, function() {

	var Promise = GollumJS.Promise;
	var JSON = JSON3;

	this.Proxy = new GollumJS.Class({

		Extends: Ajax,

		calling: {},
		results: {},

		initialize: function () {
			this.parent().apply(this, arguments);
		},


		request: function (param) {

			var _this = this;
			var id = this.getId(param);

			if (this.results[id] !== undefined) {
				return Promise.resolve(this.results[id]);
			}
			if (this.calling[id] !== undefined) {
				return new Promise(function (resolve, reject) {
					_this.calling[id].push({
						resolve: resolve, 
						reject : reject
					});
				});
			}

			this.calling[id] = [];

			return new Promise(function (resolve, reject) {

				_this.calling[id].push({
					resolve: resolve, 
					reject : reject
				});

				_this.parent().request(param)
					.then(function (data) {
						
						_this.results[id] = data;

						for (var i = 0; i < _this.calling[id].length; i++) {
							_this.calling[id][i].resolve(data);
						}
						delete (_this.calling[id]);
					})
					.catch(function (error) {
						console.error(error);
						if (_this.calling[id]) {
							for (var i = 0; i < calling[id].length; i++) {
								if (_this.calling[id][i]) {
									_this.calling[id][i].reject(error);
								}
							}
							delete (_this.calling[id]);
						}
					})
				;
			});
		},

		getId: function (param) {
			return JSON.stringify ([
				param.url,
				param.dataType,
				param.param
			]);
		}
	});

});