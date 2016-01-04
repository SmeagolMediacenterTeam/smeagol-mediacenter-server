GollumJS.NS(function() {

	this.Ajax = new GollumJS.Class({
		
		request: function (param) {
			return new GollumJS.Promise (function(resolve, reject) {
				$.ajax (param)
					.done(resolve)    
					.fail(reject)
				; 
			});
		}
	});

});