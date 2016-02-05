(function() {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.admin',
        'app.main',
        'app.place',
        'app.auth',
        'app.user'
    ]);

    /**
     * Called when controller resolve reject invoked
     */
    angular.module('app').run(function($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/');
            }
        });
    });

})();

(function () {
    'use strict';

    angular
        .module('app.admin', []);
})();

(function() {
    'use strict';

    angular
        .module('app.auth', []);
})();

(function() {
    'use strict';

    angular
        .module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize', 'ngResource', 'ngCookies',
        /*
         * Reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router'

        /*
         * 3rd party modules
         */
    ]);
})();

(function() {
    'use strict';

    angular.module('app.main', []);
})();

(function() {
    'use strict';

    angular
        .module('app.place', []);
})();

(function() {
    'use strict';

    angular
        .module('app.user', []);
})();

(function() {
    'use strict';

    angular.module('blocks.exception', ['blocks.logger']);

})();

(function() {
    'use strict';

    angular.module('blocks.logger', []);

})();

(function() {
    'use strict';

    angular
        .module('blocks.router', [
            'ngRoute',
            'blocks.logger'
        ]);
})();

(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];
    function routeConfig(routehelper) {
        var routes = [
            {
                url: '/admin/users',
                config: {
                    // templateUrl: '/partials/admin/user-list',
                    templateUrl: '/app/admin/user-list.html',
                    controller: 'mvAdminUserListCtrl',
                    resolve: routehelper.routeRoleChecks.admin
                }
            }
        ];

        routehelper.configureRoutes(routes);
    }

})();

(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('mvAdminUserListCtrl', function ($scope, mvUser) {
            $scope.users = mvUser.query(function () {
                console.log('scope users: ' + $scope.users.length);
            });
        });
})();

(function() {
    'use strict';

    angular
        .module('app.auth')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];
    function routeConfig(routehelper) {
        var routes = [
            {
                url: '/signup',
                config: {
                    // templateUrl:'/partials/auth/form-signup',
                    templateUrl:'/app/auth/form-signup.html',
                    controller: 'mvSignupCtrl'
                }
            },
            {
                url: '/profile',
                config: {
                    // templateUrl: '/partials/auth/form-profile',
                    templateUrl: '/app/auth/form-profile.html',
                    controller: 'mvProfileCtrl',
                    resolve: routehelper.routeRoleChecks.user
                }
            }
        ];

        routehelper.configureRoutes(routes);
    }

})();

(function() {
    'use strict';

    angular.module('app.auth').factory('mvAuth', function($http, $q, $cookieStore, $rootScope, mvIdentity, mvUser) {
        return {
            createUser: function(newUserData) {
                var newUser = new mvUser(newUserData);
                var dfd = $q.defer();

                newUser.$save().then(function() {
                    mvIdentity.currentUser = newUser;
                    dfd.resolve();
                }, function(response) {
                    dfd.reject(response.data.reason);
                });

                return dfd.promise;
            },
            updateCurrentUser: function(newUserData) {
                var dfd = $q.defer();
                var clone = angular.copy(mvIdentity.currentUser);
                angular.extend(clone, newUserData);
                clone.$update().then(
                    function() {
                        mvIdentity.currentUser = clone;
                        dfd.resolve();
                    },
                    function(response) {
                        dfd.reject(response.data.reason);
                    }
                );

                return dfd.promise;
            },
            authenticateUser: function(username, password) {
                var dfd = $q.defer();
                $http.post('/login', {username:username, password: password})
                .then(function(response) {
                    if (response.data.success) {
                        var user = new mvUser();
                        angular.extend(user, response.data.user);
                        mvIdentity.currentUser = user;

                        /*
                         * create new cookie object for storing currentUser credential
                         */
                        var  bootstrappedUserObject = mvIdentity.currentUser;
                        $cookieStore.put('bootstrappedUser', bootstrappedUserObject);

                        dfd.resolve(true);
                    } else {
                        dfd.resolve(false);
                    }
                });
                return dfd.promise;
            },
            logoutUser: function() {
                var dfd = $q.defer();
                $http.post('/logout', {logout:true}).then(function() {
                    mvIdentity.currentUser = undefined;
                    dfd.resolve();
                });
                return dfd.promise;
            },
            authorizeCurrentUserForRoute: function(role) {
                if (mvIdentity.isAuthorized(role)) {
                    return true;
                } else {
                    return $q.reject('not authorized');
                }
            },
            authorizeAuthenticatedUserForRoute: function() {
                if (mvIdentity.isAuthenticated()) {
                    return true;
                } else {
                    return $q.reject('Not authorized');
                }
            }
        };
    });
})();

