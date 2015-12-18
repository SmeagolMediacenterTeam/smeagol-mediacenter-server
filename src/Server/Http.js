GollumJS.NS(Server, function() {

	var express    = require('express');
	var Collection = GollumJS.Utils.Collection;

	this.Http = new GollumJS.Class({
		
		server : null,
		express: null,
		controllers: {},

		initialize: function (server) {
			this.server  = server; 
			this.express = express();
			this.addController("/api", new Server.Controller.Api(this));
		},

		init: function () {
			console.log ('Initialize Http');

			var _this = this;

			Collection.each(this.controllers, function (controllerName, controller) {
				Collection.each(controller.actions, function (action, cb) {

					var route = controllerName+action;
					console.log("Register route:", route);

					_this.express.get(route, function (req, res) {
						
						console.log("Http GET: "+route, req.params);

						controller.beforeAction(action, req, res, function() {
							cb.call(controller, req, res, function() {
								controller.afterAction(action, req, res, function() {});
							});
						});

					});

				});
			});
		},

		start: function () {
			console.log ('Start Http');
			this.express.listen(8383);
		},
		
		addController: function (controllerName, controller) {
			this.controllers[controllerName] = controller;
		},

		removeController: function (controllerName) {
			delete this.controllers[controllerName];
		}
		
	});

});