"use strict";

// npm package
var timestamp = require('monotonic-timestamp')

var topicId = null;
var replyId = null;

module.exports = function (db, subs) {
  return function(groupId, title, content, user, cb) {
    topicId = timestamp();
    replyId = timestamp();

    (function (groupId, topicId, replyId, title, content, user) {
      subs.topics.put(groupId  + '!' + topicId, {title: title, user: user}, function (err) {
        if (err) {return cb(err) };

        (function (topicId, replyId, content, user) {
          subs.replies.put(topicId  + '!' + replyId, {content: content, user: user}, function (err) {
            if (err) {return cb(err) };
            
            cb(null, {topicId: topicId, replyId: replyId});
          });
        })(topicId, replyId, content, user);

      });
    })(groupId, topicId, replyId, title, content, user);
  };
}
