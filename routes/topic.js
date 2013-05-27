'use strict';

// return a topic and all it's replies

var url = require('url');

module.exports = function(req, res, config) {
  var getGroupByName = config.db.get('get-group-by-name');
  var getTopics = config.db.get('get-topics');

  var parsed = url.parse(req.url);
  var groupName = parsed.pathname.substr(1);

  getGroupByName(groupName , function(err, group) {
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

      if (parsed.query === 'format=application/json') {
        res.writeHead(200, {'Content-Location': req.headers.host + groupName + '.json' });
        res.end(JSON.stringify({group: group, topics: topics}));
        return;
      }

    });
  });
};

