"use strict";

// npm packages
var test = require('tape');
var levelup = require('levelup')

var environment = process.env.NODE_ENV || 'test';
var config = require('../config/' + environment + '.js');
var db = config.db
var insertGroup = db.get('insert-group');
var insertTopic = db.get('insert-topic');
var insertReply = db.get('insert-reply');
var getReplies = db.get('get-replies');
var destroyDB = db.get('destroy-db');

test('insert reply', function (t) {
  t.plan(1);  // you have to declare how many assertions are in your test

  insertGroup('Cat Videos', 'EVERYONE LOVES CATS', '1', function(err, group) {
    if (err) {
      return console.error('error', err);
    } 

    insertTopic(group, 'dancing cats', 'wow, cool kitten!', '1', function(err, result) {
      if (err) {
        return console.error('error', err);
      } 

      insertReply(group, topic, 'awesome kitten', '2', function(err) {
        if (err) {
          return console.error('error', err);
        } 

        getReplies(groupId, topicId, function(err, replies){
          if (err) {
            return console.error('error', err);
          } 

          console.log('res', result);
          destroyDB();
          // t.equal(result.title, 'dancing cats');  // truthy
        }); 
      });
    });
  });
});
