(function () {
    'use strict';

    angular
        .module('app')
        .service('historyService', historyService);

    historyService.$inject = ['$state'];

    function historyService($state) {
        function back() {
            if (self.previousState && !self.previousState.abstract) {
                $state.go(self.previousState, self.previousStateParams);
                return true;
            }
            return false;
        }
        var self = {
            previousState: null,
            previousStateParams: null,
            back: back
        };
        return self;
    }
})();



