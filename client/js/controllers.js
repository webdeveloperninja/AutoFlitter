app.controller('NewDealerController', function($scope, $http) {
    $scope.saveDealer = function() {
        $http({
            url: '/new-dealer',
            method: 'POST',
            data: $scope.dealerSettings
        });
    }
});

app.controller('WelcomeController', function($scope, twitterFactory, $window) {
    $scope.TwitterLogin = function() {
        twitterFactory.getTwitterAuthUrl().success(function(data){
            var redirectTwitterURL = data;
            console.log(redirectTwitterURL);
            $window.location.href = redirectTwitterURL;
        });
    }
});

app.controller('TweetController', function($scope, $http, getDealerFactory, twitterFactory, EdmundsFactory) {
    $scope.tweet = function() {
        $http.post('/tweet',  { 'tweet' : $scope.tweetInfo });
    };
    $scope.getEdmundsCar = function() {
        EdmundsFactory.getRandomCar().success(function(data){
            console.log(data);
        });
    }
    getDealerFactory.getDealer().success(function(data){
        console.log(data);
        $scope.dealer = data.dealerData;
        var access_token_key = data.accessToken;
        var access_token_secret = data.accessSecret;
        console.log('Access token key: ' + access_token_key);
        console.log('Access token secret: ' + access_token_secret);
    });
});


app.controller('SettingsController', function($scope, $http) {
    // Settigns Controller
});

// study this 
app.controller('MainMenuController', function($scope, $http, getDealerService) {
        getDealerService.getDealer().success(function(data) {
            console.log('getDealerService Hit');
        });
        /*
        $scope.dealer = data.dealerData;
        var access_token_key = data.accessToken;
        var access_token_secret = data.accessSecret;
        console.log('Access token key: ' + access_token_key);
        console.log('Access token secret: ' + access_token_secret);
        */

});




