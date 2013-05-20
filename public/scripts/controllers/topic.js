'use strict';

angular.module('groupsApp')
  .controller('TopicCtrl', function ($scope, $http, $routeParams) {
    $scope.group = {};
    $scope.topics = [];

    console.log('group', $routeParams.group);
    console.log('topic', $routeParams.topic);
    
    $http({method: 'GET', url: '/' + $routeParams.group + '/' + $routeParams.topic + '?format=application/json'}).
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
