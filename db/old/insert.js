"use strict";

var levelup = require('levelup')
var db = levelup('./myDB', {valueEncoding: 'json'})

var timeGroup1 = Date.now();
var timeGroup2 = Date.now() + 1;
var timeTopic1 = Date.now() + 2;
var timeTopic2 = Date.now() + 3;
var timeReply1 = Date.now() + 4;
var timeReply2 = Date.now() + 5;

// add cat group
db.put('group!' + timeGroup1, {name: 'cats', user: 'josh@gmail.com'}, function (err) {
  if (err) return console.log('Ooops!', err) // some kind of I/O error
  // add cooking group
  db.put('group!' + timeGroup2, {name: 'cooking', user: 'dan@gmail.com'}, function (err) {
    if (err) return console.log('Ooops!', err) // some kind of I/O error
    // add topic to cat group
    db.put('topic!' + timeGroup1 + '!' + timeTopic1, {user: 'josh@gmail.com', title: 'cat jumping into tv'}, function (err) {
      if (err) return console.log('Ooops!', err) // some kind of I/O error
      // add topic to cat group
      db.put('topic!' + timeGroup1 + '!' + timeTopic2, {user: 'jordan@gmail.com', title: 'sleepy cat'}, function (err) {
        if (err) return console.log('Ooops!', err) // some kind of I/O error
        // add reply to topic
        db.put('reply!' + timeTopic1 + '!' + timeReply1, {user: 'vera@gmail.com', content: 'OMG. so cute!'}, function (err) {
          if (err) return console.log('Ooops!', err) // some kind of I/O error
          // add reply to topic
          db.put('reply!' + timeTopic1 + '!' + timeReply2, {user: 'misha@gmail.com', content: 'LOL i totaly want one too'}, function (err) {
            if (err) return console.log('Ooops!', err) // some kind of I/O error
            getGroups();
          });
        });
      });
    });
  });
});

function getGroups() {
  // to get a stream of all groups in reverse chronological order
  db.createReadStream({start: 'group!~', end: 'group!', reverse: 'true' })
   .on('data', function (data) {
      console.log('group:');
      console.log(data.key, '=', data.value)
    })
    .on('error', function (err) {
      console.log('Oh my!', err)
    })
    .on('close', function () {
      console.log('Stream closed')
    })
    .on('end', function () {
      console.log('Stream ended')
      getTopics('topic!' + timeGroup1);
    })
}

function getTopics(group) {
  // to get a stream of all topics of a group in reverse chronological order
  db.createReadStream({start: group + '!~', end: group + '!', reverse: true })
   .on('data', function (data) {
      console.log('topic:');
      console.log(data.key, '=', data.value)
    })
    .on('error', function (err) {
      console.log('Oh my!', err)
    })
    .on('close', function () {
      console.log('Stream closed')
    })
    .on('end', function () {
      console.log('Stream ended')
      getReplies('reply!' + timeTopic1);
    })
}

function getReplies(topic) {
  // to get a stream of all replies in a topic in reverse chronological order
  db.createReadStream({start: topic + '!~', end: topic + '!', reverse: true })
   .on('data', function (data) {
      console.log('reply:');
      console.log(data.key, '=', data.value)
    })
    .on('error', function (err) {
      console.log('Oh my!', err)
    })
    .on('close', function () {
      console.log('Stream closed')
    })
    .on('end', function () {
      console.log('Stream ended')
    })
}
