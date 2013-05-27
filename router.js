'use strict';

// npm packages
var path = require('path');
// var router = require('routes')();


module.exports = function(url) {
  if (url === '/') { return 'root' };

  var isStatic = path.extname(url) === '.css' || 
    path.extname(url) === '.jpg' || 
    path.extname(url) === '.JPG' || 
    path.extname(url) === '.png' || 
    path.extname(url) === '.PNG' || 
    path.extname(url) === '.js' || 
    path.extname(url) === '.ico' || 
    path.extname(url) === '.html';

  if (isStatic) { return 'static' };

  return null;
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
