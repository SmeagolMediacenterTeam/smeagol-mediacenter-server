var App = new GollumJS.Class({
	
	initialize: function () {
		console.log ('Start SMC Server');
	}	
	
});

// Inject in globale
var _global = typeof window == 'undefined' ? global : window;
_global.App = App;