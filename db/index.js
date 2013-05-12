"use strict";
 
// core modules
var fs = require("fs");
var path = require("path");

// npm package
var LevelUp = require('levelup')
var Sublevel = require('level-sublevel')


var files = null;
var modules = {};
 
// return object with get() function
// than you can call .get() with any file inside the db folder
// 
// usage:
// db = require('./db')
// insert = db.get(insertGroup)
// insert('Cats', 'this groups is all about cats!)
//
module.exports = function (dbPath) {

  // var db = levelup(dbPath, {valueEncoding: 'json'})
  var db = Sublevel(LevelUp(dbPath, {valueEncoding: 'json'}))
  var subs = {
    groups: db.sublevel('groups'),
    topics: db.sublevel('topics'),
    replies: db.sublevel('replies')
  };

 
  // Load all the other "db modules" in the current directory.
  files = fs.readdirSync(__dirname);

  files.forEach(function (file) {
    var stats = fs.statSync(path.join(__dirname, file));
     
    if (!stats.isDirectory() && path.extname(file) === ".js" && __filename.indexOf(file) === -1) {
      file = file.replace(path.extname(file), "");
      db.path = dbPath;
      modules[file] = require('./' + file)(db, subs);
    }
  });

  return {
    get: function (type) {
      return modules[type];
    }
  };

}
