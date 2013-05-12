"use strict";

// npm package
var timestamp = require('monotonic-timestamp')

var now = timestamp();

module.exports = function (db) {
  return function(topic, title, cb){
    db.put('reply!' + timestamp(), {name: name, title: title, user: null}, function (err) {
      if (err) {return cb(err) };// some kind of I/O error
      
      cb(null, now)
    });
  };
}
