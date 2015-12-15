Server.Plugin.DirectoryContainer = new GollumJS.Class({

	Extends: Server.Plugin.Container,

	Static: {

		isPlugin:function () {
			return true
		}

	},

	pathSource: null,

	initialize: function (pathSource) {
		this.pathSource = pathSource;
	}
	
});