App.Component.Element.SMC = App.Component.Element.SMC || {};
App.Component.Element.SMC.Main = App.Component.Element.SMC.Main || {};

GollumJS.NS(App.Component.Element.SMC.Main, function() {

	this.Picture = new GollumJS.Class({
		
		Extends: App.Component.Element,

		afterDisplay: function() {
			console.log(this);
		}
		
	});

});
