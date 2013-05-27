'use strict';

// npm packages
var path = require('path');
var router = require('routes')();

module.exports = router;

// /foo.jpg /foo.css /foo.png /public/js/foo.js
router.addRoute('/*.*', function(){console.log('static')});
// /
router.addRoute('/', function(){console.log('root')});
// /cats
router.addRoute('/:group', function(){console.log('group')});
// /cats/?format=application/json
router.addRoute('/:group?format=application/json', function(){console.log('group json')});
// /cats/cuteness
router.addRoute('/:group/:topic', function(){console.log('topic')});
// /cats/cuteness?format=application/json
router.addRoute('/:group/:topic?format=application/json', function(){console.log('topic json')});

