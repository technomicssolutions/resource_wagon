'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var employeeme_serv = angular.module('resource_wagon.services', ['ngResource']);

employeeme_serv.value('version', '0.1');

employeeme_serv.factory('share', function()
{
    return {
        messages : {
            show : false,
            type : '',
            message : ''
        },
        loader : {
            show : false
        }
    };
});
