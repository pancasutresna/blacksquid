angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("/app/main/main.html","<div class=container><div class=jumbotron><h1>Example</h1></div><div class=row><div class=col-md-12><div ng-include=\"\'/app/main/panel-featured-place.html\'\"></div></div></div><div class=row><div class=col-md-12><div ng-include=\"\'/app/main/panel-new-place.html\'\"></div></div></div></div>");
$templateCache.put("/app/main/panel-featured-place.html","<div class=\"panel panel-primary\"><div class=\"panel-heading text-center\">Featured places</div><div class=panel-body><div ng-repeat=\"place in vm.places | filter:{featured:true}\" class=row><div class=col-md-12><a href=\"/places/{{ place._id }}\">{{ place.title }}</a></div></div></div></div>");
$templateCache.put("/app/main/panel-new-place.html","<div class=\"panel panel-primary\"><div class=\"panel-heading text-center\">New places</div><div class=panel-body><div ng-repeat=\"place in vm.places | filter:{order_by:published} | limitTo:10\" class=row><div class=col-md-3>{{place.published | date:\'MMM d\'}}</div><div class=col-md-9><a href=\"/places/{{ place._id }}\">{{ place.title }}</a></div></div></div></div>");
$templateCache.put("/app/place/place-detail.html","<div class=container><h1>{{ vm.place.title }}</h1><div class=row><div class=col-md-6><h3 ng-show=vm.place.featured>Featured</h3><h3>Published on {{ vm.place.published | date }}</h3></div><div class=col-md-6><div class=\"panel panel-primary\"><div class=panel-heading>Tags</div><div class=panel-body><div ng-repeat=\"tag in vm.place.tags\">{{tag}}</div></div></div></div></div></div>");
$templateCache.put("/app/place/place-list.html","<div class=container><div class=pull-right><form class=form-inline><div class=form-group><input ng-model=searchText placeholder=Search class=form-control></div><div class=form-group><select ng-model=sortOrder ng-options=\"item.value as item.text for item in vm.sortOptions\" class=form-control></select></div></form></div><table class=\"table table-hover table-stripped table-condensed\"><thead><tr><th>Title</th><th>Publish Date</th></tr></thead><tbody><tr ng-repeat=\"place in vm.places | filter:searchText | orderBy: vm.sortOrder\"><td><a href=\"/places/{{ place._id }}\">{{ place.title }}</a></td><td>{{ place.published | date }}</td></tr></tbody></table></div>");
$templateCache.put("/app/user/form-login.html","<div ng-controller=\"LoginController as vm\" class=navbar-right><form ng-hide=vm.identity.isAuthenticated() class=navbar-form><div class=form-group><input placeholder=Email ng-model=username class=form-control></div><div class=form-group><input type=password placeholder=Password ng-model=password class=form-control></div><button ng-click=\"vm.signin(username, password)\" class=\"btn btn-primary\">Signin</button>&nbsp;<a href=/signup class=\"btn btn-default\">Sign up</a></form><ul ng-show=vm.identity.isAuthenticated() class=\"nav navbar-nav navbar-right\"><li class=dropdown><a href data-toggle=dropdown class=dropdown-toggle>{{ vm.identity.currentUser.firstName + \" \" + vm.identity.currentUser.lastName }}<b class=caret></b></a><ul class=dropdown-menu><li ng-show=vm.identity.currentUser.isAdmin()><a href=/admin/users>User Admin</a></li><li><a href=/profile>Profile</a></li><li><a href ng-click=vm.signout()>Sign Out</a></li></ul></li></ul></div>");
$templateCache.put("/app/user/form-profile.html","<div class=container><div class=well><form name=profileForm class=form-horizontal><fieldset><legend>User Profile<div class=form-group><label for=email class=\"col-md-2 control-label\">Email</label><div class=col-md-10><input name=email type=email placeholder=Email ng-model=email required class=form-control></div></div><div class=form-group><label for=firstName class=\"col-md-2 control-label\">First Name</label><div class=col-md-10><input name=firstName type=firstName placeholder=\"First Name\" ng-model=firstName required class=form-control></div></div><div class=form-group><label for=lastName class=\"col-md-2 control-label\">Last Name</label><div class=col-md-10><input name=lastName type=lastName placeholder=\"Last Name\" ng-model=lastName required class=form-control></div></div><div class=form-group><label for=password class=\"col-md-2 control-label\">Password</label><div class=col-md-10><input name=password type=password placeholder=Password ng-model=password class=form-control></div></div><div class=form-group><div class=\"col-md-10 col-md-offset-2\"><div class=pull-right><button ng-click=update() ng-disable=profileForm.invalid class=\"btn btn-primary\">Submit</button><a href=\"/\" class=\"btn btn-default\">Cancel</a></div></div></div></legend></fieldset></form></div></div>");
$templateCache.put("/app/user/form-signup.html","<div class=container><div class=well><form name=signupForm class=form-horizontal><fieldset><legend>New User Information<div class=form-group><label for=email class=\"col-md-2 control-label\">Email</label><div class=col-md-10><input name=email type=email placeholder=Email ng-model=email required class=form-control></div></div><div class=form-group><label for=password class=\"col-md-2 control-label\">Password</label><div class=col-md-10><input name=password type=password placeholder=Password ng-model=password required class=form-control></div></div><div class=form-group><label for=firstName class=\"col-md-2 control-label\">First Name</label><div class=col-md-10><input name=firstName type=firstName placeholder=\"First Name\" ng-model=firstName required class=form-control></div></div><div class=form-group><label for=lastName class=\"col-md-2 control-label\">Last Name</label><div class=col-md-10><input name=lastName type=lastName placeholder=\"Last Name\" ng-model=lastName required class=form-control></div></div><div class=form-group><div class=\"col-md-10 col-md-offset-2\"><div class=pull-right><button ng-click=signup() ng-disable=signupForm.invalid class=\"btn btn-primary\">Submit</button><a href=\"/\" class=\"btn btn-default\">Cancel</a></div></div></div></legend></fieldset></form></div></div>");
$templateCache.put("/app/admin/user/admin-user-list.html","<div class=container><h1>User List</h1><table class=table><tr ng-repeat=\"user in vm.users\"><td>{{user.firstName + \' \' + user.lastName}}</td></tr></table></div>");}]);