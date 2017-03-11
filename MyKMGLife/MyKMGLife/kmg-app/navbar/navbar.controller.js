(function () {
    'use strict';

    angular
        .module('app')
        .controller('Navbar', Navbar);

    Navbar.$inject = ['$state', '$scope', 'recipeService'];
    
    function Navbar($state, $scope, recipeService) {
        var self = this;
        self.$state = $state;
        self.currentRecipe;

        $scope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) { 
            setCurrentRecipe(toState, toParams);
        });

        activate();

        function activate() {
            setCurrentRecipe($state.current, $state.params);
        }

        function setCurrentRecipe(currentState, currentStateParams) {
            if (currentState.name.indexOf('app.recipe') === 0 && currentStateParams.id) {
                recipeService.getFullModel({ RecipeID: parseInt(currentStateParams.id, 10) }).then(function (currentRecipe) {
                    self.currentRecipe = currentRecipe;
                });
            }
        }
    }
})();
