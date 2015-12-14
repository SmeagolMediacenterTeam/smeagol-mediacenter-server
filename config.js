var _global = typeof window !== 'undefined' ? window : global;

_global.GollumJS = {
	config: {
		services: {
			'app.plugin.loader': {
				class: 'App.Plugin.Loader',
				args: []
			}
		}
	}
};