'use strict';

module.exports = function(req, res, config) {
  var getAllGroups = config.db.get('get-all-groups');

  getAllGroups(function(err, groups) {
    if (err) {
      // res.writeHead(404);
      return console.error('error in getAllGroups', err);
    } 

    return res.template('index.ejs', { groups: groups })
  });
};
