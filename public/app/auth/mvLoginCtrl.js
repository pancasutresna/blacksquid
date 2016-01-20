(function(){
    'use strict';

    angular
        .module('app')
        .controller('mvLoginCtrl', function($scope, $http, mvUser, mvNotifier, mvAuth, $location){
            $scope.user = mvUser;
            $scope.signin = function(username, password){
                mvAuth.authenticateUser(username, password).then(function(success){
                    if(success){
                        mvNotifier.notify('You have successfully signed in!');
                    } else {
                        mvNotifier.notify('Username/password combination incorrent');
                    }
                });
            }

            $scope.signout = function(){
                mvAuth.logoutUser().then(function(){
                    $scope.username = "";
                    $scope.password = "";
                    mvNotifier.notify("You have successfully signed out!");
                    $location.path('/');
                });
            }
        });



})();