(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('mvIdentity', function($window, $cookieStore, mvUser) {

            var currentUser;
            /**
             * get currentUser object from $cookieStore
             */
            if (!!$cookieStore.get('bootstrappedUser')) {
                currentUser = new mvUser();
                angular.extend(currentUser, $cookieStore.get('bootstrappedUser'));
            }

            return {
                currentUser: currentUser,
                isAuthenticated: function() {
                    return !!this.currentUser;
                },
                isAuthorized: function(role) {
                    return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
                }
            };
        });
})();

(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('mvLoginCtrl', function($scope, $http, $cookieStore, mvIdentity, logger, mvAuth, $location) {
            $scope.identity = mvIdentity;
            $scope.signin = function(username, password) {
                mvAuth.authenticateUser(username, password).then(function(success) {
                    if (success) {
                        logger.info('You have successfully signed in!');
                    } else {
                        logger.warning('Username/password combination incorrent');
                    }
                });
            };

            $scope.signout = function() {
                mvAuth.logoutUser().then(function() {
                    /*
                     * Remove stored cookies
                     */
                    $cookieStore.remove('bootstrappedUser');
                    $scope.username = '';
                    $scope.password = '';
                    logger.info('You have successfully signed out!');
                    $location.path('/');
                });
            };
        });
})();

(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('mvProfileCtrl', function($scope, mvAuth, mvIdentity, logger) {
            $scope.email = mvIdentity.currentUser.username;
            $scope.firstName = mvIdentity.currentUser.firstName;
            $scope.lastName = mvIdentity.currentUser.lastName;

            $scope.update = function() {
                var newUserData = {
                    username: $scope.email,
                    firstName: $scope.firstName,
                    lastName: $scope.lastName
                };

                // save changed password if user fillin the password field
                if ($scope.password && $scope.password.length > 0) {
                    newUserData.password = $scope.password;
                }

                mvAuth.updateCurrentUser(newUserData).then(function() {
                    logger.info('Your user account has been updated');
                }, function(reason) {
                    logger.error(reason);
                });

            };
        });
})();

(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('mvSignupCtrl', function($scope, mvAuth, logger, $location) {

            $scope.signup = function() {
                var newUserData = {
                    username: $scope.email,
                    password: $scope.password,
                    firstName: $scope.firstName,
                    lastName: $scope.lastName
                };

                mvAuth.createUser(newUserData).then(function() {
                    logger.info('New user created!');
                    $location.path('/');
                }, function(reason) {
                    logger.error(reason);
                });
            };
        });
})();

(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[black squid Error]',
        appTitle: 'black squid',
        version: '1.0.0'
    };

    core.value('config', config);

    core.config(configure);

    /**
     *
     * @param $logProvider
     * @param $routeProvider
     * @param routeHelperConfigProvider
     * @param exceptionHandlerProvider
     */
    /*
     * routehelperConfigProvider -> routehelperConfig + suffix (Provider) as well as exceptionHandlerProvider
     */
    configure.$inject = ['$logProvider', '$routeProvider', '$locationProvider',
                         'routehelperConfigProvider', 'exceptionHandlerProvider'];
    function configure($logProvider, $routeProvider, $locationProvider,
                        routehelperConfigProvider, exceptionHandlerProvider) {

        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // configure commmon route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'black squid';

        var resolveAlways = {
            //ready: ['dataservice', function(dataservice){
            //    return dataservice.ready();
            //}]
        };

        routehelperConfigProvider.config.resolveAlways = resolveAlways;
        //
        //// Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);

    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment);

})();

