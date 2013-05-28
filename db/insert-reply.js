"use strict";

// npm package
var timestamp = require('monotonic-timestamp')

var replyId = null;

module.exports = function (db, subs) {
  return function(groupId, topicId, content, user, cb) {
    console.log('woo');
    replyId = timestamp();

    (function (topicId, replyId, content, user) {
      subs.replies.put(topicId  + '!' + replyId, {content: content, permalink: replyId, user: user}, function (err) {
        if (err) {return cb(err) };
        
        cb(null, {topicId: topicId, replyId: replyId});
      });
    })(topicId, replyId, content, user);

  };
}
