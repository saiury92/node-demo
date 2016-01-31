'use strict';

module.exports = function(app) {
	var feeds = require('../../app/controllers/feeds'),
		core = require('../../app/controllers/core');
	// api ---------------------------------------------------------------------
	// get all feeds
	app.get('/api/feeds', feeds.get);

	// create feed and send back all feeds after creation
	app.post('/api/feeds', feeds.post);

	// delete a feed
	app.delete('/api/feeds/:feed_id', feeds.delete);

	// application -------------------------------------------------------------
	app.get('*', core.index);
};