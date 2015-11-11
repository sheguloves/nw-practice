var myApp = angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'appController',
    'serviceModule'
]);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/customers', {
        templateUrl: 'app/views/customer-list.html',
        controller: 'customerListCtrl'
    }).
    when('/customers/:customerId', {
        templateUrl: 'app/views/customer-detail.html',
        controller: 'customerDetailCtrl'
    }).
    when('/add', {
        templateUrl: 'app/views/customer-add.html',
        controller: 'customerAddCtrl'
    }).
    otherwise({
        redirectTo: '/customers'
    })
}]);


