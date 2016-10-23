var path = require('path');

//For nodewebkit, need to use path.join to get the correct path
var serviceUtil = require(path.join(process.cwd(), "service/dbService"));

var serviceModule = angular.module('serviceModule', []);

serviceModule.factory('customerService', function() {
    var customerService = {};
    customerService.addCustomer = function(customerProfiles) {
        var customer = serviceUtil.addCustomer(customerProfiles);
        if (customer.name === customerProfiles.name &&
            customer.carNumber === customerProfiles.carNumber) {
            return {
                "code" : 1
            };
        } else {
            return {
                "code" : 0 // error
            };
        }
    };

    customerService.updateCustomer = function(customerProfiles) {
        var result =  serviceUtil.updateCustomer(customerProfiles);
        return result;
    };

    customerService.getCustomerList = function() {
        var customers = serviceUtil.getCustomerList();
        return customers;
    };

    customerService.getCustomerDetail = function(customerId) {
        return serviceUtil.getCustomerDetail(customerId);
    };

    customerService.removeCustomer = function(customer) {
        var result = serviceUtil.removeCustomer(customer);
        return result;
    };

    customerService.export = function(customers) {
        var result = serviceUtil.export(customers);
        return result;
    };

    return customerService;
});
