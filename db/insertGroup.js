"use strict";

// npm package
var timestamp = require('monotonic-timestamp')

var now = null;

module.exports = function (db, subs) {
  return function(name, title, user, cb){
    now = timestamp();
    subs.groups.put(now, {name: name, title: title, user: user}, function (err) {
      if (err) {return cb(err) };
      
      cb(null, now)
    });
  };
}
