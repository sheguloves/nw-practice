var dbService = {};
var db = require('diskdb');
var bcrypt = require('bcrypt-nodejs');
var path = require('path');

// For nodewebkit, need to use path.join to get the corresponding directory
db.connect(path.join(process.cwd(), "app/service/datastore"), ['customers']);

dbService.addCustomer = function(customerProfiles) {
    //TODO: add logic for add customer
    return db.customers.save(customerProfiles);
};

dbService.getCustomerList = function() {
    return db.customers.find();
}

dbService.customerExist = function(options) {
    return db.customers.find(options);
}

dbService.getCustomerDetail = function(customerId) {
    return db.customers.find({_id: customerId});
};

dbService.updateCustomer = function(customer) {
    var options = {
        multi: false,
        upsert: false
    };

    var query = {
        _id: customer._id
    };

    // cannot change customer id
    delete customer._id;

    return db.customers.update(query, customer, options);
};

dbService.removeCustomer = function(customer) {
    return db.customers.remove(customer, false /* multi, default is true */);
};

module.exports = dbService;
