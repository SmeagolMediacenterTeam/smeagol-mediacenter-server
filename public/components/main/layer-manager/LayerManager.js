App.Component.Element.SMC = App.Component.Element.SMC || {};
App.Component.Element.SMC.Main = App.Component.Element.SMC.Main || {};

GollumJS.NS(App.Component.Element.SMC.Main, function() {

	this.LayerManager = new GollumJS.Class({
		
		Extends: App.Component.Element,

		init: function () {
			console.log(this);
		},

		beforeRender: function (infos, options, done) {
			done();
		},

		afterDisplay: function(options) {
		}
		
	});

});
