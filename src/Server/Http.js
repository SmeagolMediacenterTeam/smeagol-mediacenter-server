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

			this.registerStaticPath('/static', GollumJS.getParameter('node.run_path') + '/public');
			this.addController("/api", new Server.Controller.Api(this));
			this.addController("", new Server.Controller.App(this));
		},

		init: function () {
			console.log ('Initialize Http');

			var _this = this;

			Collection.each(this.controllers, function (controllerName, controller) {
				Collection.each(controller.actions, function (action, cb) {

					var route = controllerName+action;
					console.log("Http: Register route:", route);

					_this.express.get(route, function (req, res) {
						
						console.log("Http GET: "+route, req.params);

						controller.beforeAction(action, req, res, function() {

							var renderOri = res.render;
							res.render = function(tpl, args) {
								var split = tpl.split(':');
								_this.express.set('views', GollumJS.getParameter('node.run_path') + '/views');
								if (split.length > 1) {
									var plugin = _this.server.pluginsManager.getPlugin(split.shift());
									if (plugin) {
										plugin.container.getRunPath().
											then(function(path) {
												_this.express.set('views', path+'/views');
												tpl = split.join(':');
												renderOri.call(res, tpl, args);
											}).
											catch (function (error) {
												console.error(error);
											})
										;
										return;
									}
								}
								renderOri.call(res, tpl, args);
							};

							cb.call(controller, req, res, function() {
								controller.afterAction(action, req, res, function() {});
							});
						});

					});

				});
			});
		},

		start: function () {
			console.log ('Http: Start');
			this.express.listen(8383);
		},
		
		addController: function (controllerName, controller) {
			this.controllers[controllerName] = controller;
		},
		
		registerStaticPath: function (suffixUrl, path) {
			this.express.use(suffixUrl, express.static(path));
			console.log('Http: Register static:', suffixUrl, path);
		},

		removeController: function (controllerName) {
			delete this.controllers[controllerName];
		}
		
	});

});