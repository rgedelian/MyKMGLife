(function () {
    'use strict';

    angular
        .module('app')
            .config(mvcHeaderSetter)
            .factory('mvcHeaderSetterInterceptor', mvcHeaderSetterInterceptor)
            .filter('propsFilter', propsFilter)
        // TODO: needed?
            //.run(scrollToTopOnCertainStateChanges)
            //.run(preventImagePasteInTextangular)
            .run(historyListener);

    mvcHeaderSetterInterceptor.$inject = ['$location'];
    function mvcHeaderSetterInterceptor ($location) {
        return {
            request: function (config) {

                // http://stackoverflow.com/questions/8498592/extract-root-domain-name-from-string
                function extractDomain(url) {
                    var domain;
                    //find & remove protocol (http, ftp, etc.) and get domain
                    if (url.indexOf("://") > -1) {
                        domain = url.split('/')[2];
                    }
                    else {
                        domain = url.split('/')[0];
                    }

                    //find & remove port number
                    domain = domain.split(':')[0];

                    return domain;
                }

                var ajaxHost = extractDomain(config.url).toLowerCase();
                var webHost = $location.host().toLowerCase();
                var isLocalRequest = ajaxHost === webHost;

                if (isLocalRequest) {
                    if (config.method === 'GET') {
                        // "get"
                        // this is to prevent MSIE from caching GETs
                        config.headers['Pragma'] = 'no-cache';
                        config.headers['Cache-Control'] = 'no-cache';
                    }
                    // "common"
                    // this is so that MVC will be able to correctly use Request.IsAjaxRequest()
                    config.headers['X-Requested-With'] = 'XMLHttpRequest';
                }
                return config;
            }
        };
    }

    
    mvcHeaderSetter.$inject = ['$httpProvider'];
    function mvcHeaderSetter ($httpProvider) {
        $httpProvider.interceptors.push('mvcHeaderSetterInterceptor');
    }

    // this is used by ui-select    
    function propsFilter() {
        return function(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function(item) {
                    var itemMatches = false;
                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }
            return out;
        };
    }


    // TODO: Any of this needed?
    //// http://stackoverflow.com/questions/21055952/changing-route-doesnt-scroll-to-top-in-the-new-page
    //scrollToTopOnCertainStateChanges.$inject = ['$rootScope', '$anchorScroll', '_', 'currentFormService', '$uibModal', '$state'];
    //function scrollToTopOnCertainStateChanges($rootScope, $anchorScroll, _, currentFormService, $uibModal, $state) {
    //    $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
    //        var scrollToTop = true;

    //        // you could set 'alwaysScrollToTop' flag in your state config if you want to always scroll to top when entering this state
    //        if (!toState.alwaysScrollToTop) {
    //            // if the last part of the state, begins with one of these, avoid scrolling to the top (they are usually inline)
    //            var stateEndingPrefixesNoScroll = ['edit', 'delete', 'refresh', 'related'];

    //            var stateParts = toState.name.split('.');
    //            var lastStatePart = stateParts[stateParts.length-1];           

    //            _.each(stateEndingPrefixesNoScroll, function(se) {
    //                if (lastStatePart.indexOf(se) === 0) {
    //                    scrollToTop = false;
    //                    return false;
    //                }
    //            });
    //        }
    //        if (scrollToTop) {
    //            $anchorScroll();
    //        }
    //    });
    //    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    //        if ((fromState.name.endsWith('.edit') || fromState.name.endsWith('.new')) && currentFormService.currentForm && currentFormService.currentForm.$dirty && !currentFormService.currentForm.$submitted && !$rootScope.overridePrompt) {
    //            event.preventDefault();
    //            function onConfirmed(result) {
    //                if (result === 'discard') {
    //                    $rootScope.overridePrompt = true;
    //                    $state.go(toState, toParams);
    //                }
    //            }
    //            $uibModal.open({
    //                templateUrl: '/recipe-app/shared/common/preventDirtyNav/preventDirtyNav.modal.tpl.html',
    //                windowClass: 'modal-small'
    //            }).result.then(onConfirmed, onConfirmed);
    //        } else if (!$rootScope.overridePrompt) {
    //            $rootScope.overridePrompt = false;
    //        }
    //    });
    //}

    //// https://github.com/fraywing/textAngular/issues/883
    //preventImagePasteInTextangular.$inject = ['$rootScope'];
    //function preventImagePasteInTextangular($rootScope) {
    //    // attach a global function to the rootScope that strips out images from pasted Html
    //    $rootScope.handlePaste = handlePaste;
    //    function handlePaste(content) {
    //        var imageLess = $('<p>').html(content).find('img').remove().end().html().trim();
    //        while (imageLess.startsWith('<br>')) {
    //            imageLess = imageLess.slice(4).trim();
    //        }
    //        while (imageLess.endsWith('<br>')) {
    //            imageLess = imageLess.slice(0, imageLess.length-4).trim();
    //        }
    //        if (!imageLess.length) {
    //            // https://github.com/fraywing/textAngular/issues/1297
    //            return '<iframe></iframe>';
    //        }
    //        return imageLess;
    //    }
    //}
    
    // http://stackoverflow.com/questions/16635381/angular-ui-router-get-previous-state
    historyListener.$inject = ['$rootScope', 'historyService'];
    function historyListener($rootScope, historyService) {
        $rootScope.$on("$stateChangeSuccess", function (ev, to, toParams, from, fromParams) {
            historyService.previousState = from;
            historyService.previousStateParams = fromParams;
        });
    }
})();