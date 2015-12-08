FoorumApp.controller('ShowTopicController', function($scope, $routeParams, $location, Api){
    var topicId = $routeParams.id;
    
    Api.getTopic(topicId).success(function(topic) {
        $scope.topic = topic;
    });
    
    $scope.addMessage = function() {
        var newMessage = $scope.newMessage;
        
        Api.addMessage(newMessage, topicId).success(function(message) {
            $location.path("/messages/" + message.id);
        });
    };
});
