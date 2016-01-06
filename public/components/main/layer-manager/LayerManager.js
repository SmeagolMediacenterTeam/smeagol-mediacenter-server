App.Component.Element.SMC = App.Component.Element.SMC || {};
App.Component.Element.SMC.Main = App.Component.Element.SMC.Main || {};

GollumJS.NS(App.Component.Element.SMC.Main, function() {

	var ajax = new Ajax;

	this.LayerManager = new GollumJS.Class({
		
		Extends: App.Component.Element,

		init: function () {
		},

		beforeRender: function (done) {
			ajax.request({
				url: 'http://127.0.0.1:8383/api/group'
			})
				.then(function (data) {
					console.log (data);
					done();
				})
				.catch(function (error) {
					throw error;
				})
			;
		},

		afterDisplay: function() {
		}
		
	});

});
