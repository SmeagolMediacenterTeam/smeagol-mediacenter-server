var GollumJS = require('gollum-classjs');

var ClassA = new GollumJS.Class({
	
	cool:"ddd",
	
	test: function () {
		return this.cool;
	}
	
});


var ClassB = new GollumJS.Class({
		
	Extends: ClassA,
	
	test: function () {
		return this.parent().test()+"AAAA";
	}
	
});

var b = new ClassB();
console.log(b.test());