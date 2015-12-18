GollumJS.NS(Server, function() {

	var Promise = require('rsvp').Promise;

	this.Scheduler = new GollumJS.Class({

		_pile: [],
		_running: false,

		initialize: function () {
			
		},

		push: function () {
			var _this = this;
			return new Promise(function(resolve, reject) {

				_this._pile.push({
					resolve: resolve,
					reject: reject ,
					next: function (error) {
						if (_this._pile.length) {
							_this._step();
						} else {
							_this._running = false;
						}
					},
					cb: function () {
						console.log ("cool");
						step();
					}
				});
				if (_this._running) {
					_this._step();
				}

			});
		},

		_step: function() {
			this._running = true;
			var schedule = this._pile.shift();
			schedule.cb(schedule.resolve, schedule.reject, schedule.next);
		}

	});

});