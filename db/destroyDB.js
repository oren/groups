"use strict";

var levelup = require('levelup')

module.exports = function (db) {
  return function(cb) {
    db.close(function() {
      levelup.destroy(db.path, function(err) {
        if (err) {
          console.log('err', err);
        }
      });
    });
  };
}
