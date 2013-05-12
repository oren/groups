"use strict";

var levelup = require('levelup')
var db = levelup('./groupsDB', {valueEncoding: 'json'})

db.del('group!' + timeGroup1, function (err) {
  if (err) return console.log('Ooops!', err) // some kind of I/O error
});

