!function(){"use strict";angular.module("app",["app.core","app.admin.user","app.main","app.user","app.place"]),angular.module("app").run(["$rootScope","$location",function(e,r){e.$on("$routeChangeError",function(e,t,o,a){"not authorized"===a&&r.path("/")})}])}(),function(){"use strict";angular.module("app.main",[])}(),function(){"use strict";angular.module("app.core",["ngAnimate","ngRoute","ngSanitize","ngResource","ngCookies","blocks.exception","blocks.logger","blocks.router"])}(),function(){"use strict";angular.module("app.place",[])}(),function(){"use strict";angular.module("app.user",[])}(),function(){"use strict";angular.module("app.admin.user",[])}(),function(){"use strict";angular.module("blocks.exception",["blocks.logger"])}(),function(){"use strict";angular.module("blocks.router",["ngRoute","blocks.logger"])}(),function(){"use strict";angular.module("blocks.logger",[])}(),function(){"use strict";function e(e,r){e.places=r.query()}angular.module("app.main").controller("MainController",e),e.$inject=["$scope","PlaceResourceCache"]}(),function(){"use strict";function e(e){var r=[{url:"/",config:{templateUrl:"/app/main/main.html",controller:"MainController"}}];e.configureRoutes(r)}angular.module("app.main").run(e),e.$inject=["RouterFactory"]}(),function(){"use strict";function e(e,r,o,a,n){e.debugEnabled&&e.debugEnabled(!0),o.html5Mode({enabled:!0,requireBase:!1}),a.config.$routeProvider=r,a.config.docTitle="black squid";var i={};a.config.resolveAlways=i,n.configure(t.appErrorPrefix)}function r(e){e.options.timeOut=4e3,e.options.positionClass="toast-bottom-right"}var t={appErrorPrefix:"[BLACK SQUID ERROR]",appTitle:"black squid",version:"1.0.0"},o=angular.module("app.core");o.config(r),o.value("config",t),o.config(e),e.$inject=["$logProvider","$routeProvider","$locationProvider","RouterConfigProvider","ExceptionHandlerProvider"],r.$inject=["toastr"]}(),function(){"use strict";angular.module("app.core").constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function e(e,r,t){r.query().$promise.then(function(r){r.forEach(function(r){r._id===t.id&&(e.place=r)})})}angular.module("app.place").controller("PlaceDetailController",e),e.$inject=["$scope","PlaceResourceCache","$routeParams"]}(),function(){"use strict";function e(e,r){e.places=r.query(),e.sortOptions=[{value:"title",text:"Sort by Title"},{value:"published",text:"Sort by publish data"}],e.sortOrder=e.sortOptions[0].value}angular.module("app.place").controller("PlaceListController",e),e.$inject=["$scope","PlaceResourceCache"]}(),function(){"use strict";function e(e){var r;return{query:function(){return r||(r=e.query()),r}}}angular.module("app.place").factory("PlaceResourceCache",e),e.$inject=["PlaceResource"]}(),function(){"use strict";function e(e){var r=e("/api/places/:_id",{_id:"@id"},{update:{method:"PUT",isArray:!1}});return r}angular.module("app.place").factory("PlaceResource",e),e.$inject=["$resource"]}(),function(){"use strict";function e(e){var r=[{url:"/places",config:{templateUrl:"/app/place/place-list.html",controller:"PlaceListController"}},{url:"/places/:id",config:{templateUrl:"/app/place/place-detail.html",controller:"PlaceDetailController"}}];e.configureRoutes(r)}angular.module("app.place").run(e),e.$inject=["RouterFactory"]}(),function(){"use strict";function e(e,r,t){var o;return r.get("bootstrappedUser")&&(o=new t,angular.extend(o,r.get("bootstrappedUser"))),{currentUser:o,isAuthenticated:function(){return!!this.currentUser},isAuthorized:function(e){return!!this.currentUser&&this.currentUser.roles.indexOf(e)>-1}}}angular.module("app.user").factory("IdentityFactory",e),e.$inject=["$window","$cookieStore","UserResource"]}(),function(){"use strict";function e(e,r,t,o,a,n,i){e.identity=o,e.signin=function(e,r){n.authenticateUser(e,r).then(function(e){e?a.info("You have successfully signed in!"):a.warning("Username/password combination incorrent")})},e.signout=function(){n.logoutUser().then(function(){t.remove("bootstrappedUser"),e.username="",e.password="",a.info("You have successfully signed out!"),i.path("/")})}}angular.module("app.user").controller("LoginController",e),e.$inject=["$scope","$http","$cookieStore","IdentityFactory","LoggerFactory","UserFactory","$location"]}(),function(){"use strict";function e(e,r,t,o){e.email=t.currentUser.username,e.firstName=t.currentUser.firstName,e.lastName=t.currentUser.lastName,e.update=function(){var t={username:e.email,firstName:e.firstName,lastName:e.lastName};e.password&&e.password.length>0&&(t.password=e.password),r.updateCurrentUser(t).then(function(){o.info("Your user account has been updated")},function(e){o.error(e)})}}angular.module("app.user").controller("ProfileController",e),e.$inject=["$scope","UserFactory","IdentityFactory","LoggerFactory"]}(),function(){"use strict";function e(e,r,t,o){e.signup=function(){var a={username:e.email,password:e.password,firstName:e.firstName,lastName:e.lastName};r.createUser(a).then(function(){t.info("New user created!"),o.path("/")},function(e){t.error(e)})}}angular.module("app.user").controller("SignupController",e),e.$inject=["$scope","UserFactory","LoggerFactory","$location"]}(),function(){"use strict";function e(e,r,t,o,a,n){function i(e){var t=new n(e),o=r.defer();return t.$save().then(function(){a.currentUser=t,o.resolve()},function(e){o.reject(e.data.reason)}),o.promise}function l(e){var t=r.defer(),o=angular.copy(a.currentUser);return angular.extend(o,e),o.$update().then(function(){a.currentUser=o,t.resolve()},function(e){t.reject(e.data.reason)}),t.promise}function s(o,i){var l=r.defer();return e.post("/login",{username:o,password:i}).then(function(e){if(e.data.success){var r=new n;angular.extend(r,e.data.user),a.currentUser=r;var o=a.currentUser;t.put("bootstrappedUser",o),l.resolve(!0)}else l.resolve(!1)}),l.promise}function c(){var t=r.defer();return e.post("/logout",{logout:!0}).then(function(){a.currentUser=void 0,t.resolve()}),t.promise}function u(e){return a.isAuthorized(e)?!0:r.reject("not authorized")}function d(){return a.isAuthenticated()?!0:r.reject("Not authorized")}var p={admin:{auth:function(){return u("admin")}},user:{auth:function(){return d()}}},m={authorize:p,createUser:i,updateCurrentUser:l,authenticateUser:s,logoutUser:c};return m}angular.module("app.user").factory("UserFactory",e),e.$inject=["$http","$q","$cookieStore","$rootScope","IdentityFactory","UserResource"]}(),function(){"use strict";function e(e){var r=e("/api/users/:id",{_id:"@id"},{update:{method:"PUT",isArray:!1}});return r.prototype.isAdmin=function(){return this.roles&&this.roles.indexOf("admin")>-1},r}angular.module("app.user").factory("UserResource",e),e.$inject=["$resource"]}(),function(){"use strict";function e(e,r){var t=[{url:"/signup",config:{templateUrl:"/app/user/form-signup.html",controller:"SignupController"}},{url:"/profile",config:{templateUrl:"/app/user/form-profile.html",controller:"ProfileController",resolve:r.authorize.user}}];e.configureRoutes(t)}angular.module("app.user").run(e),e.$inject=["RouterFactory","UserFactory"]}(),function(){"use strict";function e(e,r){e.users=r.query(function(){console.log("scope users: "+e.users.length)})}angular.module("app.admin.user").controller("AdminUserController",e),e.$inject=["$scope","UserResource"]}(),function(){"use strict";function e(e,r){var t=[{url:"/admin/users",config:{templateUrl:"/app/admin/user/admin-user-list.html",controller:"AdminUserController",resolve:r.authorize.admin}}];e.configureRoutes(t)}angular.module("app.admin.user").run(e),e.$inject=["RouterFactory","UserFactory"]}(),function(){"use strict";function e(e){function r(r){return function(t){e.error(r,t)}}var t={catcher:r};return t}angular.module("blocks.exception").factory("ExceptionFactory",e),e.$inject=["LoggerFactory"]}(),function(){"use strict";function e(){this.config={appErrorPrefix:void 0},this.configure=function(e){this.config.appErrorPrefix=e},this.$get=function(){return{config:this.config}}}function r(e){function r(e,r,t){return function(o,a){var n=r.config.appErrorPrefix||"",i={exception:o,cause:a};o.message=n+o.message,e(o,a),t.error(o.message,i)}}e.decorator("$exceptionHandler",r),r.$inject=["$delegate","ExceptionHandler","LoggerFactory"]}angular.module("blocks.exception").provider("ExceptionHandler",e).config(r),r.$inject=["$provide"]}(),function(){"use strict";function e(){this.config={},this.$get=function(){return{config:this.config}}}angular.module("blocks.router").provider("RouterConfig",e)}(),function(){"use strict";function e(e,r,t,o,a){function n(e){e.forEach(function(e){e.config.resolve=angular.extend(e.config.resolve||{},a.config.resolveAlways),m.when(e.url,e.config)}),m.otherwise({redirectTo:"/"})}function i(){r.$on("$routeChangeError",function(r,t,a,n){if(!u){d.errors++,u=!0;var i=t&&(t.title||t.name||t.loadedTemplateUrl)||"unknown target",l="Error routing to "+i+". "+(n.msg||"");o.warning(l,[t]),e.path("/")}})}function l(){i(),c()}function s(){for(var e in t.routes)if(t.routes.hasOwnProperty(e)){var r=t.routes[e],o=!!r.title;o&&p.push(r)}return p}function c(){r.$on("$routeChangeSuccess",function(e,t,o){d.changes++,u=!1;var n=a.config.docTitle+" "+(t.title||"");r.title=n})}var u=!1,d={errors:0,changes:0},p=[],m=a.config.$routeProvider,f={configureRoutes:n,getRoutes:s,routeCounts:d};return l(),f}angular.module("blocks.router").factory("RouterFactory",e),e.$inject=["$location","$rootScope","$route","LoggerFactory","RouterConfig"]}(),function(){"use strict";function e(e,r){function t(t,o,a){r.error(t,a),e.error("Error: "+t,o)}function o(t,o,a){r.info(t,a),e.info("Info: "+t,o)}function a(t,o,a){r.success(t,a),e.success("Success: "+t,o)}function n(t,o,a){r.warning(t,a),e.warn("Warning: "+t,o)}var i={showToasts:!0,error:t,info:o,success:a,warning:n,log:e.log};return i}angular.module("blocks.logger").factory("LoggerFactory",e),e.$inject=["$log","toastr"]}(),angular.module("app.core").run(["$templateCache",function(e){e.put("/app/main/main.html","<div class=container><div class=jumbotron><h1>Example</h1></div><div class=row><div class=col-md-12><div ng-include=\"'/app/main/panel-featured-place.html'\"></div></div></div><div class=row><div class=col-md-12><div ng-include=\"'/app/main/panel-new-place.html'\"></div></div></div></div>"),e.put("/app/main/panel-featured-place.html",'<div class="panel panel-primary"><div class="panel-heading text-center">Featured places</div><div class=panel-body><div ng-repeat="place in places | filter:{featured:true}" class=row><div class=col-md-12><a href="/places/{{ place._id }}">{{ place.title }}</a></div></div></div></div>'),e.put("/app/main/panel-new-place.html",'<div class="panel panel-primary"><div class="panel-heading text-center">New places</div><div class=panel-body><div ng-repeat="place in places | filter:{order_by:published} | limitTo:10" class=row><div class=col-md-3>{{place.published | date:\'MMM d\'}}</div><div class=col-md-9><a href="/places/{{ place._id }}">{{ place.title }}</a></div></div></div></div>'),e.put("/app/place/place-detail.html",'<div class=container><h1>{{ place.title }}</h1><div class=row><div class=col-md-6><h3 ng-show=place.featured>Featured</h3><h3>Published on {{ place.published | date }}</h3></div><div class=col-md-6><div class="panel panel-primary"><div class=panel-heading>Tags</div><div class=panel-body><div ng-repeat="tag in place.tags">{{tag}}</div></div></div></div></div></div>'),e.put("/app/place/place-list.html",'<div class=container><div class=pull-right><form class=form-inline><div class=form-group><input ng-model=searchText placeholder=Search class=form-control></div><div class=form-group><select ng-model=sortOrder ng-options="item.value as item.text for item in sortOptions" class=form-control></select></div></form></div><table class="table table-hover table-stripped table-condensed"><thead><tr><th>Title</th><th>Publish Date</th></tr></thead><tbody><tr ng-repeat="place in places | filter:searchText | orderBy: sortOrder"><td><a href="/places/{{ place._id }}">{{ place.title }}</a></td><td>{{ place.published | date }}</td></tr></tbody></table></div>'),e.put("/app/user/form-login.html",'<div ng-controller=LoginController class=navbar-right><form ng-hide=identity.isAuthenticated() class=navbar-form><div class=form-group><input placeholder=Email ng-model=username class=form-control></div><div class=form-group><input type=password placeholder=Password ng-model=password class=form-control></div><button ng-click="signin(username, password)" class="btn btn-primary">Signin</button>&nbsp;<a href=/signup class="btn btn-default">Sign up</a></form><ul ng-show=identity.isAuthenticated() class="nav navbar-nav navbar-right"><li class=dropdown><a href data-toggle=dropdown class=dropdown-toggle>{{ identity.currentUser.firstName + " " + identity.currentUser.lastName }}<b class=caret></b></a><ul class=dropdown-menu><li ng-show=identity.currentUser.isAdmin()><a href=/admin/users>User Admin</a></li><li><a href=/profile>Profile</a></li><li><a href ng-click=signout()>Sign Out</a></li></ul></li></ul></div>'),e.put("/app/user/form-profile.html",'<div class=container><div class=well><form name=profileForm class=form-horizontal><fieldset><legend>User Profile<div class=form-group><label for=email class="col-md-2 control-label">Email</label><div class=col-md-10><input name=email type=email placeholder=Email ng-model=email required class=form-control></div></div><div class=form-group><label for=firstName class="col-md-2 control-label">First Name</label><div class=col-md-10><input name=firstName type=firstName placeholder="First Name" ng-model=firstName required class=form-control></div></div><div class=form-group><label for=lastName class="col-md-2 control-label">Last Name</label><div class=col-md-10><input name=lastName type=lastName placeholder="Last Name" ng-model=lastName required class=form-control></div></div><div class=form-group><label for=password class="col-md-2 control-label">Password</label><div class=col-md-10><input name=password type=password placeholder=Password ng-model=password class=form-control></div></div><div class=form-group><div class="col-md-10 col-md-offset-2"><div class=pull-right><button ng-click=update() ng-disable=profileForm.invalid class="btn btn-primary">Submit</button><a href="/" class="btn btn-default">Cancel</a></div></div></div></legend></fieldset></form></div></div>'),e.put("/app/user/form-signup.html",'<div class=container><div class=well><form name=signupForm class=form-horizontal><fieldset><legend>New User Information<div class=form-group><label for=email class="col-md-2 control-label">Email</label><div class=col-md-10><input name=email type=email placeholder=Email ng-model=email required class=form-control></div></div><div class=form-group><label for=password class="col-md-2 control-label">Password</label><div class=col-md-10><input name=password type=password placeholder=Password ng-model=password required class=form-control></div></div><div class=form-group><label for=firstName class="col-md-2 control-label">First Name</label><div class=col-md-10><input name=firstName type=firstName placeholder="First Name" ng-model=firstName required class=form-control></div></div><div class=form-group><label for=lastName class="col-md-2 control-label">Last Name</label><div class=col-md-10><input name=lastName type=lastName placeholder="Last Name" ng-model=lastName required class=form-control></div></div><div class=form-group><div class="col-md-10 col-md-offset-2"><div class=pull-right><button ng-click=signup() ng-disable=signupForm.invalid class="btn btn-primary">Submit</button><a href="/" class="btn btn-default">Cancel</a></div></div></div></legend></fieldset></form></div></div>'),e.put("/app/admin/user/admin-user-list.html","<div class=container><h1>User List</h1><table class=table><tr ng-repeat=\"user in users\"><td>{{user.firstName + ' ' + user.lastName}}</td></tr></table></div>")}]);