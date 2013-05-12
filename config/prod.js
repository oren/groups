"use strict";

// var ejs = require('ejs');

var config = {
  port: 3000,
  // engine: ejs,
  templates: './templates',
  db: require('../db')(path.join(__dirname, '..', '..', 'shared', 'groupsDB'))
}

module.exports = config;
