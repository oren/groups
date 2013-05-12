"use strict";

var levelup = require('levelup')
var db = levelup('/Users/ogolan/projects/groups/groupsDB')

function getGroups() {
  // to get a stream of all groups in reverse chronological order
  db.createReadStream({start: 'group!~', end: 'group!', reverse: 'true' })
   .on('data', function (data) {
      console.log('group:');
      console.log(data.key, '=', data.value)
    })
    .on('error', function (err) {
      console.log('Oh my!', err)
    })
    .on('close', function () {
      console.log('Stream closed')
    })
    .on('end', function () {
      console.log('Stream ended')
    })
}

getGroups();
