"use strict";

// get all topics of a group, reverse chronologically ordered

module.exports = function (db, subs) {
  return function(groupId, cb) {
    var topics = [];

    function getTopics() {
      // to get a stream of all groups in reverse alphabetical order
      // subs.groups.createReadStream({start: '~', end: '0', reverse: 'true' })
      subs.topics.createReadStream({})
       .on('data', function (data) {
         // console.log('data', data);
          topics.push({id: data.key, value: data.value});
        })
        .on('error', function (err) {
          console.log('error in createReadStream', err)
          cb(err);
        })
        .on('close', function () {
        })
        .on('end', function () {
          cb(null, topics);
        })
    }

    getTopics();
  };
}
