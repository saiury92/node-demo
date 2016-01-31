'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('Feed', {
	text : {type : String, default: ''}
});