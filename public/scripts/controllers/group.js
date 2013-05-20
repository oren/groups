'use strict';

angular.module('groupsApp')
  .controller('GroupCtrl', function ($scope, $http, $routeParams) {
    $scope.group = {};
    $scope.topics = [];

    $http({method: 'GET', url: $routeParams.group + '?format=application/json'}).
      success(function(data, status, headers, config) {
        console.log('data', data);

        $scope.group = data.group; //{ value: {name: data.name, title: data.title} };
        $scope.topics = data.topics; //[
          //{ value: { content: 'jumping cat', user: null } }, 
          //{value: { content: 'a cat riding backward on a pig - must see video!', user: null }}
        //];
      }).
      error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
        console.log('error', data);
      });
  });
