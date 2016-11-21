var mongoose = require('mongoose');
var config = require('./config');
var model_path = '../app/model/'

require(model_path + 'post.server.model.js');
require(model_path + 'comment.server.model.js');

mongoose.connect(config.db);