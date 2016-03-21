!function(){"use strict";angular.module("app",["app.core","app.admin.user","app.main","app.user","app.place"]),angular.module("app").run(["$rootScope","$location",function(e,t){e.$on("$routeChangeError",function(e,r,n,a){"not authorized"===a&&t.path("/")})}])}(),function(){"use strict";angular.module("app.attendees",[])}(),function(){"use strict";angular.module("app.core",["ngAnimate","ngRoute","ngSanitize","ngResource","ngCookies","blocks.exception","blocks.logger","blocks.router","ui.bootstrap","breeze.angular","breeze.directives","ngplus","ngzWip"])}(),function(){"use strict";angular.module("app.main",[])}(),function(){"use strict";angular.module("app.data",[])}(),function(){"use strict";angular.module("app.place",["app.core"])}(),function(){"use strict";angular.module("app.user",[])}(),function(){"use strict";angular.module("app.admin.user",[])}(),function(){"use strict";angular.module("blocks.exception",["blocks.logger"])}(),function(){"use strict";angular.module("blocks.logger",[])}(),function(){"use strict";angular.module("blocks.router",["ngRoute","blocks.logger"])}(),function(){"use strict";function e(e,t){function r(){return a()}function n(){return t.attendee.getCount().then(function(e){return c.attendeeCount=e,c.attendeeCount})}function a(e){return t.attendee.getAll(e,c.paging.currentPage,c.paging.pageSize,c.attendeeSearch).then(function(t){return c.attendees=t,(!c.attendeeCount||e)&&n(),o(),t})}function o(){c.attendeeFilteredCount=t.attendee.getFilteredCount(c.attendeeSearch)}function i(){a()}function s(){return a(!0)}function l(e){e.keyCode===u.esc&&(c.attendeeSearch=""),a()}var c=this,u=e.keyCodes;c.attendeeCount=0,c.attendeeFileteredCount=0,c.attendeeSearch="",c.attendees=[],c.filteredAttendees=[],c.paging={currentPage:1,maxPagesToShow:5,pageSize:15},c.pageChanged=i,c.refresh=s,c.search=l,c.title="Attendees",Object.defineProperty(c.paging,"pageCount",{get:function(){var e=1;return c.attendeeFilteredCount%c.paging.pageSize===0&&(e=0),Math.floor(c.attendeeFilteredCount/c.paging.pageSize)+e}}),r()}angular.module("app.attendees").controller("Attendees",e),e.$inject=["config","datacontext"]}(),function(){"use strict";function e(e){e.configureRoutes(t())}function t(){return[{url:"/attendees",config:{templateUrl:"app/attendee/attendees.html",title:"attendees",settings:{nav:4,content:'<i class="fa fa-group"></i> Attendees'}}}]}angular.module("app.attendees").run(e),e.$inject=["routeConfig"]}(),function(){"use strict";function e(e,r){function n(e){var t="Confirm Delete";e=e||"item";var r="Delete "+e+"?";return a(t,r)}function a(r,n,a,o){var i={templateUrl:"modalDialog.tpl.html",controller:t,keyboard:!0,resolve:{options:function(){return{title:r,message:n,okText:a,cancelText:o}}}};return e.open(i).result}var o={deleteDialog:n,confirmationDialog:a};return r.put("modalDialog.tpl.html",'<div>    <div class="modal-header">        <button type="button" class="close" data-dismiss="modal"             aria-hidden="true" data-ng-click="cancel()">&times;</button>        <h3>{{title}}</h3>    </div>    <div class="modal-body">        <p>{{message}}</p>    </div>    <div class="modal-footer">        <button class="btn btn-primary" data-ng-click="ok()">{{okText}}</button>        <button class="btn btn-info" data-ng-click="cancel()">{{cancelText}}</button>    </div></div>'),o}function t(e,t,r){e.title=r.title||"Title",e.message=r.message||"",e.okText=r.okText||"OK",e.cancelText=r.cancelText||"Cancel",e.ok=function(){t.close("ok")},e.cancel=function(){t.dismiss("cancel")}}angular.module("app.core").factory("bootstrap.dialog",e),e.$inject=["$modal","$templateCache"],t.$inject=["$scope","$ModalInstance","options"]}(),function(){"use strict";function e(e,t,r,n,a){function o(){return r.$broadcast.apply(r,arguments)}function i(e,t,r,a,o){o=+o||300,r||(r="filtered"+t[0].toUpperCase()+t.substr(1).toLowerCase(),a=t+"Filter");var i=function(){e[r]=e[t].filter(function(t){return e[a](t)})};return function(){var e;return function(t){e&&(n.cancel(e),e=null),t||!o?i():e=n(i,o)}}()}function s(e,t,r,a){var o=1e3;r=r||o,d[e]&&(n.cancel(d[e]),d[e]=void 0),a?t():d[e]=n(t,r)}function l(e){return/^[-]?\d+$/.test(e)}function c(t){var r=e.path(),n=r.lastIndexOf("/",r.length-2),a=r.substring(n-1);if(!l(a)){var o=r.substring(0,n+1)+t;e.path(o)}}function u(e,t){return e&&-1!==e.toLowerCase().indexOf(t.toLowerCase())}var d={},p={$broadcast:o,$q:t,$timeout:n,createSearchThrottle:i,debouncedThrottle:s,isNumber:l,logger:a,replaceLocationUrlGuidWithId:c,textContains:u};return p}angular.module("app.core").factory("common",e),e.$inject=["$location","$q","$rootScope","$timeout","logger"]}(),function(){"use strict";function e(e){function t(){new e.ValidationOptions({validateOnAttach:!1}).setAsDefault(),e.config.initializeAdapterInstance("dataService","mongo",!0),r()}function r(){var t=new e.NamingConvention({name:"mongo-naming-convention",serverProperyNameToClient:function(e){switch(e){case"_id":return"id";default:return e}},clientPropertyNameToServer:function(e){switch(e){case"id":return"_id";default:return e}}});t.setAsDefault()}var n={breeze:e,removeServiceName:"breeze/Breeze"};return t(),n}function t(e,t,r){function n(){t.zValidateTemplate='<span class="invalid"><i class="fa fa-warning-sign"></i>Inconceivable! %error%</span>'}r.config={enabled:!1,key:"CCAngularBreeze",events:e.events.storage,wipKey:"CCAngularBreeze.wip",appErrorPrefix:e.appErrorPrefix,newGuid:breeze.core.getUuid,version:e.version},n()}angular.module("app.core").factory("breeze.config",e).config(t),e.$inject=["breeze"],t.$inject=["config","zDirectivesConfigProvider","zStorageConfigProvider"]}(),function(){"use strict";function e(e){e.options.timeOut=4e3,e.options.positionClass="toast-bottom-right"}function t(e,t,r,n,a,i){function s(){r.html5Mode({enabled:!0,requireBase:!1})}function l(){i.options.timeOut=4e3,i.options.positionClass="toast-bottom-right"}function c(){e.debugEnabled&&e.debugEnabled(!0)}function u(){a.configure(o.appErrorPrefix)}function d(){var e=n;e.config.$routeProvider=t,e.config.docTitle="black squid",e.config.resolveAlways={}}s(),l(),c(),u(),d()}var r={backspace:8,tab:9,enter:13,esc:27,space:32,pageup:33,pagedown:34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,del:46},n={imageBasePath:"../content/images/photos/",unknownPersonImageSource:"unknown_person.jpg"},a={controllerActivateSuccess:"controller.activateSuccess",entitiesChanged:"datacontext.entitiesChanged",entitiesImported:"datacontext.entitiesImported",hasChangesChanged:"datacontext.hasChangesChanged",storage:{error:"store.error",storeChanged:"store.changed",wipChanged:"wip.changed"}},o={appErrorPrefix:"[BLACK SQUID ERROR]",events:a,imageSettings:n,keyCodes:r,appTitle:"black squid",version:"1.0.0"},i=angular.module("app.core");i.config(e),i.constant("config",o),i.config(t),e.$inject=["toastr"],t.$inject=["$logProvider","$routeProvider","$locationProvider","routehelperConfigProvider","exceptionConfigProvider","toastr"]}(),function(){"use strict";angular.module("app.core").constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function e(e){var t=this;t.places=e.query()}angular.module("app.main").controller("MainController",e),e.$inject=["PlaceResourceCache"]}(),function(){"use strict";function e(e){var t=[{url:"/",config:{templateUrl:"/app/main/main.html",controller:"MainController",controllerAs:"vm"}}];e.configureRoutes(t)}angular.module("app.main").run(e),e.$inject=["routehelper"]}(),function(){"use strict";function e(e,t,r,n,a,o,i,s,l,c){function u(){l.init(C),c.init(C),p(),w(),b(),m()}function d(){C.hasChanges()&&(C.rejectChanges(),n.logger.success("Canceled changes"))}function p(){N.forEach(function(e){Object.defineProperty(x,e,{configurable:!0,get:function(){var t=f(e);return Object.defineProperty(x,e,{value:t,configurable:!1,enumerable:!0}),t}})})}function f(t){var r="repository."+t.toLowerCase(),n=e.get(r);return n.create(C)}function m(){t.$on(a.events.storage.storeChanged,function(e,t){n.logger.info("Updated local storage",t)}),t.$on(a.events.storage.wipChanged,function(e,t){n.logger.info("Updated WIP",t)}),t.$on(a.events.storage.error,function(e,t){n.logger.error("Error with local storage. "+t.activity,t)})}function g(e){return e.entityAspect.setDeleted()}function v(){function e(){var e=P.all([x.lookup.getAll(),x.speaker.getPartials(!0)]);return s.useManualMetadata||(e=e.then(function(){s.extendMetadata(C.metadataStore)})),e.then(function(){l.save()})}function t(){$=!0,n.logger.info("Primed data",x.lookup.cachedData)}if(S)return S;var r=l.load(C),a=r?P.when(n.logger.info("Loading entities and metadata from local storage")):e();return S=a.then(t)}function h(e){var t=S||v();return t.then(function(){return P.all(e)})["catch"](i.catcher('"ready" function failed'))}function y(){function e(e){n.logger.success("Saved data",e),l.save()}function t(e){var t="Save failed: "+r.saveErrorMessageService.getErrorMessage(e);throw e.message=t,i.catcher(t)(e),e}return C.saveChanges().then(e)["catch"](t)}function b(){C.entityChanged.subscribe(function(e){e.entityAction===r.EntityAction.PropertyChange&&(k(e),n.$broadcast(a.events.entitiesChanged,e))})}function w(){C.hasChangesChanged.subscribe(function(e){var t={hasChanges:e.hasChanges};n.$broadcast(a.events.hasChangesChanged,t)})}function k(e){var t=e.args.propertyName;("isPartial"===t||"isSpeaker"===t)&&delete e.entity.entityAspect.originalValues[t]}var S,C=o.newManager(),$=!1,N=["attendee","lookup","session","speaker"],P=n.$q,x={cancel:d,markDeleted:g,ready:h,save:y,zStorage:l,zStorageWip:c};return u(),x}angular.module("app.data").factory("datacontext",e),e.$inject=["$injector","$rootScope","breeze","common","config","entityManagerFactory","exception","model","zStorage","zStorageWip"]}(),function(){"use strict";function e(e,t){function r(){var e=new a.MetadataStore;return t.configureMetadataStore(e),t.useManualMetadata&&e.addDataService(new a.DataService({serviceName:o})),e}function n(){var e=new a.EntityManager({serviceName:o,metadataStore:i});return e}var a=e.breeze,o=e.remoteServiceName,i=r(),s={metadataStore:i,newManager:n};return s}angular.module("app.data").factory("entityManagerFactory",e),e.$inject=["breeze.config","model"]}(),function(){"use strict";function e(e,r,n,a){function o(e){c(e),u(e),d(e),n.createAndRegister(m),t&&(r.fillMetadataStore(e),i(e))}function i(e){n.applyValidators(e),l(e)}function s(t){function r(e,r){var a=r||{name:" [Select a "+e.toLowerCase()+"]"};return t.createEntity(e,a,n)}if(!f){f=!0;var n=e.EntityState.Unchanged;r(m.timeslot,{start:p,isSessionSlot:!0}),r(m.room),r(m.speaker,{firstName:" [Select a person]"}),r(m.track)}}function l(t){function r(e,r){t.setEntityTypeForResourceName(e,r)}var n=t.getEntityTypes();n.forEach(function(t){t instanceof e.EntityType&&r(t.shortName,t)});var a=m.person;["Speakers","Speaker","Attendees","Attendee"].forEach(function(e){r(e,a)})}function c(e){function t(){this.isPartial=!1}e.registerEntityTypeCtor("Session",t),Object.defineProperty(t.prototype,"tagsFormatted",{get:function(){return this.tags?this.tags.replace(/\|/g,", "):this.tags},set:function(e){this.tags=e.replace(/\, /g,"|")}})}function u(e){function t(){this.isPartial=!1,this.isSpeaker=!1}e.registerEntityTypeCtor("Person",t),Object.defineProperty(t.prototype,"fullName",{get:function(){var e=this.firstName,t=this.lastName;return t?e+" "+t:e}})}function d(e){function t(){}e.registerEntityTypeCtor("TimeSlot",t),Object.defineProperty(t.prototype,"name",{get:function(){var e=this.start,t=e-p===0?" [Select a timeslot]":e&&a.utc(e).isValid()?a.utc(e).format("ddd hh:mm a"):"[Unknown]";return t}})}var p=new Date(1900,0,1),f=!1,m={attendee:"Person",person:"Person",speaker:"Person",session:"Session",room:"Room",track:"Track",timeslot:"TimeSlot"},g={configureMetadataStore:o,createNullos:s,entityNames:m,extendMetadata:i,useManualMetadata:t};return g}var t=!0;angular.module("app.data").factory("model",e),e.$inject=["breeze","model-metadata","model-validation","moment"]}(),function(){"use strict";function e(e){function t(e){s=e,r(),n(),a(),o(),i()}function r(){d({name:"Person",dataProperties:{id:{type:g},firstName:{max:50,nullOk:!1},lastName:{max:50,nullOk:!1},email:{max:400},blog:{max:400},twitter:{max:400},gender:{max:1},imageSource:{max:400},isPartial:{type:f,nullOk:!1,isUnmapped:!0},isSpeaker:{type:f,nullOk:!1,isUnmapped:!0}},navigationProperties:{speakerSessions:{type:"Session",hasMany:!0}}})}function n(){d({name:"Session",dataProperties:{id:{type:g},title:{max:50,nullOk:!1},code:{max:10},description:{max:4e3},level:{max:30},tags:{max:4e3},roomId:{type:g,nullOk:!1},speakerId:{type:g,nullOk:!1},timeSlotId:{type:g,nullOk:!1},trackId:{type:g,nullOk:!1},isPartial:{type:f,nullOk:!1,isUnmapped:!0}},navigationProperties:{room:"Room",speaker:"Person",timeSlot:"TimeSlot",track:"Track"}})}function a(){d({name:"Room",dataProperties:{id:{type:g},name:{max:50,nullOk:!1}}})}function o(){d({name:"TimeSlot",dataProperties:{id:{type:g},start:{type:m,nullOk:!1},isSessionSlot:{type:f,nullOk:!1},duration:{type:g,nullOk:!1}}})}function i(){d({name:"Track",dataProperties:{id:{type:g},name:{max:50,nullOk:!1}}})}var s,l=e.AutoGeneratedKeyType.Identity,c="CC.Model",u=new e.config.MetadataHelper(c,l),d=function(e){u.addTypeToStore(s,e)},p=e.DataType,f=p.Boolean,m=p.DateTime,g=p.Int32;return{fillMetadataStore:t}}angular.module("app.data").factory("model-metadata",e),e.$inject=["breeze"]}(),function(){"use strict";function e(e,t){function r(e){o(e),i(e),a(e),s(e),f.info("Validators applied",null)}function n(e){u=e,d=c(),p=l(),m.register(d),m.register(p),f.info("Validators created and registered",null)}function a(e){var t=e.getEntityType(u.speaker);t.getProperty("email").validators.push(m.emailAddress())}function o(e){var t=["room","track","timeSlot","speaker"],r=e.getEntityType(u.session);t.forEach(function(e){r.getProperty(e).validators.push(d)})}function i(e){var t=e.getEntityType(u.speaker);t.getProperty("twitter").validators.push(p)}function s(e){var t=e.getEntityType(u.speaker);t.getProperty("blog").validators.push(m.url())}function l(){var e=m.makeRegExpValidator("twitter",/^@([a-zA-Z]+)([a-zA-Z0-9_]+)$/,'Invalid Twitter User Name: "%value%"');return e}function c(){function e(e){return e?0!==e.id:!1}var t="requireReferenceEntity",r={messageTemplate:"Missing %displayName%",isRequired:!0},n=new m(t,e,r);return n}var u,d,p,f=t.logger,m=e.Validator,g={applyValidators:r,createAndRegister:n};return g}angular.module("app.data").factory("model-validation",e),e.$inject=["breeze","common"]}(),function(){"use strict";function e(e,t){var r=this;e.query().$promise.then(function(e){e.forEach(function(e){e._id===t.id&&(r.place=e)})})}angular.module("app.place").controller("PlaceDetailController",e),e.$inject=["PlaceResourceCache","$routeParams"]}(),function(){"use strict";function e(e){var t=this;t.places=e.query(),t.sortOptions=[{value:"title",text:"Sort by Title"},{value:"published",text:"Sort by publish data"}],t.sortOrder=t.sortOptions[0].value}angular.module("app.place").controller("PlaceListController",e),e.$inject=["PlaceResourceCache"]}(),function(){"use strict";function e(e){var t;return{query:function(){return t||(t=e.query()),t}}}angular.module("app.place").factory("PlaceResourceCache",e),e.$inject=["PlaceResource"]}(),function(){"use strict";function e(e){var t=e("/api/places/:_id",{_id:"@id"},{update:{method:"PUT",isArray:!1}});return t}angular.module("app.place").factory("PlaceResource",e),e.$inject=["$resource"]}(),function(){"use strict";function e(e){var t=[{url:"/places",config:{templateUrl:"/app/place/place-list.html",controller:"PlaceListController",controllerAs:"vm"}},{url:"/places/:id",config:{templateUrl:"/app/place/place-detail.html",controller:"PlaceDetailController",controllerAs:"vm"}}];e.configureRoutes(t)}angular.module("app.place").run(e),e.$inject=["routehelper"]}(),function(){"use strict";function e(e,t,r){var n;return t.get("bootstrappedUser")&&(n=new r,angular.extend(n,t.get("bootstrappedUser"))),{currentUser:n,isAuthenticated:function(){return!!this.currentUser},isAuthorized:function(e){return!!this.currentUser&&this.currentUser.roles.indexOf(e)>-1}}}angular.module("app.user").factory("IdentityFactory",e),e.$inject=["$window","$cookieStore","UserResource"]}(),function(){"use strict";function e(e,t,r,n,a,o){var i=this;i.identity=r,i.signin=function(e,t){a.authenticateUser(e,t).then(function(e){e?n.info("You have successfully signed in!"):n.warning("Username/password combination incorrent")})},i.signout=function(){a.logoutUser().then(function(){t.remove("bootstrappedUser"),i.username="",i.password="",n.info("You have successfully signed out!"),o.path("/")})}}angular.module("app.user").controller("LoginController",e),e.$inject=["$http","$cookieStore","IdentityFactory","logger","UserFactory","$location"]}(),function(){"use strict";function e(e,t,r,n){e.email=r.currentUser.username,e.firstName=r.currentUser.firstName,e.lastName=r.currentUser.lastName,e.update=function(){var r={username:e.email,firstName:e.firstName,lastName:e.lastName};e.password&&e.password.length>0&&(r.password=e.password),t.updateCurrentUser(r).then(function(){n.info("Your user account has been updated")},function(e){n.error(e)})}}angular.module("app.user").controller("ProfileController",e),e.$inject=["$scope","UserFactory","IdentityFactory","logger"]}(),function(){"use strict";function e(e,t,r,n){e.signup=function(){var a={username:e.email,password:e.password,firstName:e.firstName,lastName:e.lastName};t.createUser(a).then(function(){r.info("New user created!"),n.path("/")},function(e){r.error(e)})}}angular.module("app.user").controller("SignupController",e),e.$inject=["$scope","UserFactory","logger","$location"]}(),function(){"use strict";function e(e,t,r,n,a,o){function i(e){var r=new o(e),n=t.defer();return r.$save().then(function(){a.currentUser=r,n.resolve()},function(e){n.reject(e.data.reason)}),n.promise}function s(e){var r=t.defer(),n=angular.copy(a.currentUser);return angular.extend(n,e),n.$update().then(function(){a.currentUser=n,r.resolve()},function(e){r.reject(e.data.reason)}),r.promise}function l(n,i){var s=t.defer();return e.post("/login",{username:n,password:i}).then(function(e){if(e.data.success){var t=new o;angular.extend(t,e.data.user),a.currentUser=t;var n=a.currentUser;r.put("bootstrappedUser",n),s.resolve(!0)}else s.resolve(!1)}),s.promise}function c(){var r=t.defer();return e.post("/logout",{logout:!0}).then(function(){a.currentUser=void 0,r.resolve()}),r.promise}function u(e){return a.isAuthorized(e)?!0:t.reject("not authorized")}function d(){return a.isAuthenticated()?!0:t.reject("Not authorized")}var p={admin:{auth:function(){return u("admin")}},user:{auth:function(){return d()}}},f={authorize:p,createUser:i,updateCurrentUser:s,authenticateUser:l,logoutUser:c};return f}angular.module("app.user").factory("UserFactory",e),e.$inject=["$http","$q","$cookieStore","$rootScope","IdentityFactory","UserResource"]}(),function(){"use strict";function e(e){var t=e("/api/users/:id",{_id:"@id"},{update:{method:"PUT",isArray:!1}});return t.prototype.isAdmin=function(){return this.roles&&this.roles.indexOf("admin")>-1},t}angular.module("app.user").factory("UserResource",e),e.$inject=["$resource"]}(),function(){"use strict";function e(e,t){var r=[{url:"/signup",config:{templateUrl:"/app/user/form-signup.html",controller:"SignupController",controllerAs:"vm"}},{url:"/profile",config:{templateUrl:"/app/user/form-profile.html",controller:"ProfileController",controllerAs:"vm",resolve:t.authorize.user}}];e.configureRoutes(r)}angular.module("app.user").run(e),e.$inject=["routehelper","UserFactory"]}(),function(){"use strict";function e(e){var t=this;t.users=e.query()}angular.module("app.admin.user").controller("AdminUserController",e),e.$inject=["UserResource"]}(),function(){"use strict";function e(e,r){e.configureRoutes(t(r))}function t(e){return[{url:"/admin/users",config:{templateUrl:"/app/admin/user/admin-user-list.html",controller:"AdminUserController",controllerAs:"vm",resolve:e.authorize.admin}}]}angular.module("app.admin.user").run(e),e.$inject=["routehelper","UserFactory"]}(),function(){"use strict";function e(e){function t(t){return function(r){e.error(t,r)}}var r={catcher:t};return r}angular.module("blocks.exception").factory("exception",e),e.$inject=["logger"]}(),function(){"use strict";function e(){this.config={appErrorPrefix:void 0},this.configure=function(e){this.config.appErrorPrefix=e},this.$get=function(){return{config:this.config}}}function t(e){e.decorator("$exceptionHandler",r)}function r(e,t,r){return function(n,a){var o=t.config.appErrorPrefix||"",i={exception:n,cause:a};n.message=o+n.message,e(n,a),r.error(n.message,i)}}angular.module("blocks.exception").provider("exceptionConfig",e).config(t),t.$inject=["$provide"],r.$inject=["$delegate","exceptionConfig","logger"]}(),function(){"use strict";function e(e,t){function r(r,n,a){t.error(r,a),e.error("Error: "+r,n)}function n(r,n,a){t.info(r,a),e.info("Info: "+r,n)}function a(r,n,a){t.success(r,a),e.success("Success: "+r,n)}function o(r,n,a){t.warning(r,a),e.warn("Warning: "+r,n)}var i={showToasts:!0,error:r,info:n,success:a,warning:o,log:e.log};return i}angular.module("blocks.logger").factory("logger",e),e.$inject=["$log","toastr"]}(),function(){"use strict";function e(){this.config={$routeProvider:void 0,docTitle:"",resolveAlways:{ready:function(){}}},this.$get=function(){return{config:this.config}}}function t(e,t,r,n,a){function o(e){e.forEach(function(e){e.config.resolve=angular.extend(e.config.resolve||{},a.config.resolveAlways),f.when(e.url,e.config)}),f.otherwise({redirectTo:"/"})}function i(){t.$on("$routeChangeError",function(t,r,a,o){if(!u){d.errors++,u=!0;var i=r&&(r.title||r.name||r.loadedTemplateUrl)||"unknown target",s="Error routing to "+i+". "+(o.msg||"");n.warning(s,[r]),e.path("/")}})}function s(){i(),c()}function l(){for(var e in r.routes)if(r.routes.hasOwnProperty(e)){var t=r.routes[e],n=!!t.title;n&&p.push(t)}return p}function c(){t.$on("$routeChangeSuccess",function(e,r,n){d.changes++,u=!1;var o=a.config.docTitle+" "+(r.title||"");t.title=o})}var u=!1,d={errors:0,changes:0},p=[],f=a.config.$routeProvider,m={configureRoutes:o,getRoutes:l,routeCounts:d};return s(),m}angular.module("blocks.router").provider("routehelperConfig",e).factory("routehelper",t),t.$inject=["$location","$rootScope","$route","logger","routehelperConfig"]}(),function(){"use strict";function e(e,t,r,n){function a(e,r){this.entityName=r,this.getById=i.bind(this),this.getEntityByIdOrFromWip=s.bind(this),this.logger=t.logger,this.manager=e,this.queryFailed=c.bind(this)}function o(t,r,n){return e.EntityQuery.from(t).where(n).orderBy(r).using(this.manager).executeLocally()}function i(e,t){function n(t){return(s=t.entity)?(s.isPartial=!1,a.logger.info("Retrieved ["+o+"] id "+s.id+" from remote data source",s),r.save(),s):(a.logger.info("Could not find ["+o+"] id:"+e,null),null)}var a=this,o=a.entityName,i=a.manager;if(!t){var s=i.getEntityByKey(o,e);if(s&&!s.isPartial)return a.logger.info("Retrieved ["+o+"] id:"+s.id+" from cache.",s),s.entityAspect.entityState.isDeleted()&&(s=null),p.when(s)}return i.fetchEntityByKey(o,e).then(n)["catch"](a.queryFailed)}function s(e){var r=this,a=r.entityName,o=e;if(t.isNumber(e)&&(e=parseInt(e),o=n.findWipKeyByEntityId(a,e),!o))return i.bind(r)(e);var s=null,l=n.loadWipEntity(o);return l?(l.entityAspect.validateEntity(),s={entity:l,key:o}):r.logger.info("Could not find ["+a+"] id in WIP:"+o,null),p.when(s)}function l(t){var r=e.EntityQuery.from(t).where(d.isNotNullo).using(this.manager).executeLocally();return r.length}function c(e){var t="Error retrieving data. "+(e.message||"");return this.logger.error(t,e),p.reject(new Error(t))}function u(e){for(var t=e.length;t--;)e[t].isPartial=!0;return e}var d={isNotNullo:e.Predicate.create("id","!=",0),isNullo:e.Predicate.create("id","==",0)},p=t.$q;return a.prototype={constructor:a,$q:p,getAllLocal:o,getLocalEntityCount:l,predicates:d,setIsPartialTrue:u,zStorage:r,zStorageWip:n},a}angular.module("app.data").factory("repository.abstract",e),e.$inject=["breeze","common","zStorage","zStorageWip"]}(),function(){"use strict";function e(e,t,r){function n(t){function n(t){return e.Predicate.create("firstName","contains",t).or("lastName","contains",t)}function s(e,t,r,s){function l(e){var t=d.setIsPartialTrue(e.results);return d.zStorage.areItemsLoaded("attendees",!0),d.logger.info("Retrieved [Attendees] from remote data source",t.length),d.zStorage.save(),c()}function c(){var e=d.predicates.isNotNullo;s&&(e=e.and(n(s)));var t=a.where(e).orderBy(i).take(u).skip(p).using(d.manager).executeLocally();return t}var u=r||20,p=t?(t-1)*r:0;return d.zStorage.areItemsLoaded("attendees")&&!e?d.$q.when(c()):a.select("id, firstName, lastName, imageSource").orderBy(i).toType(o).using(d.manager).execute().then(l)["catch"](d.queryFailed)}function l(){return d.zStorage.areItemsLoaded("attendees")?d.$q.when(d.getLocalEntityCount(o)):void 0!==u?d.$q.when(u):a.take(0).inlineCount().using(d.manager).execute().then(function(e){return u=e.inlineCount})}function c(t){var r=e.Predicate.and(d.predicates.isNotNullo).and(n(t)),o=a.where(r).using(d.manager).executeLocally();return o.length}var u,d=new r(t,o),p={getAll:s,getCount:l,getFilteredCount:c};return p}var a=e.EntityQuery.from("Persons"),o=t.entityNames.attendee,i="firstName, lastName";return{create:n}}angular.module("app.data").factory("repository.attendee",e),e.$inject=["breeze","model","repository.abstract"]}(),function(){"use strict";function e(e,t,r){function n(n){function i(){function r(e){return t.createNullos(n),c.logger.info("Retrieved lookups",e),c.zStorage.save(),!0}return e.EntityQuery.from("Lookups").using(n).execute().then(r)["catch"](c.queryFailed)}function s(){return l||(l={rooms:c.getAllLocal(o.room,"name"),tracks:c.getAllLocal(o.track,"name"),timeslots:c.getAllLocal(o.timeslot,"start")}),l}var l,c=new r(n,a),u={getAll:i,get cachedData(){return s()}};return u}var a="lookups",o=t.entityNames;return{create:n}}angular.module("app.data").factory("repository.lookup",e),e.$inject=["breeze","model","repository.abstract"]}(),function(){"use strict";function e(e,t,r){function n(e){function n(){return e.createEntity(o)}function c(){return m.zStorage.areItemsLoaded("sessions")?m.$q.when(m.getLocalEntityCount(o)):void 0!==p?m.$q.when(p):l.take(0).inlineCount().using(e).execute().then(function(e){return p=e.inlineCount})}function u(t){function r(e){return n=m.setIsPartialTrue(e.results),i(n),m.zStorage.areItemsLoaded("sessions",!0),m.logger.info("Retrieved [Session Partials] from remote data source",n.length),m.zStorage.save(),n}var n;return m.zStorage.areItemsLoaded("sessions")&&!t?(n=m.getAllLocal(o,s),m.$q.when(n)):l.select("id, title, code, speakerId, trackId, timeSlotId, roomId, level, tags").orderBy(s).toType(o).using(e).execute().then(r)["catch"](m.queryFailed)}function d(){function r(e){var r=e.results,n={};return r.forEach(function(e){n[e.trackId]=n[e.trackId]?n[e.trackId]+=1:1}),f=m.getAllLocal(t.entityNames.track,"name",m.predicates.isNotNullo).map(function(e){return{id:e.id,track:e.name,count:n[e.id]||0}})}var n=l.select("trackId");if(m.zStorage.areItemsLoaded("sessions"))n=n.using(a.FetchStrategy.FromLocalCache);else if(f)return m.$q.when(f);return e.executeQuery(n).then(r)["catch"](m.queryFailed)}var p,f,m=new r(e,o),g={create:n,getById:m.getById,getCount:c,getEntityByIdOrFromWip:m.getEntityByIdOrFromWip,getPartials:u,getSessionsPerTrack:d};return g}var a=e.breeze,o=t.entityNames.session,i=e.localSessionSort,s="timeSlot.start, speaker.firstName, title",l=a.EntityQuery.from("Sessions");return{create:n}}angular.module("app.data").factory("repository.session",e),e.$inject=["breeze.config","model","repository.abstract"]}(),function(){"use strict";function e(e,t,r){function n(n){function i(){var e=n.getEntities(f),t=n.getEntities(m);e.forEach(function(e){e.isSpeaker=!1}),t.forEach(function(e){e.speaker.isSpeaker=0!==e.speakerId})}function s(){return n.createEntity(f)}function l(t){var r=e.Predicate.create("isSpeaker","==",!0);return t&&(r=r.or(d.predicates.isNullo)),d.getAllLocal(a,o,r)}function c(t){function r(e){a=e.results;for(var t=a.length;t--;)a[t].isPartial=!0,a[t].isSpeaker=!0;return d.logger.info("Retrieved [Speaker Partials] from remote data source",a.length),d.zStorage.save(),a}var a;return!t&&(a=l(!1),a.length)?d.$q.when(a):e.EntityQuery.from("Speakers").select("id, firstName, lastName, imageSource").orderBy(o).toType(f).using(n).execute().then(r)["catch"](d.queryFailed)}function u(){var t=e.Predicate.create("lastName","==","Papa").or("lastName","==","Guthrie").or("lastName","==","Bell").or("lastName","==","Hanselman").or("lastName","==","Green").or("lastName","==","Lerman").and("isSpeaker","==",!0);return d.getAllLocal(a,o,t)}var d=new r(n,a),p=n.metadataStore,f=p.getEntityType(t.entityNames.person),m=p.getEntityType(t.entityNames.session),g={calcIsSpeaker:i,create:s,getAllLocal:l,getById:d.getById,getEntityByIdOrFromWip:d.getEntityByIdOrFromWip,getPartials:c,getTopLocal:u};return g}var a=t.entityNames.speaker,o="firstName, lastName";return{create:n}}angular.module("app.data").factory("repository.speaker",e),e.$inject=["breeze","model","repository.abstract"]}(),angular.module("app.core").run(["$templateCache",function(e){e.put("/app/attendee/attendees.html",'<section id=attendees-view class=mainbar data-ng-controller="Attendees as vm"><section class=matter><div class=container><div class=row><div class=col-sm-4><input class="input-medium search-query" data-ng-model=vm.attendeeSearch data-ng-keyup=vm.search($event) placeholder="live search..."></div><div class=col-sm-8><div class="btn-group pull-right"><a class="btn btn-info btn-form-md" data-ng-click=vm.refresh()><i class="fa fa-refresh"></i><span class=text>Refresh</span></a></div></div></div><div class=row><div class="widget wgreen col-sm-12"><div data-cc-widget-header title={{vm.title}} subtitle="{{vm.attendeeFilteredCount}} / {{vm.attendeeCount}}" right-text="Page {{vm.paging.currentPage}} of {{vm.paging.pageCount}}"></div><div class="widget-content user"><div><pagination boundary-links=true ng-change=vm.pageChanged() total-items=vm.attendeeFilteredCount items-per-page=vm.paging.pageSize ng-model=vm.paging.currentPage max-size=vm.paging.maxPagesToShow class=pagination-small previous-text=Prev next-text=Next first-text=First last-text=Last></pagination><div class=clearfix></div></div><div class="padd list-flow fader-animation" data-ng-repeat="a in vm.attendees track by a.id"><div class=user><img data-cc-img-person={{a.imageSource}} class="img-thumbnail stacked"><div class=name-stack><h5>{{a.firstName}}</h5><h5>{{a.lastName}}</h5></div></div></div></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>'),e.put("/app/main/main.html","<div class=container><div class=jumbotron><h1>Example</h1></div><div class=row><div class=col-md-12><div ng-include=\"'/app/main/panel-featured-place.html'\"></div></div></div><div class=row><div class=col-md-12><div ng-include=\"'/app/main/panel-new-place.html'\"></div></div></div></div>"),e.put("/app/main/panel-featured-place.html",'<div class="panel panel-primary"><div class="panel-heading text-center">Featured places</div><div class=panel-body><div ng-repeat="place in vm.places | filter:{featured:true}" class=row><div class=col-md-12><a href="/places/{{ place._id }}">{{ place.title }}</a></div></div></div></div>'),e.put("/app/main/panel-new-place.html",'<div class="panel panel-primary"><div class="panel-heading text-center">New places</div><div class=panel-body><div ng-repeat="place in vm.places | filter:{order_by:published} | limitTo:10" class=row><div class=col-md-3>{{place.published | date:\'MMM d\'}}</div><div class=col-md-9><a href="/places/{{ place._id }}">{{ place.title }}</a></div></div></div></div>'),e.put("/app/place/place-detail.html",'<div class=container><h1>{{ vm.place.title }}</h1><div class=row><div class=col-md-6><h3 ng-show=vm.place.featured>Featured</h3><h3>Published on {{ vm.place.published | date }}</h3></div><div class=col-md-6><div class="panel panel-primary"><div class=panel-heading>Tags</div><div class=panel-body><div ng-repeat="tag in vm.place.tags">{{tag}}</div></div></div></div></div></div>'),
e.put("/app/place/place-list.html",'<div class=container><div class=pull-right><form class=form-inline><div class=form-group><input ng-model=searchText placeholder=Search class=form-control></div><div class=form-group><select ng-model=sortOrder ng-options="item.value as item.text for item in vm.sortOptions" class=form-control></select></div></form></div><table class="table table-hover table-stripped table-condensed"><thead><tr><th>Title</th><th>Publish Date</th></tr></thead><tbody><tr ng-repeat="place in vm.places | filter:searchText | orderBy: vm.sortOrder"><td><a href="/places/{{ place._id }}">{{ place.title }}</a></td><td>{{ place.published | date }}</td></tr></tbody></table></div>'),e.put("/app/user/form-login.html",'<div ng-controller="LoginController as vm" class=navbar-right><form ng-hide=vm.identity.isAuthenticated() class=navbar-form><div class=form-group><input placeholder=Email ng-model=username class=form-control></div><div class=form-group><input type=password placeholder=Password ng-model=password class=form-control></div><button ng-click="vm.signin(username, password)" class="btn btn-primary">Signin</button>&nbsp;<a href=/signup class="btn btn-default">Sign up</a></form><ul ng-show=vm.identity.isAuthenticated() class="nav navbar-nav navbar-right"><li class=dropdown><a href data-toggle=dropdown class=dropdown-toggle>{{ vm.identity.currentUser.firstName + " " + vm.identity.currentUser.lastName }}<b class=caret></b></a><ul class=dropdown-menu><li ng-show=vm.identity.currentUser.isAdmin()><a href=/admin/users>User Admin</a></li><li><a href=/profile>Profile</a></li><li><a href ng-click=vm.signout()>Sign Out</a></li></ul></li></ul></div>'),e.put("/app/user/form-profile.html",'<div class=container><div class=well><form name=profileForm class=form-horizontal><fieldset><legend>User Profile<div class=form-group><label for=email class="col-md-2 control-label">Email</label><div class=col-md-10><input name=email type=email placeholder=Email ng-model=email required class=form-control></div></div><div class=form-group><label for=firstName class="col-md-2 control-label">First Name</label><div class=col-md-10><input name=firstName type=firstName placeholder="First Name" ng-model=firstName required class=form-control></div></div><div class=form-group><label for=lastName class="col-md-2 control-label">Last Name</label><div class=col-md-10><input name=lastName type=lastName placeholder="Last Name" ng-model=lastName required class=form-control></div></div><div class=form-group><label for=password class="col-md-2 control-label">Password</label><div class=col-md-10><input name=password type=password placeholder=Password ng-model=password class=form-control></div></div><div class=form-group><div class="col-md-10 col-md-offset-2"><div class=pull-right><button ng-click=update() ng-disable=profileForm.invalid class="btn btn-primary">Submit</button><a href="/" class="btn btn-default">Cancel</a></div></div></div></legend></fieldset></form></div></div>'),e.put("/app/user/form-signup.html",'<div class=container><div class=well><form name=signupForm class=form-horizontal><fieldset><legend>New User Information<div class=form-group><label for=email class="col-md-2 control-label">Email</label><div class=col-md-10><input name=email type=email placeholder=Email ng-model=email required class=form-control></div></div><div class=form-group><label for=password class="col-md-2 control-label">Password</label><div class=col-md-10><input name=password type=password placeholder=Password ng-model=password required class=form-control></div></div><div class=form-group><label for=firstName class="col-md-2 control-label">First Name</label><div class=col-md-10><input name=firstName type=firstName placeholder="First Name" ng-model=firstName required class=form-control></div></div><div class=form-group><label for=lastName class="col-md-2 control-label">Last Name</label><div class=col-md-10><input name=lastName type=lastName placeholder="Last Name" ng-model=lastName required class=form-control></div></div><div class=form-group><div class="col-md-10 col-md-offset-2"><div class=pull-right><button ng-click=signup() ng-disable=signupForm.invalid class="btn btn-primary">Submit</button><a href="/" class="btn btn-default">Cancel</a></div></div></div></legend></fieldset></form></div></div>'),e.put("/app/admin/user/admin-user-list.html","<div class=container><h1>User List</h1><table class=table><tr ng-repeat=\"user in vm.users\"><td>{{user.firstName + ' ' + user.lastName}}</td></tr></table></div>")}]);