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

app.factory('Messages', ['$http', function($http){
   var o = { 
      messages:[] 
    };

    o.getAll = function() {
    return $http.get('/api/messages').success(function(data){
      angular.copy(data, o.messages);
    });
  };

   return o;
}]);

app.controller('MainCtrl', ['$scope', 'Messages',
   function($scope, Messages) {
     $scope.numberMessages = '';
     $scope.channelName = '';
     $scope.messages = Messages.messages;

     $scope.getChannelMessages = function(){
        Messages.getAll();
     };
}]);