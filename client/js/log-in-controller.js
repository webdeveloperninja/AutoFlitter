app.controller('LoginController', function($scope, $http) {
    $scope.test = 'test';
    
    $scope.login = function(user) {
        console.log(user);
        $http({
            url: '/log-in',
            method: 'POST',
            data: user
        });
    };
});