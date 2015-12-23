GollumJS.NS(function() {

	this.Ajax = new GollumJS.Class({
		
		Static: {
			request: function (param) {
				return new GollumJS.Promise (function(resolve, reject) {
					$.ajax (param)
						.done(resolve)    
						.fail(reject)
					; 
				});
				domComponents.each(function (){
					var el   = $(this);
					var href = el.attr('href');

					var split      = href.split(':');
					var plugin     = split[0] ? +split[0]+'.static' : 'static';
					var controller = split[1];
					var action     = split[2];
					
					var url = '/'+plugin+'/'+controller+'/'+action+'/';

					console.log(url);
				});
			}
		}
	});

});