'use strict';

// npm packages
// var router = require('routes')();

module.exports = function(url) {
  if (url === '/') {
    return 'root';
  }
};

// router.addRoute('/:group', require('./routes/group.js'));
// router.addRoute('/:group/:topic', function(){ console.log('topic') });
// router.addRoute('/:group*', function(){ console.log('group') });
// router.addRoute('/*', require('./routes/static.js'));
// router.addRoute('/', require('./routes/index.js'));


// /foo.jpg foo.css foo.png foo.js
// / 
// /cats
// /cats/cuteness
// /cats
// /cats/?format=application/json
// /cats/cuteness/?format=application/json
