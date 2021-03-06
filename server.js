"use strict";

process.title = 'groups-website';

// core modules
var http = require('http');
var fs = require('fs');
var path = require("path");
var url = require("url");
var querystring = require("querystring");

// npm packages
var ejs = require('ejs');
var Templar = require('templar');
var router = require('./router.js');

var templarOptions = { engine: ejs, folder: './templates' };

// preload it.  Otherwise, the first request is slow, because
// // it has to load up all the templates within it.
Templar.loadFolder('./templates')

var environment = process.env.NODE_ENV || 'development';
var config = require('./config/' + environment + '.js');
var db = config.db

// my modules
var getRecentReplies = db.get('getRecentReplies');
var getAllGroups = db.get('get-all-groups');
var getGroupByName = db.get('get-group-by-name');
var getTopics = db.get('get-topics');

http.createServer(function (req, res) {
  res.template = Templar(req, res, templarOptions);
  console.log(req.url);
  // console.log(router.match(req.url));

  router.match(req.url).fn(req, res, config);
  return;

  // ajax request to root ('/') or to a group ('/cat-videos')
  if (query && query.format && query.format === 'application/json') {
    //  return all groups
    if (normalPathName === '/') {
      getAllGroups(function(err, groups) {
        if (err) {
          // res.writeHead(404);
          return console.error('error in getAllGroups', err);
        }; 

        res.writeHead(200, {'Content-Location': req.headers.host + '/all.json' });
        res.end(JSON.stringify(groups));
      })

      return;
    };

    // if group exist - return array of topics
    // if not, return nil
    getGroupByName(normalPathName.substr(1) , function(err, group) {
      if (err) {
        // res.writeHead(404);
        res.end(null);
        return console.error('error', err);
      } 

      getTopics(group.id, function(err, topics) {
        if (err) {
          // res.writeHead(404);
          res.end(null);
          return console.error('error', err);
        } 

        res.writeHead(200, {'Content-Location': req.headers.host + normalPathName + '.json' });
        res.end(JSON.stringify({group: group, topics: topics}));
      });
    });

    return;
  }

  // non ajox request for home - '/'
  if (normalPathName === '/') {
    getAllGroups(function(err, groups) {
      if (err) {
        // res.writeHead(404);
        return console.error('error in getAllGroups', err);
      } 

      res.template('index.ejs', { groups: groups })
      return;
    });
  } else {
    // non ajox for a group - '/group-name'
    res.template('index.ejs', { groups: [] })
  }

}).listen(config.port);

console.log('Server Listening - http://localhost:' + config.port + '. ' + environment + ' environment');
