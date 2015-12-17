(function () {
	var _global = typeof window !== 'undefined' ? window : global;
	var Path    = require('path');

	_global.GollumJS = {
		config: {

			node: {
				run_path: Path.resolve("."),
				tmp_path: '%node.run_path%/tmp'
			},

			cache: {
				path: '%node.tmp_path%/cache',
			}
		}
	};
})();