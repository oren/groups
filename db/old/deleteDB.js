"use strict";

var levelup = require('levelup')
var db = levelup('/Users/ogolan/projects/groups/groupsDB')

function deleteDB() {
  db.close(function() {
    levelup.destroy('/Users/ogolan/projects/groups/groupsDB', function(err) {
      if (err) {
        console.log('err', err);
      }
    });
  });
}

deleteDB();
