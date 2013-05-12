'use strict';

angular.module('groupsApp')
  .controller('GroupCtrl', function ($scope, $http) {
    $scope.group = {};
    $scope.topics = [];
    
    $http({method: 'GET', url: '/cat-videos'}).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('success', data);

        $scope.group = { value: {name: 'Cat Videos', title: 'EVERYONE LOVES CAT'} };
        $scope.topics = [
          { value: { content: 'jumping cat', user: null } }, 
          {value: { content: 'a cat riding backward on a pig - must see video!', user: null }}
        ];
      }).
      error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
        console.log('error', data);
      });
  });
