App.Component.Element.SMC = App.Component.Element.SMC || {};
App.Component.Element.SMC.Main = App.Component.Element.SMC.Main || {};

GollumJS.NS(App.Component.Element.SMC.Main, function() {

	this.ViewPicture = new GollumJS.Class({
		
		Extends: App.Component.Element,

		init: function () {
		},

		beforeRender: function (done) {			
			var _this = this;

			ajax.request({
				url: 'http://127.0.0.1:8383/api/media/serie'
			})
				.then(function (data) {
					_this.options.medias = data;
					done();
				})
				.catch(function (error) {
					throw error;
				})
			;
		},

		afterDisplay: function() {

			delete(this.options.medias);

		}
		
	});

});
