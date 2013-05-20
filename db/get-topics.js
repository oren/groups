"use strict";

// get all topics of a group, reverse chronologically ordered
// parameters: 
// groupId and callback

module.exports = function (db, subs) {
  return function(groupId, cb) {
    var topics = [];
    var topic = {};

    function getTopics() {
      subs.topics.createReadStream({start: groupId + '!~', end: groupId, reverse: 'true' })
       .on('data', function (data) {
          topic = {};
          topic['id'] = data.key;
          topic['title'] = data.value.title;
          topic['user'] = data.value.user;

          topics.push(topic);
        })
        .on('error', function (err) {
          console.error('error in createReadStream', err)
          cb(err);
        })
        .on('close', function () {
        })
        .on('end', function () {
          cb(null, topics);
        })
    };

    getTopics();
  };
}
