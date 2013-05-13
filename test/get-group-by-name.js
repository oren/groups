"use strict";

// npm packages
var test = require('tape');
var levelup = require('levelup')

var environment = process.env.NODE_ENV || 'test';
var config = require('../config/' + environment + '.js');
var db = config.db
var insertGroup = db.get('insertGroup');
var getGroupByName = db.get('get-group-by-name');
var destroyDB = db.get('destroyDB');

test('get group by name', function (t) {
  t.plan(1); 

  function getGroup(name) {
    getGroupByName(name, function(err, group) {
      if (err) {
        return console.error('error', err);
      } 

      t.equal(group.value.name, 'Cat Videos');
      destroyDB();
    });
  }

  insertGroup('Cat Videos', 'EVERYONE LOVES CATS', '1', function(err, group) {
    if (err) {
      return console.error('error', err);
    } 

    insertGroup('Cat Videos2', 'EVERYONE LOVES CATS2', '1', function(err, group) {
      if (err) {
        return console.error('error', err);
      } 
    });

    getGroup('cat-videos');
  });
});
