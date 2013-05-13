"use strict";

// get all groups, alphabetically ordered

module.exports = function (db, subs) {
  return function(name, cb){

    var groups = [];

    function getGroups() {
      // to get a stream of all groups in reverse alphabetical order
      // subs.groups.createReadStream({start: '~', end: '0', reverse: 'true' })
      subs.groups.createReadStream({})
       .on('data', function (data) {
         // console.log('data', data);
          groups.push({id: data.key, value: data.value});
        })
        .on('error', function (err) {
          console.log('error in createReadStream', err)
          cb(err);
        })
        .on('close', function () {
        })
        .on('end', function () {
          cb(null, {value: {name: 'Cat Videos'}});
        })
    }
    getGroups();
  };
}
