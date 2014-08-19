'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var resource_wagon_serv = angular.module('resource_wagon.services', ['ngResource']);

resource_wagon_serv.value('version', '0.1');

resource_wagon_serv.factory('share', function()
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
