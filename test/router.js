"use strict";

// npm packages
var test = require('tape');

// my module
var router = require('../router.js');

test('router', function(t) {
  // t.plan(1);

  // t.equal(router('/1.jpg'), 'static'); 
  // t.equal(router('/1.JPG'), 'static'); 
  // t.equal(router('/1.png'), 'static'); 
  // t.equal(router('/1.PNG'), 'static'); 
  // t.equal(router('/1.css'), 'static'); 
  // t.equal(router('/1.js'), 'static'); 
  t.equal(router('/'), 'root'); 
  // t.equal(router('/cats'), 'group'); 
  // t.equal(router('/cats/?format=application/json'), 'group'); 
  // t.equal(router('/cats/cute-kitten'), 'topic'); 
  // t.equal(router('/cats/cute-kitten/?format=application/json'), 'group'); 
  t.end();
});
