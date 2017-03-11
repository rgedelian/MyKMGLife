(function () {
    'use strict';

    angular
        .module('app')
            .config(configureStates);
    
    configureStates.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
    function configureStates($stateProvider, $locationProvider, $urlRouterProvider) {
        // it makes no hash marks
        $locationProvider.html5Mode(true);

        // what to do if no route matches
        $urlRouterProvider.otherwise("/")

        $stateProvider
            //.state('signin', {
            //    url: "/signin",
            //    views: {
            //        'navbar': {
            //            template: null,
            //        },
            //        'content': {
            //            templateUrl: "/kmg-app/account/signin.html",
            //            controller: 'Signin',
            //            controllerAs: 'vm',
            //        }
            //    },
            //    data: {
            //        requireLogin: false
            //    }
            //})
            .state('logout', {
                url: "/logout",
                views: {
                    'navbar': {
                        template: null,
                    },
                    'content': {
                        templateUrl: "/kmg-app/security/logout.html",
                    }
                }
            })
            .state('app', {
                url: "/",
                views: {
                    'navbar': {
                        templateUrl: "/kmg-app/navbar/navbar.html",
                        controller: 'Navbar',
                        controllerAs: 'vm',
                    },
                    'content': {
                        templateUrl: "/kmg-app/dashboard/dashboard.html",
                        //controller: 'Dashboard',
                        //controllerAs: 'vm',
                    }
                },
                // TODO: Uncomment
                //resolve: {
                //    //this is for the entire app and below, you can inject the authenticatedUSer into Authorize resolves, and this will alwys run first
                //    //THis used to sit on app.admin, and on app.recipe, but the dashboard contained logic, so it had to be moved here.
                //    authenticatedUser: ['securityAuthorization', function (securityAuthorization) {
                //        return securityAuthorization.requireAuthenticatedUser();
                //    }],
                //},
                //data: {
                //    requireLogin: true
                //}
            })
            //abstract state so that we can hold all our admin stuff here
            .state('app.admin', {
                url: 'admin',
                abstract: true,
                template: '<ui-view/>',
            });
    }
})();