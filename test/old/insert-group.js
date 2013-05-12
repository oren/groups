"use strict";

var test = require('tape');
var levelup = require('levelup')

var db = levelup('./groupsDB', {valueEncoding: 'json'})
var insertGroup = require('../db/insertGroup')(db);

test('insert group', function (t) {
  t.plan(1);  // you have to declare how many assertions are in your test

  insertGroup('Cat Videos', 'EVERYONE LOVES CATS', function(err, group) {
    if (err) {
      return console.log('error', err);
    } 

    t.ok(group);  // truthy

    deleteDB();
  });
});

function deleteDB() {
  db.close(function() {
    levelup.destroy('./groupsDB', function(err) {
      if (err) {
        console.log('err', err);
      }
    });
  });
}

