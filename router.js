'use strict';

// npm packages
var path = require('path');
var router = require('routes')();

// my modules
var getStatic = require('./routes/static.js');
var getIndex = require('./routes/index.js');
var getGroup = require('./routes/group.js');
var getTopic = require('./routes/topic.js');

module.exports = router;

// /foo.jpg /foo.css /foo.png /public/js/foo.js
router.addRoute('/*.*', getStatic);
// /
router.addRoute('/', getIndex);
// /cats
router.addRoute('/:group', function(){console.log('group')});
// /cats/?format=application/json
router.addRoute('/:group?format=application/json', getGroup);
// /cats/cuteness
router.addRoute('/:group/:topic', function(){console.log('topic')});
// /cats/cuteness?format=application/json
router.addRoute('/:group/:topic?format=application/json', getTopic);

