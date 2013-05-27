'use strict';

// if group exist - return array of topics
// if not, return nil
module.exports = function (req, res, config) {
  console.log('boom');
  var getGroupByName = config.db.get('get-group-by-name');

  getGroupByName(normalPathName.substr(1) , function(err, group) {
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

      res.writeHead(200, {'Content-Location': req.headers.host + normalPathName + '.json' });
      res.end(JSON.stringify({group: group, topics: topics}));
    });
  });
};

