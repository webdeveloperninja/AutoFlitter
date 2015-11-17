

app.factory('getDealerService', function($http){
    
 return{
    getDealer: function() {
        return $http({
                url: '/get-user',
                method: 'GET'
        })
    }
 }
});


app.factory('twitterFactory', function($http){
 return{
    getTwitterAuthUrl : function() {
        return $http({
                url: '/request-token',
                method: 'GET'
        })
    }
 }
});

app.factory('EdmundsFactory', function($http){
    return {
        getRandomCar : function() {
            return $http({
                url: 'https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=g53javuem2pa84fcfsermsxk',
                method: 'GET'
            }); 
        }
    }
});


