FoorumApp.controller('UsersController', function($scope, $location, Api){
    $scope.login = function() {
        $scope.errorMessage = null;
        
        Api.login({username: $scope.username,
                   password: $scope.password}).success(function(user) {
            $location.path("/");
        }).error(function() {
            $scope.errorMessage = "Väärä käyttäjätunnus tai salasana!";
        });
    };
    
    $scope.register = function() {
        $scope.errorMessage = null;
        
        Api.register({username: $scope.username,
                      password: $scope.password}).success(function(user) {
            $location.path("/");
        }).error(function () {
            $scope.errorMessage = "Käyttäjätunnus on jo käytössä!";
        });
    };
});
