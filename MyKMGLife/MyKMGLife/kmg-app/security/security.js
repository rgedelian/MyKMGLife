// Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
angular.module('security.service', [
  'security.retryQueue',    // Keeps track of failed requests that need to be retried once the user logs in
  'security.login',         // Contains the login form template and controller
  'ui.bootstrap'     // Used to display the login form as a modal dialog.
])

.factory('security', ['$http', '$q', '$location', 'securityRetryQueue', '$uibModal', function($http, $q, $location, queue, $uibModal) {

  // Redirect to the given url (defaults to '/')
  function redirect(url) {
    url = url || '/';
    $location.path(url);
  }

  // Login form dialog stuff
  var loginDialog = null;
  function openLoginDialog() {
    if ( loginDialog ) {
      return;//throw new Error('Trying to open a dialog that is already open!');
    }
    //loginDialog = $uibModal.open();
    loginDialog = $uibModal.open({
        templateUrl: '/recipe-app/security/login/loginForm.tpl.html',
        controller: 'LoginFormController',
        windowClass: 'modal-small',
        backdrop: 'static',     // for this dialog, prevent dismissing by clicking the backdrop
        keyboard: false         // for this dialog, prevent dismissing by hitting esc key
    });
    loginDialog.result.then(onLoginDialogClose, onLoginDialogCancel);
  }
  function closeLoginDialog(success) {
    if (loginDialog) {
      loginDialog.close(success);
    }
  }
  function onLoginDialogCancel() {
      loginDialog = null;
      queue.cancelAll();
  }
  function onLoginDialogClose(success) {
    loginDialog = null;
    if ( success ) {
      queue.retryAll();
    } else {
      queue.cancelAll();
      redirect();
    }
  }
    function getUser(user) {
        if (user) {
            if (user.RecipeSearchObject && user.RecipeSearchObject.length) {
                user.RecipeSearchObject = JSON.parse(user.RecipeSearchObject);
            }
            if (user.IngredientSearchObject && user.IngredientSearchObject.length) {
                user.IngredientSearchObject = JSON.parse(user.IngredientSearchObject);
            }
            if (user.CollectionSearchObject && user.CollectionSearchObject.length) {
                user.CollectionSearchObject = JSON.parse(user.CollectionSearchObject);
            }
        }
        return user;
    }

  // Register a handler for when an item is added to the retry queue
  queue.onItemAddedCallbacks.push(function(retryItem) {
    if ( queue.hasMore() ) {
      service.showLogin();
    }
  });

  // The public API of the service
  var service = {

    // Get the first reason for needing a login
    getLoginReason: function() {
      return queue.retryReason();
    },

    // Show the modal login dialog
    showLogin: function() {
      openLoginDialog();
    },

    // Attempt to authenticate a user by the given email and password
    login: function (username, password) {
        var antiForgeryToken = angular.element('form#antiForgeryForm input[name="__RequestVerificationToken"]').val();
        var request = $http({
            method: 'POST',
            url: '/api/account/login',
            headers: { '__RequestVerificationToken': antiForgeryToken },
            data: {UserName: username, Password: password }
        });
      return request.then(function(response) {
          service.currentUser = getUser(response.data.Data);
        if ( service.isAuthenticated() ) {
          closeLoginDialog(true);
        }
        return service.isAuthenticated();
      });
    },

    // Give up trying to login and clear the retry queue
    cancelLogin: function() {
      closeLoginDialog(false);
      redirect();
    },

    // Logout the current user and redirect
    logout: function(redirectTo) {
        $http.post('/api/account/logout'
            //{ headers: { 'X-XSRF-Token': service.currentUser.antiForgeryToken } }
            ).then(function () {
        service.currentUser = null;
        redirect(redirectTo);
      });
    },

    // Ask the backend to see if a user is already authenticated - this may be from a previous session.
    requestCurrentUser: function() {
      if ( service.isAuthenticated() ) {
        return $q.when(service.currentUser);
      } else {
          return $http.get('/api/account/current-user').then(function (response) {
              if (response.data.IsSuccess) {
                  service.currentUser = getUser(response.data.Data);
              }
          return service.currentUser;
        });
      }
    },

    // Information about the current user
    currentUser: null,

    // Is the current user authenticated?
    isAuthenticated: function () {
      return !!service.currentUser;
    },

    sessionHasExpired: function () {
        service.currentUser = null;
    },
    
    // Is the current user an adminstrator?
    isAdmin: function() {
      return !!(service.currentUser && service.currentUser.RoleName === "Admin");
    },

    //// Is the current user a Business User?
    isGuest: function () {
        return !!(service.currentUser && service.currentUser.RoleName === "Guest");
    },

    //// Is the current user a Publisher?
    //isPublisher: function () {
    //    return !!(service.currentUser && service.currentUser.RoleName === "Publisher");
    //},

    //// Is the current user a Developer?
    //isDeveloper: function () {
    //    return !!(service.currentUser && service.currentUser.RoleName === "Developer");
    //},

    //// Is the current user a Developer?
    //isDecorator: function () {
    //    return !!(service.currentUser && service.currentUser.RoleName === "Decorator");
    //},

    isInRole: function (roleArray) {
        return !!(service.currentUser && roleArray.indexOf(service.currentUser.RoleName) > -1);
    },
  };

  return service;
}]);
