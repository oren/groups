"use strict";

// get all replies of a topic based on group name and topic name

module.exports = function (db, subs) {
  return function(topic, cb) {
    subs.topics.get(topic, function(err, topic) {
      if (err) { 
        cb && cb(err); 
        return;
      }

      cb && cb(null, topic);
    })
  }
}
