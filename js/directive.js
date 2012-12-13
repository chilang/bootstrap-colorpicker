'use strict';

/* Directives */
var app = angular.module('myApp', []);

// Add a directive for the bootstrap color picker widget
// http://www.eyecon.ro/bootstrap-colorpicker/
app.directive('colorpicker', function($parse) {
    return {
        require: '?ngModel',
        link: function(scope, element, attrs, controller) {
            var updateModel;
            
            if(controller != null) {
                updateModel = function(value) {
                    return scope.$apply(function() {
                        return controller.$setViewValue(value);
                    });
                };

                controller.$render = function() {
                    console.log('model value', controller.$viewValue);
                    return element.colorpicker("setValue", controller.$viewValue).on('changeColor', function(e) {
                        if(updateModel) updateModel(e.color.toHex());
                    });
                };
            } else {
                return element.colorpicker().on('changeColor', function(e) {
                    if(updateModel) updateModel(e.color.toHex());
                });
            }
        }
    };
});

