'use strict';

angular.module('groupsApp')
  .controller('AllGroupsCtrl', function ($scope, $http, $routeParams) {
    $scope.group = {};

    $http({method: 'GET', url: '/?format=application/json'}).
      success(function(groups, status, headers, config) {
        console.log('data', groups);

        $scope.groups = groups; //{ value: {name: data.name, title: data.title} };
      }).
      error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
        console.log('error', data);
      });
  });
