var path = require('path');

//For nodewebkit, need to use path.join to get the correct path
var serviceUtil = require(path.join(process.cwd(), "app/service/dbService"));

var serviceModule = angular.module('serviceModule', []);

serviceModule.factory('customerService', function() {
    var customerService = {};
    customerService.addCustomer = function(customerProfiles) {
        var option = {};
        option.name = customerProfiles.name;
        option.phone = customerProfiles.phone;
        var result = serviceUtil.customerExist(option);
        var sameName = false, samePhone = false;

        if (result && result.length > 0) {
            // need to double check since diskdb.find() returns all which if any one value is matched
            result.forEach(function(item) {
                if (item.name === option.name && !sameName) {
                    sameName = true;
                }
                if (item.phone === option.phone && !samePhone) {
                    samePhone = true;
                }
            });
        }

        if (samePhone && sameName) {
            return {
                "code": 2, //warning
                "sameName" : sameName,
                "samePhone" : samePhone
            }
        }
        else {
            var customer = serviceUtil.addCustomer(customerProfiles);
            if (customer.name === customerProfiles.name && customer.phone === customerProfiles.phone) {
                return {
                    "code" : 1, // successful
                    "sameName" : sameName,
                    "samePhone" : samePhone
                }; 
            } else {
                return {
                    "code" : 0 // error
                };
            }
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

    return customerService;
});
