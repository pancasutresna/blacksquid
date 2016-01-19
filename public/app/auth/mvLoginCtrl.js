(function(){
    'use strict';

    angular
        .module('app')
        .controller('mvLoginCtrl', function($scope, $http){
            $scope.signin = function(username, password){
                $http.post('/login', {username:username, password: password}).then(function(response){
                    if(response.data.success){
                        console.log('Loged in');
                    } else {
                        console.log('Login failed');
                    }
                });
            }
        });

})();
