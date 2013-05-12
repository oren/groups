"use strict";

module.exports = function (db) {
  return function(cb){
    var groups = [];

    function getGroups() {
      // to get a stream of all groups in reverse chronological order
      db.createReadStream({start: 'group!~', end: 'group!', reverse: 'true' })
       .on('data', function (data) {
          groups.push({id: data.key, value: data.value});
        })
        .on('error', function (err) {
          console.log('Oh my!', err)
          cb(err);
        })
        .on('close', function () {
        })
        .on('end', function () {
          cb(null, groups);
        })
    }

    getGroups();

  };
}
