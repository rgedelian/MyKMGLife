(function (String) {
    'use strict';
    // a place to store constants, utilities, and other application configuration variables

    var templates = {
        genericEdit: '<div ng-init="vm.openRow()"></div>',
        genericNew: '<div ng-init="vm.openNew()"></div>',
        genericDelete: '<div ng-init="vm.openDelete()"></div>',
        genericRelatedAttributes: '<div ng-init="vm.openRelated(\'Attributes\')"></div>',
        genericRelatedIngredients: '<div ng-init="vm.openRelated(\'Ingredients\')"></div>',
        genericRelatedRecipes: '<div ng-init="vm.openRelated(\'Recipes\')"></div>',
        genericList: '/kmg-app/shared/kmg/kmg.tpl.CRUDListContainsChildView.html',
    };

    var collectionTypes = {
        'static': 1,
        'dynamic': 2
    };

    var applicationRoles = {
        admin: 'Admin',
        teacher: 'Teacher',
        engineer: 'Engineer',
        student: 'Student',
        client: 'Client'
    };

    var objectTypeIDs = {
        collection: 3,
        attributeType: 6,
        attribute: 7,
        ingredient: 11
    };
        
    var constants = {
        applicationRoles:applicationRoles,
        templates: templates,
        objectTypeIDs: objectTypeIDs,
        collectionTypes:collectionTypes,
        specialCharacters: ['°', 'ñ', 'Ñ', '¼', '½', '¾', '©', 'ç', 'é', 'ô', 'ó', '®', '™'],
        dateFormatMMDDYYYY: function(date) {
            if (angular.isString(date)) return date;
            date = date || new Date();
            var day = ('0' + date.getDate()).slice(-2);
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var year = date.getFullYear();
            return month + '/' + day + '/' + year;
        },
        dateTimeFormatMMDDYYYYHHMMTT: function(date) {
            if (angular.isString(date)) return date;
            date = date || new Date();
            var hr = date.getHours();
            var ampm = hr < 12 ? "am" : "pm";
            if (hr > 12) hr -= 12;
            var min = date.getMinutes();
            if (min < 10) min = "0" + min;
            var sec = date.getSeconds();
            if (sec < 10) sec = "0" + sec;
            return constants.dateFormatMMDDYYYY(date) + ' ' + hr + ':' + min + ':' + sec + ' ' + ampm;
        },
        regexes: {
            digitsOnly: /^\d+$/
        },
        toSentenceCase: toSentenceCase,
    };

    if (!String.format) {
        String.format = function(format) {
            var args = Array.prototype.slice.call(arguments, 1);
            return format.replace(/{(\d+)}/g, function(match, number) { 
                return typeof args[number] !== 'undefined' ? args[number] : match;
            });
        };
    }

    function toSentenceCase(str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    angular
        .module('app')
                .constant('constants', constants);    
})(String);