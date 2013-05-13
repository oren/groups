"use strict";

// if group name found - return it. 
// if not return null

module.exports = function (db, subs) {
  return function(name, cb){
    subs.groupNames.get(name, function(err, group) {
      if (err) {
        cb && cb(err, null) 
        return;
      };

      console.log('group', group);
      
      cb && cb(null, {value: {name: 'Cat Videos'}});
    });
  }
}
