angular.module('security.login.form', [])//'services.localizedMessages'])

// The LoginFormController provides the behaviour behind a reusable form to allow users to authenticate.
// This controller and its template (login/loginForm.tpl.html) are used in a modal dialog box by the security service.
.controller('LoginFormController', ['$scope', 'security', function($scope, security) {
    // The model for this form 
    $scope.user = {};

    // Any error message from failing to login
    $scope.authError = null;

    // The reason that we are being asked to login - for instance because we tried to access something to which we are not authorized
    // We could do something diffent for each reason here but to keep it simple...
    $scope.authReason = null;
    var loginReason = security.getLoginReason();
    if (loginReason) {
        $scope.authReason = ( security.isAuthenticated() ) ?
            "Not authorized" :
            (loginReason === 'unauthenticated-server') ? "Session expired" : "Not logged in";
    }

    // Attempt to authenticate the user specified in the form's model
    $scope.login = function() {
        // Clear any previous security errors
        $scope.authError = null;
        $scope.actionState.loading = true;

        // Try to login
        security.login($scope.user.username, $scope.user.password).then(function (loggedIn) {
            if ( !loggedIn ) {
                // If we get here then the login failed due to bad credentials
                $scope.authError = "Invalid credentials";// localizedMessages.get('login.error.invalidCredentials');
            }
            $scope.actionState.loading = false;
        }, function(x) {
            // If we get here then there was a problem with the login request to the server
            $scope.authError = "Invalid server response: " + x;//localizedMessages.get('login.error.serverError', { exception: x });
            $scope.actionState.loading = false;
        });
    };
    $scope.clearForm = function() {
        $scope.user = {};
    };
    $scope.cancelLogin = function() {
        security.cancelLogin();
    };
    $scope.actionState = {
        loading: false
    };
}]);
