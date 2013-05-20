'use strict';

angular.module('groupsApp')
  .controller('TopicCtrl', function ($scope, $http) {
    $scope.group = {};
    $scope.topics = [];
    
    $http({method: 'GET', url: '/cat-videos'}).
      success(function(data, status, headers, config) {
        $scope.group = { value: {name: 'Cat Videos', title: 'EVERYONE LOVES CAT'} };
        $scope.topics = [
          { value: { content: 'jumping cat', user: null } }, 
          {value: { content: 'a cat riding backward on a pig - must see video!', user: null }}
        ];
      }).
      error(function(data, status, headers, config) {
        console.error('error', data);
      });
  });
