"use strict";

// npm package
var timestamp = require('monotonic-timestamp')

var topicId = null;
var replyId = null;

// http://stackoverflow.com/questions/2519818/create-a-permalink-with-javascript
function doDashes(str) {
  return str.replace(/[^a-z0-9]+/gi, '-').replace(/^-*|-*$/g, '').toLowerCase();
};

module.exports = function (db, subs) {
  return function(groupId, title, content, user, cb) {
    topicId = timestamp();
    replyId = timestamp();

    (function (groupId, topicId, replyId, title, content, user) {
      subs.topics.put(groupId  + '!' + topicId, {title: title, permalink: doDashes(title), user: user}, function (err) {
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