(function() {
    'use strict';

    angular
        .module('app.main')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];
    function routeConfig(routehelper) {
        var routes = [
            {
                url: '/',
                config: {
                    // templateUrl:'/partials/main/content-main',
                    templateUrl:'/app/main/content-main.html',
                    controller: 'mvMainCtrl'
                }
            }
        ];

        routehelper.configureRoutes(routes);
    }
})();

(function() {
    'use strict';

    angular
        .module('app')
        .controller('mvMainCtrl', function($scope, mvCachedPlace) {
            $scope.places = mvCachedPlace.query();
        });
})();

(function() {
    'use strict';

    angular
        .module('app.place')
        .run(appRun);

    /*
     * Call routehelper on module blocks.router
     */
    appRun.$inject = ['routehelper'];
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/places',
                config: {
                    // templateUrl: '/partials/place/place-list',
                    templateUrl: '/app/place/place-list.html',
                    controller: 'mvPlaceListCtrl'
                }
            },
            {
                url: '/places/:id',
                config: {
                    // templateUrl: '/partials/place/place-detail',
                    templateUrl: '/app/place/place-detail.html',
                    controller: 'mvPlaceDetailCtrl'
                }
            }
        ];
    }
})();

(function() {
    'use strict';

    angular
        .module('app.place')
        .factory('mvCachedPlace', function(mvPlace) {
            var placeList;

            return {
                query: function() {
                    if (!placeList) {
                        placeList = mvPlace.query();
                    }

                    return placeList;
                }
            };
        });
})();

(function() {
    'use strict';

    angular
        .module('app.place')
        .factory('mvPlace', function($resource) {
            // _id is used in the mvPlaceDetailCtrl
            var placeResource = $resource('/api/places/:_id', {_id: '@id'}, {
                update: {method: 'PUT', isArray: false}
            });

            return placeResource;
        });
})();

(function() {
    'use strict';

    angular
        .module('app.place')
        .controller('mvPlaceDetailCtrl', function($scope, mvCachedPlace, $routeParams) {
            //$scope.place = mvPlace.get({_id:$routeParams.id});
            mvCachedPlace.query().$promise.then(function(collection) {
                collection.forEach(function(place) {
                    if (place._id === $routeParams.id) {
                        $scope.place = place;
                    }
                });
            });
        });
})();

(function() {
    'use strict';

    angular
        .module('app.place')
        .controller('mvPlaceListCtrl', function($scope, mvCachedPlace) {
            $scope.places = mvCachedPlace.query();

            $scope.sortOptions = [
                {value: 'title', text: 'Sort by Title'},
                {value: 'published', text: 'Sort by publish data'}
            ];

            $scope.sortOrder = $scope.sortOptions[0].value;
        });
})();


(function() {
    'use strict';

    angular
        .module('app.user')
        .factory('mvUser', function($resource) {
            var UserResource = $resource('/api/users/:id', {
                _id: '@id'
            }, {
                update: {
                    method: 'PUT',
                    isArray: false
                }
            });

            UserResource.prototype.isAdmin  = function() {
                return this.roles && this.roles.indexOf('admin') > -1;
            };

            return UserResource;

        });
})();

/* global toastr */
/* global angular */
(function() {
    'use strict';

    angular
        .module('app')
        .value('mvToastr', toastr);

    angular
        .module('app')
        .factory('mvNotifier', function(mvToastr) {
            return {
                notify: function(msg) {
                    mvToastr.success(msg);
                    console.log(msg);
                },
                error: function(msg) {
                    mvToastr.error(msg);
                    console.log(msg);
                }
            };
        });
})();

