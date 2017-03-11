(function () {
    'use strict';

    angular.module('app', [
        'ui.router',
        'ngResource',
        //'ngAnimate',
        'ui.bootstrap'//,
        //'toastr',
        //'security'
        //'ngMessages',
        //'angularUtils.directives.dirPagination',
        //'angularSpinners',
        //'ngSanitize',   // required for ui.select
        //'ui.select',
       // 'textAngular',
        //'ui.router.title'
    ])
        // lodash support
        .constant('_', window._);
})();
