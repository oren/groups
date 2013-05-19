"use strict";

// npm packages
var test = require('tape');
var levelup = require('levelup')

var environment = process.env.NODE_ENV || 'test';
var config = require('../config/' + environment + '.js');
var db = config.db
var insertGroup = db.get('insert-group');
var insertTopic = db.get('insert-topic');
var getTopic = db.get('get-topic');
var destroyDB = db.get('destroy-db');

test('insert topic', function (t) {
  t.plan(1);  // you have to declare how many assertions are in your test

  function getOneTopic(group, topic) {
    getTopic(group + '!' + topic, function(err, result) {
      if (err) {
        return console.error('error', err);
      } 

      destroyDB();
      t.equal(result.title, 'dancing cats');  // truthy
    });
  }

  insertGroup('Cat Videos', 'EVERYONE LOVES CATS', '1', function(err, group) {
    if (err) {
      return console.error('error', err);
    } 

    insertTopic(group, 'dancing cats', 'wow, cool kitten!', '1', function(err, result) {
      if (err) {
        return console.error('error', err);
      } 

      getOneTopic(group, result.topicId);
    });
  });
});
