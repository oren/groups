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
var getRecentReplies = db.get('getRecentReplies');
var getAllGroups = db.get('getAllGroups');

process.title = 'groups website';

http.createServer(function (req, res) {
  // console.log('url', req.url);
  var reader = null;
  res.template = Templar(req, res, templarOptions);

  // var parsed = url.parse(req.url)
  // var pathname = parsed.pathname
  // var normalPathname = path.normalize(pathname).replace(/\\/g, '/');

  // var route = router.match(normalPathname);
  // if (!route) return res.error(404)

  // route.fn(req, res, config)

  if (req.url === '/') {
    // getRecentReplies(function(err, groups) {
    getAllGroups(function(err, groups) {
      if (err) {
        return console.log('error in getAllGroups', err);
      } 

      console.log(groups);
      res.template('index.ejs', { groups: groups })
    });

  } else {
    res.writeHead(200);
    var file = req.url.substr(1);

    reader = fs.createReadStream(req.url.substr(1));
    reader.pipe(res);

    reader.on('end', function() {
      res.end();
    });
    reader.on('error', function(err) {
      console.log('error', err);
      res.end();
    });
  };
}).listen(config.port);

console.log('Groups server running in ' + environment  + ' environment on port ' + config.port);
