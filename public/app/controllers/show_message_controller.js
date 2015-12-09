FoorumApp.controller('ShowMessageController', function($scope, $routeParams, Api){
    var messageId = $routeParams.id;
    
    Api.getMessage(messageId).success(function(message) {
        $scope.message = message;
    });
    
    $scope.addReply = function() {
        var reply = $scope.reply;
        
        Api.addReply(reply, messageId).success(function(message) {
            message.User = $scope.userLoggedIn;
            
            $scope.message.Replies.push(message);
        });
        
        $scope.reply = "";
    };
});
