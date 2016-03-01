(function () {
    'use strict';

    angular.module('app.admin.user')
    .controller('AdminUserController', AdminUserController);

    AdminUserController.$inject = ['UserResource'];
    function AdminUserController(UserResource) {
        var vm = this;
        vm.users = UserResource.query();
    }

})();
