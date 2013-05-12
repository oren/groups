"use strict";

var path = require('path');
// var ejs = require('ejs');

var config = {
  port: 3001,
  // engine: ejs,
  templates: './templates',
  db: require('../db')(path.join(__dirname, '..', 'groupsDB-test'))
}

module.exports = config;
