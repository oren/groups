"use strict";

var environment = process.env.NODE_ENV || 'development';
var config = require('../../config/' + environment + '.js');
var db = config.db

var insert = db.get('insert-group');
var insertTopic = db.get('insert-topic');

insert('Cat Videos', 'EVERYONE LOVES CATS', '1', function(err, groupId) {
  if (err) {
    return console.log('error', err);
  }

  insertTopic(groupId, 'dancing cats', 'wow, cool kitten!', '1', function(err, result) {
    if (err) {
      return console.log('error', err);
    } 

    insertTopic(groupId, 'crazy cats', 'air boxing', '2', function(err, result) {
      if (err) {
        return console.log('error', err);
      } 
    });
  });
});

insert('Pro Select', 'Y U NO DONE?!', '6', function(err, groupId) {
  if (err) {
    return console.log('error', err);
  }

  insertTopic(groupId, 'final stepes', 'lets write down the final steps', '2', function(err, result) {
    if (err) {
      return console.log('error', err);
    } 

    insertTopic(groupId, 'release plan', 'ok. we are almost done', '3', function(err, result) {
      if (err) {
        return console.log('error', err);
      } 
    });
  });
});

insert('Happy Hour', 'events you should not miss!', '2', function(err, group) {
  if (err) {
    return console.log('error', err);
  }
});

insert('TGIF', "Let's talk about why we like Fridays", '3', function(err, group) {
  if (err) {
    return console.log('error', err);
  }
});

insert('Node.js', "let's talk node here", '4', function(err, group) {
  if (err) {
    return console.log('error', err);
  }
});

insert('Running group', 'talks about running/hiking', '5', function(err, group) {
  if (err) {
    return console.log('error', err);
  }
});

insert('YP Leads', 'Leads Project', '8', function(err, group) {
  if (err) {
    return console.log('error', err);
  }
});

insert('Restauranst', "we like to eat!", '7', function(err, group) {
  if (err) {
    return console.log('error', err);
  }
});
