'use strict';

angular.module('groupsApp')
  .controller('AllGroupsCtrl', function ($scope, $http, $routeParams) {
    $scope.group = {};

    // $http({method: 'GET', url: '/?format=application/json'}).
    //   success(function(groups, status, headers, config) {

    //     $scope.groups = groups; //{ value: {name: data.name, title: data.title} };
    //   }).
    //   error(function(data, status, headers, config) {
    //     console.error('error', data);
    //   });
  });
