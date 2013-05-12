"use strict";

// npm packages
var test = require('tape');
var levelup = require('levelup')

var environment = process.env.NODE_ENV || 'test';
var config = require('../config/' + environment + '.js');
var db = config.db
var insertGroup = db.get('insertGroup');
var insertTopic = db.get('insertTopic');
var getTopic = db.get('getTopic');
var getAllGroups = db.get('getAllGroups');
var destroyDB = db.get('destroyDB');

test('insert topic', function (t) {
  t.plan(1);  // you have to declare how many assertions are in your test

  function getOneTopic(group, topic) {
    getTopic(group + '!' + topic, function(err, result) {
      if (err) {
        return console.log('error', err);
      } 

      destroyDB();
      t.equal(result.title, 'dancing cats');  // truthy
    });
  }

  insertGroup('Cat Videos', 'EVERYONE LOVES CATS', '1', function(err, group) {
    if (err) {
      return console.log('error', err);
    } 

    insertTopic(group, 'dancing cats', 'wow, cool kitten!', '1', function(err, result) {
      if (err) {
        return console.log('error', err);
      } 

      getOneTopic(group, result.topicId);
    });
  });
});