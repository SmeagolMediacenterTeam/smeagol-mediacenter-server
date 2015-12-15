GollumJS.Utils.global().Server = new GollumJS.Class({
	
	plugins: [],

	initialize: function () {
		console.log ('Start SMC Server');

		this.loadPlugins(function (err) {

		});
	},

	loadPlugins: function (cb) {
		var _this = this;
		var loader = new Server.Plugin.Loader();
		loader.load(function (err, plugins) {
			_this.plugins = plugins;
			cb(null);
		});
	}
});