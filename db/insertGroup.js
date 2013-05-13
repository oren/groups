"use strict";

// npm package
var timestamp = require('monotonic-timestamp')

var now = null;

// http://stackoverflow.com/questions/2519818/create-a-permalink-with-javascript
function doDashes(str) {
  return str.replace(/[^a-z0-9]+/gi, '-').replace(/^-*|-*$/g, '').toLowerCase();
};

module.exports = function (db, subs) {
  return function(name, title, user, cb){
    now = timestamp();
    subs.groups.put(now, {name: name, permalink: doDashes(name), title: title, user: user}, function (err) {
      if (err) {return cb(err) };

      subs.groupNames.put(doDashes(name), now, function(){
        if (err) {return cb(err) };

        cb(null, now)
      });
    });
  };
}
