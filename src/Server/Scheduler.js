GollumJS.NS(Server, function() {

	var Promise = require('rsvp').Promise;

	this.Scheduler = new GollumJS.Class({

		_pile: [],
		_running: false,

		initialize: function () {
			
		},

		push: function (step) {
			var _this = this;
			return new Promise(function(resolve, reject) {

				_this._pile.push({
					resolve: resolve,
					reject: reject,
					cb: step
				});
				
				if (!_this._running) {
					_this._exec();
				}

			});
		},

		_exec: function() {
			
			this._running = true;
						
			var _this = this;
			var schedule = this._pile.shift();
			
			schedule.cb(schedule.resolve, schedule.reject, function (error) {
				if (_this._pile.length) {
					_this._exec();
				} else {
					_this._running = false;
				}
			});
		}

	});

});