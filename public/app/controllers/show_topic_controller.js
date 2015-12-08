FoorumApp.controller('ShowTopicController', function($scope, $routeParams, $location, Api){
    var topicId = $routeParams.id;
    
    Api.getTopic(topicId).success(function(topic) {
        $scope.topic = topic;
    })
});
