App.Component.Element.SMC = App.Component.Element.SMC || {};
App.Component.Element.SMC.Main = App.Component.Element.SMC.Main || {};

GollumJS.NS(App.Component.Element.SMC.Main, function() {

	var ajax = new Ajax;

	this.LayerManager = new GollumJS.Class({
		
		Extends: App.Component.Element,

		init: function () {
		},

		beforeRender: function (done) {
			done();
		},

		afterDisplay: function() {
		}
		
	});

});
