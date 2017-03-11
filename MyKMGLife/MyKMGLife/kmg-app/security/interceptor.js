angular.module('security.interceptor', ['security.retryQueue'])

// This http interceptor listens for authentication failures
.factory('securityInterceptor', ['$injector', 'securityRetryQueue', '$q', function($injector, queue, $q) {
    return {
        'responseError': function(rejection) {
            if (rejection.status === 401) {
                // unauthenticated: there is no session
                // unauthorized: insufficient access priviledge
                var queueName = rejection.statusText || 'unauthenticated-server';
                if (queueName === 'unauthenticated-server') {
                    $injector.get('security').sessionHasExpired();
                    // The request bounced because it was not authorized - add a new request to the retry queue
                    return queue.pushRetryFn(queueName, function retryRequest() {
                        // We must use $injector to get the $http service to prevent circular dependency
                        return $injector.get('$http')(rejection.config);
                    });
                }
                else if (queueName === 'unauthorized-server') {
                    queue.skip();
                    return queue.pushRetryFn(queueName, function retryRequest() {
                        return $q.reject(rejection);
                    });
                }
            }
            return $q.reject(rejection);
        }
    };
}])

// We have to add the interceptor to the queue as a string because the interceptor depends upon service instances that are not available in the config block.
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('securityInterceptor');
}]);