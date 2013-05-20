'use strict';

angular.module('groupsApp', [])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: '/public/views/allGroups.html',
        controller: 'AllGroupsCtrl'
      })
      .when('/recent', {
        templateUrl: '/public/views/recentReplies.html',
        controller: 'RecentRepliesCtrl'
      })
      .when('/:group/:topic', {
        templateUrl: '/public/views/topic.html',
        controller: 'TopicCtrl'
      })
      .when('/:group', {
        templateUrl: '/public/views/group.html',
        controller: 'GroupCtrl'
      });
  });
