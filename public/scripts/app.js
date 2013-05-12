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
      .when('/topic/:topicId', {
        templateUrl: '/public/views/topic.html',
        controller: 'TopicCtrl'
      })
      .otherwise({
        templateUrl: '/public/views/group.html',
        controller: 'GroupCtrl'
      });
  });
