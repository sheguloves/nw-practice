var myApp = angular.module('myApp', [
    'ngRoute',
    'datePicker',
    'appDirective',
    'appController',
    'serviceModule'
]);

var gui = require('nw.gui');

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/add', {
        templateUrl: 'app/views/add-view.html',
        controller: 'addCtrl'
    }).
    when('/customers', {
        templateUrl: 'app/views/customer-list.html',
        controller: 'customerListCtrl'
    }).
    when('/customers/:customerId', {
        templateUrl: 'app/views/customer-detail.html',
        controller: 'customerDetailCtrl'
    }).
    otherwise({
        redirectTo: '/customers'
    })
}]);


