"use strict";

var path = require('path');

// var ejs = require('ejs');

var config = {
  port: 7000,
  // engine: ejs,
  templates: './templates',
  db: require('../db')(path.join(__dirname, '..', 'groupsDB'))
}

module.exports = config;
