"use strict";

// get all replies of a topic, reverse chronologically ordered
// parameters: 
// groupId, topicID and callback

module.exports = function (db, subs) {
  return function(groupId, topicId, cb) {
    var topics = [];
    var topic = {};

    subs.replies.createReadStream({start: groupId + '!~', end: groupId, reverse: 'true' })
     .on('data', function (data) {
       console.log('data event', data);
        // topic = {};
        // topic['id'] = data.key;
        // topic['title'] = data.value.title;
        // topic['permalink'] = data.value.permalink;
        // topic['user'] = data.value.user;

        // topics.push(topic);
      })
      .on('error', function (err) {
        console.error('error in createReadStream', err)
        cb(err);
      })
      .on('close', function () {
      })
      .on('end', function () {
        // cb(null, topics);
      })

  };
}
