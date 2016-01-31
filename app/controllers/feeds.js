'use strict';

var Feed = require('./../models/feed');

function getFeeds(res) {
  Feed.find(function (err, feeds) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err)

    res.json(feeds); // return all feeds in JSON format
  });
};

// api ---------------------------------------------------------------------
// get all feeds
exports.get = function(req, res) {

  // use mongoose to get all feeds in the database
  getFeeds(res);
};

// create feed and send back all feeds after creation
exports.post = function(req, res) {

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

};

// delete a feed
exports.delete = function(req, res) {
  Feed.remove({
    _id : req.params.feed_id
  }, function(err, feed) {
    if (err)
      res.send(err);

    getFeeds(res);
  });
};