"use strict";

var levelup = require('levelup')
var db = levelup('./groupsDB', {valueEncoding: 'json'})

var insertGroup = require('../db/insertGroup')(db);
var get = require('./getAllGroups')(db);

insertGroup('Cat Videos', 'EVERYONE LOVES CATS', function(err, group) {
  if (err) {
    return console.log('error', err);
  }
  insertGroup('Cat Videos2', 'EVERYONE LOVES CATS2', function(err, group) {
    if (err) {
      return console.log('error', err);
    }
    getGroups();
  });
});

function getGroups() {
  get(function(err, groups) {
    if (err) {
      return console.log('error', err);
    } 

    console.log(groups);

    db.close(function() {
      levelup.destroy('./groupsDB', function(err) {
        if (err) {
          console.log('err', err);
        }
      });
    });
  });
}

// insert('topic', {group: '1365980575482', title: 'this cat is soooo cute!', content: 'OMG'}); //will insert a reply as well
// insert('reply', {topic: '1365980575483', title: 'this. i want one too'});

// insert a group
// insert a topic (and reply)
// insert a reply
// insert a reply to recent replies list

// get all groups
// get recent 10 replies (only show 1 per group)
// get a group by name
// get a group by id
// get 10 topics of a group (with offset)
// get all replies of topic

