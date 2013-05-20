"use strict";

// core modules
var http = require('http');
var fs = require('fs');
var path = require("path");
var url = require("url");

// npm packages
var ejs = require('ejs');
var Templar = require('templar');
// var router = require("./router.js");

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

process.title = 'groups website';

http.createServer(function (req, res) {
  var reader = null;
  res.template = Templar(req, res, templarOptions);

  var parsed = url.parse(req.url, true);
  var pathname = parsed.pathname;
  var normalPathName = path.normalize(pathname).replace(/\\/g, '/');
  var query = parsed.query;

  console.log('req.url', req.url);

  // var route = router.match(normalPathname);
  // if (!route) return res.error(404)

  // route.fn(req, res, config)

  // assets
  if(path.extname(req.url) === '.css' || path.extname(req.url) === '.jpg' || path.extname(req.url) === '.png' || path.extname(req.url) === '.js' || path.extname(req.url) === '.ico' || path.extname(req.url) === '.html') {
    res.writeHead(200);
    var file = req.url.substr(1);

    reader = fs.createReadStream(req.url.substr(1));
    reader.pipe(res);

    reader.on('end', function() {
      res.end();
    });
    reader.on('error', function(err) {
      console.error('error', err);
      // res.writeHead(404);
      res.end();
    });

    return;
  } 

  // ajax request to a group
  //
  // if group exist - return array of topics
  // if not, return nil
  if (query && query.format && query.format === 'application/json') {
    if (normalPathName === '/') {
      getAllGroups(function(err, groups) {
        if (err) {
          // res.writeHead(404);
          return console.error('error in getAllGroups', err);
        }; 

        res.writeHead(200);
        res.end(JSON.stringify(groups));
      })

      return;
    };

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

        res.writeHead(200);
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

console.log('Groups server running in ' + environment  + ' environment on port ' + config.port);
