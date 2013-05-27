'use strict';

// npm packages
// var router = require('routes')();

module.exports = function() {

});

// router.addRoute('/:group', require('./routes/group.js'));
router.addRoute('/:group/:topic', function(){ console.log('topic') });
router.addRoute('/:group*', function(){ console.log('group') });
router.addRoute('/*', require('./routes/static.js'));
router.addRoute('/', require('./routes/index.js'));
