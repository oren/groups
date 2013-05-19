"use strict";

// npm packages
var test = require('tape');
var levelup = require('levelup')

var environment = process.env.NODE_ENV || 'test';
var config = require('../config/' + environment + '.js');
var db = config.db
var insertGroup = db.get('insert-group');
var getGroupByName = db.get('get-group-by-name');
var destroyDB = db.get('destroy-db');

test('get group by name', function (t) {
  t.plan(1); 

  function getGroup(name) {
    getGroupByName(name, function(err, group) {
      if (err) {
        return console.error('error', err);
      } 

      console.log('group', group);
      t.equal(group.name, 'Cat Videos2');
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

      getGroup('cat-videos2');
    });
  });
});

test('get group by name where name does not exist', function (t) {
  t.plan(1); 

  getGroupByName('foo', function(err, group) {
    if (err) {
      t.notOk(group, 'should return null');
    } 
  });
});