(function() {
    'use strict';

    angular
        .module('blocks.exception')
        .provider('exceptionHandler', exceptionHandlerProvider)
        .config(config);

    /**
     * Must configure the exception handling
     * @return {[type]}
     */
    function exceptionHandlerProvider() {
        var exceptionHandler = this;

        exceptionHandler.config = {
            appErrorPrefix: undefined
        };

        exceptionHandler.configure = function(appErrorPrefix) {
            this.config.appErrorPrefix = appErrorPrefix;
        };

        exceptionHandler.$get = function() {
            return {
                config: this.config
            };
        };
    }

    /**
     * Configure by setting an optional string value for appErrorPrefix.
     * Accessible via config.appErrorPrefix (via config value).
     * @param  {[type]} $provide
     * @return {[type]}
     * @ngInject
     */
    config.$inject = ['$provide'];
    function config($provide) {
        // extend default exceptionHandler
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    /**
     * Extend the $exceptionHandler service to also display a toast.
     * @param  {Object} $delegate
     * @param  {Object} exceptionHandler
     * @param  {Object} logger
     * @return {Function} the decorated $exceptionHandler service
     */
    function extendExceptionHandler($delegate, exceptionHandler, logger) {
        return function(exception, cause) {
            var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
            var errorData = {
                exception: exception,
                cause: cause
            };
            exception.message = appErrorPrefix + exception.message;

            // call default exception handler
            $delegate(exception, cause);

            /**
             * Could add the error to a service's collection,
             * add errors to $rootScope, log errors to remote web server,
             * or log locally. Or throw hard. It is entirely up to you.
             * throw exception;
             *
             * @example
             *     throw { message: 'error message we added' };
             */
            logger.error(exception.message, errorData);
        };
    }

})();

(function() {
    'use strict';

    angular
        .module('blocks.exception')
        .factory('exception', exception);

    exception.$inject = ['logger'];
    function exception(logger) {
        /*
         * Define expossed services
         */
        var service = {
            catcher: catcher
        };

        return service;

        //////////////////////////////////
        /*
         * Service implementation details
         */
        function catcher(message) {
            return function(reason) {
                logger.error(message, reason);
            };
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('blocks.logger')
        .factory('logger', ['$log', 'toastr', logger]);

    function logger($log, toastr) {
        /*
         * define expossed services
         */
        var service = {
            showToasts: true,

            error: error,
            info: info,
            success: success,
            warning: warning,

            // straight to console; bypass toastr
            log: $log.log
        };

        return service;

        ///////////////////////////////////////////
        /*
         * Implementation details
         */

        function error(message, data, title) {
            toastr.error(message, title);
            $log.error('Error: ' + message, data);
        }

        function info(message, data, title) {
            toastr.info(message, title);
            $log.info('Info: ' + message, data);
        }

        function success(message, data, title) {
            toastr.success(message, title);
            $log.success('Success: ' + message, data);
        }

        function warning(message, data, title) {
            toastr.warning(message, title);
            $log.warn('Warning: ' + message, data);
        }

    }
})();

(function() {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    function routehelperConfig() {
        this.config = {
            // These are the properties we need to set
            // $routeProvider: undefined
            // docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

    routehelper.$inject = ['$location', '$rootScope', '$route', 'logger', 'routehelperConfig', 'mvAuth'];
    function routehelper($location, $rootScope, $route, logger, routehelperConfig, mvAuth) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var routes = [];
        var $routeProvider = routehelperConfig.config.$routeProvider;

        var routeRoleChecks = {
            admin: {
                auth: function(mvAuth) {
                    return mvAuth.authorizeCurrentUserForRoute('admin');
                }
            },
            user: {
                auth: function(mvAuth) {
                    return mvAuth.authorizeAuthenticatedUserForRoute();
                }
            }
        };

        /**
         * Define expossed services
         */
        var service = {
            routeRoleChecks: routeRoleChecks,
            configureRoutes: configureRoutes,
            getRoutes: getRoutes,
            routeCounts: routeCounts

        };

        init();

        return service;

        ////////////////////////////////////////////
        /**
         * Service implementation details
         */

        function configureRoutes(routes) {
            routes.forEach(function(route) {
                route.config.resolve =
                    angular.extend(route.config.resolve || {},
                        routehelperConfig.config.resolveAlways);
                $routeProvider.when(route.url, route.config);
            });
            $routeProvider.otherwise({redirectTo: '/'});
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$routeChangeError',
                function(event, current, previous, rejection) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (current &&
                        (current.title || current.name || current.loadedTemplateUrl)) || 'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    logger.warning(msg, [current]);
                    $location.path('/');
                }
            );
        }

        function init() {
            handleRoutingErrors();
            updateDocTitle();
        }

        function getRoutes() {
            for (var prop in $route.routes) {
                if ($route.routes.hasOwnProperty(prop)) {
                    var route = $route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }

        function updateDocTitle() {
            $rootScope.$on('$routeChangeSuccess',
                function(event, current, previous) {
                    routeCounts.changes++;
                    handlingRouteChangeError = false;
                    var title = routehelperConfig.config.docTitle + ' ' + (current.title || '');
                    $rootScope.title = title; // data bind to <title>
                }
            );
        }
    }
})();

angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("/app/admin/user-list.html","<div class=container><h1>User List</h1><table class=table><tr ng-repeat=\"user in users\"><td>{{user.firstName + \' \' + user.lastName}}</td></tr></table></div>");
$templateCache.put("/app/auth/form-login.html","<div ng-controller=mvLoginCtrl class=navbar-right><form ng-hide=identity.isAuthenticated() class=navbar-form><div class=form-group><input placeholder=Email ng-model=username class=form-control></div><div class=form-group><input type=password placeholder=Password ng-model=password class=form-control></div><button ng-click=\"signin(username, password)\" class=\"btn btn-primary\">Signin</button>&nbsp;<a href=/signup class=\"btn btn-default\">Sign up</a></form><ul ng-show=identity.isAuthenticated() class=\"nav navbar-nav navbar-right\"><li class=dropdown><a href data-toggle=dropdown class=dropdown-toggle>{{ identity.currentUser.firstName + \" \" + identity.currentUser.lastName }}<b class=caret></b></a><ul class=dropdown-menu><li ng-show=identity.currentUser.isAdmin()><a href=/admin/users>User Admin</a></li><li><a href=/profile>Profile</a></li><li><a href ng-click=signout()>Sign Out</a></li></ul></li></ul></div>");
$templateCache.put("/app/auth/form-profile.html","<div class=container><div class=well><form name=profileForm class=form-horizontal><fieldset><legend>User Profile<div class=form-group><label for=email class=\"col-md-2 control-label\">Email</label><div class=col-md-10><input name=email type=email placeholder=Email ng-model=email required class=form-control></div></div><div class=form-group><label for=firstName class=\"col-md-2 control-label\">First Name</label><div class=col-md-10><input name=firstName type=firstName placeholder=\"First Name\" ng-model=firstName required class=form-control></div></div><div class=form-group><label for=lastName class=\"col-md-2 control-label\">Last Name</label><div class=col-md-10><input name=lastName type=lastName placeholder=\"Last Name\" ng-model=lastName required class=form-control></div></div><div class=form-group><label for=password class=\"col-md-2 control-label\">Password</label><div class=col-md-10><input name=password type=password placeholder=Password ng-model=password class=form-control></div></div><div class=form-group><div class=\"col-md-10 col-md-offset-2\"><div class=pull-right><button ng-click=update() ng-disable=profileForm.invalid class=\"btn btn-primary\">Submit</button><a href=\"/\" class=\"btn btn-default\">Cancel</a></div></div></div></legend></fieldset></form></div></div>");
$templateCache.put("/app/auth/form-signup.html","<div class=container><div class=well><form name=signupForm class=form-horizontal><fieldset><legend>New User Information<div class=form-group><label for=email class=\"col-md-2 control-label\">Email</label><div class=col-md-10><input name=email type=email placeholder=Email ng-model=email required class=form-control></div></div><div class=form-group><label for=password class=\"col-md-2 control-label\">Password</label><div class=col-md-10><input name=password type=password placeholder=Password ng-model=password required class=form-control></div></div><div class=form-group><label for=firstName class=\"col-md-2 control-label\">First Name</label><div class=col-md-10><input name=firstName type=firstName placeholder=\"First Name\" ng-model=firstName required class=form-control></div></div><div class=form-group><label for=lastName class=\"col-md-2 control-label\">Last Name</label><div class=col-md-10><input name=lastName type=lastName placeholder=\"Last Name\" ng-model=lastName required class=form-control></div></div><div class=form-group><div class=\"col-md-10 col-md-offset-2\"><div class=pull-right><button ng-click=signup() ng-disable=signupForm.invalid class=\"btn btn-primary\">Submit</button><a href=\"/\" class=\"btn btn-default\">Cancel</a></div></div></div></legend></fieldset></form></div></div>");
$templateCache.put("/app/main/content-main.html","<div class=container><div class=jumbotron><h1>Example</h1></div><div class=row><div class=col-md-12><div ng-include=\"\'/app/main/panel-featured-place.html\'\"></div></div></div><div class=row><div class=col-md-12><div ng-include=\"\'/app/main/panel-new-place.html\'\"></div></div></div></div>");
$templateCache.put("/app/main/panel-featured-place.html","<div class=\"panel panel-primary\"><div class=\"panel-heading text-center\">Featured places</div><div class=panel-body><div ng-repeat=\"place in places | filter:{featured:true}\" class=row><div class=col-md-12><a href=\"/places/{{ place._id }}\">{{ place.title }}</a></div></div></div></div>");
$templateCache.put("/app/main/panel-new-place.html","<div class=\"panel panel-primary\"><div class=\"panel-heading text-center\">New places</div><div class=panel-body><div ng-repeat=\"place in places | filter:{order_by:published} | limitTo:10\" class=row><div class=col-md-3>{{place.published | date:\'MMM d\'}}</div><div class=col-md-9><a href=\"/places/{{ place._id }}\">{{ place.title }}</a></div></div></div></div>");
$templateCache.put("/app/place/place-detail.html","<div class=container><h1>{{ place.title }}</h1><div class=row><div class=col-md-6><h3 ng-show=place.featured>Featured</h3><h3>Published on {{ place.published | date }}</h3></div><div class=col-md-6><div class=\"panel panel-primary\"><div class=panel-heading>Tags</div><div class=panel-body><div ng-repeat=\"tag in place.tags\">{{tag}}</div></div></div></div></div></div>");
$templateCache.put("/app/place/place-list.html","<div class=container><div class=pull-right><form class=form-inline><div class=form-group><input ng-model=searchText placeholder=Search class=form-control></div><div class=form-group><select ng-model=sortOrder ng-options=\"item.value as item.text for item in sortOptions\" class=form-control></select></div></form></div><table class=\"table table-hover table-stripped table-condensed\"><thead><tr><th>Title</th><th>Publish Date</th></tr></thead><tbody><tr ng-repeat=\"place in places | filter:searchText | orderBy: sortOrder\"><td><a href=\"/places/{{ place._id }}\">{{ place.title }}</a></td><td>{{ place.published | date }}</td></tr></tbody></table></div>");}]);