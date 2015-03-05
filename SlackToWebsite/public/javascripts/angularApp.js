var app = angular.module('SlackToWebSite', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
 $stateProvider
   .state('SlackToWebSite', {
     url: '/SlackToWebSite',
     templateUrl: '/index.html',
     controller: 'MainCtrl',
     resolve: {
      postPromise: ['Messages', function(messages){
        return messages.getAll();
      }]
    }
   });

 $urlRouterProvider.otherwise('SlackToWebSite');
}]);

app.factory('Messages', [function($http){
   var o = { 
      messages:{'message1', 'message2', 'message3'} 
    };

    o.getAll = function() {
    return $http.get('/messages').success(function(data){
      angular.copy(data, o.messages);
    });
  };

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