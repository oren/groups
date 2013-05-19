"use strict";

// npm packages
var test = require('tape');
var levelup = require('levelup')

var environment = process.env.NODE_ENV || 'test';
var config = require('../config/' + environment + '.js');
var db = config.db
var insertGroup = db.get('insert-group');
var insertTopic = db.get('insert-topic');
var getTopics = db.get('get-topics');
var destroyDB = db.get('destroy-db');

test('get topics of a groups by groupId', function (t) {
  t.plan(1);

  function getTopicsOfGroup(groupId) {
    getTopics(groupId, function(err, topics) {
      if (err) {
        destroyDB();
        return console.error('error', err);
      } 

      destroyDB();
      t.equal(topics[0].value.title, 'dancing cats'); 
    });
  }

  insertGroup('Cat Videos', 'EVERYONE LOVES CATS', '1', function(err, groupId) {
    if (err) {
      return console.error('error', err);
    } 

    insertTopic(groupId, 'dancing cats', 'wow, cool kitten!', '1', function(err, result) {
      if (err) {
        return console.error('error', err);
      } 
      insertTopic(groupId, 'cats playing', 'omg', '2', function(err, result) {
        if (err) {
          return console.error('error', err);
        } 

        getTopicsOfGroup(groupId);
      });
    });
  });
});
