var app = angular.module('SlackToWebSite', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
 $stateProvider
   .state('SlackToWebSite', {
     url: '/SlackToWebSite',
     templateUrl: '/index.html',
     controller: 'MainCtrl'
   });

 $urlRouterProvider.otherwise('SlackToWebSite');
}]);

app.factory('Messages', [function(){
   var data = { messages:[] };
   return data;
}]);

app.controller('MainCtrl', ['$scope', 'Messages'
   function($scope) {
     $scope.numberMessages = '';
     $scope.channelName = '';
     $scope.messages = Messages.messages;

     $scope.getChannelMessages = function(){
        
     };
}]);