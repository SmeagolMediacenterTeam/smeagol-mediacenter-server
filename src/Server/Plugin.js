GollumJS.NS(Server, function() {

	this.Plugin = new GollumJS.Class({

		Static: {
			instance: null,
		},

		container: null,
		isEnable: false,

		initialize: function (manager, container) {
			this.manager = manager;
			this.container = container;
		},

		beforeProcessEnable: function (done) {
			done();
		},

		enable: function (done) {
			done();
		},

		afterProcessEnable: function (done) {
			done();
		},

		beforeProcessDisable: function (done) {
			done();
		},

		disable: function (done) {
			done();
		},

		afterProcessDisable: function (done) {
			done();
		},

		/**
		 * @return string Helper. Return the unique ID of plugin
		 */
		id: function () {
			return this.container.metaInfos.id;
		},

		/**
		 * @return string Helper. Return the name of plugin
		 */
		name: function () {
			return this.container.metaInfos.name;
		},

		/**
		 * @return string Helper. Return the version of plugin
		 */
		version: function () {
			return this.container.metaInfos.version;
		},

		/**
		 * @return [ string ] Helper. Return the author's list of of plugin
		 */
		authors: function () {
			return this.container.metaInfos.authors;
		},

		/**
		 * @return Server Helper. Return the server instance
		 */
		server: function () {
			return this.manager.server;
		},

		toString: function () {
			return  this.container.metaInfos && this.container.metaInfos.id ? this.container.metaInfos.id : "IDModNotFound";
		}

	});
});
