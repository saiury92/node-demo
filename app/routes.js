var Feed = require('./models/feed');

function getFeeds(res){
	Feed.find(function(err, feeds) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(feeds); // return all feeds in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all feeds
	app.get('/api/feeds', function(req, res) {

		// use mongoose to get all feeds in the database
		getFeeds(res);
	});

	// create feed and send back all feeds after creation
	app.post('/api/feeds', function(req, res) {

		// create a feed, information comes from AJAX request from Angular
		Feed.create({
			text : req.body.text,
			done : false
		}, function(err, feed) {
			if (err)
				res.send(err);

			// get and return all the feeds after you create another
			getFeeds(res);
		});

	});

	// delete a feed
	app.delete('/api/feeds/:feed_id', function(req, res) {
		Feed.remove({
			_id : req.params.feed_id
		}, function(err, feed) {
			if (err)
				res.send(err);

			getFeeds(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};