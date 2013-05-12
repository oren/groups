"use strict";

// npm packages
var test = require('tape');
var levelup = require('levelup')

var environment = process.env.NODE_ENV || 'development';
var config = require('../config/' + environment + '.js');
var db = config.db
var insertGroup = db.get('insertGroup');
var getAllGroups = db.get('getAllGroups');
var destroyDB = db.get('destroyDB');

test('get all groups', function (t) {
  t.plan(1);  // you have to declare how many assertions are in your test

  function compare(a, b) {
    if (a.value.name < b.value.name) {
       return -1;
    } else {
       return 1;
    };
  }

  function getGroups() {
    getAllGroups(function(err, groups) {
      if (err) {
        return console.log('error', err);
      } 

      t.ok(groups);  // truthy
      destroyDB();
    });
  }

  insertGroup('Cat Videos', 'EVERYONE LOVES CATS', function(err, group) {
    if (err) {
      return console.log('error', err);
    } 

    insertGroup('Cat Videos2', 'EVERYONE LOVES CATS2', function(err, group) {
      if (err) {
        return console.log('error', err);
      } 
    });

    getGroups();
  });
});