"use strict";

// if group name found - return it. 
// if not return null

module.exports = function (db, subs) {
  return function(name, cb) {
    subs.groupNames.get(name, function(err, groupId) {
      if (err) {
        cb && cb(err, null) 
        return;
      };

      subs.groups.get(groupId, function(err, group) {
        if (err) {
          cb && cb(err, null) 
          return;
        };
      
        cb && cb(null, group);
      });
    })
  };
};
