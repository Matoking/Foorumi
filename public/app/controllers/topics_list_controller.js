FoorumApp.controller('TopicsListController', function($scope, $location, Api){
    Api.getTopics().success(function(topics) {
        $scope.topics = topics;
    });
    
    $scope.addTopic = function() {
        var newTopic = $scope.newTopic;
        
        Api.addTopic(newTopic).success(function(topic) {
            $location.path("/topics/" + newTopic.id);
        });
    }
});
