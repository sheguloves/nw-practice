var myApp = angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'appController',
    'serviceModule'
]);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/customers', {
        templateUrl: 'src/views/customer-list.html',
        controller: 'customerListCtrl'
    }).
    when('/customers/:customerId', {
        templateUrl: 'src/views/customer-detail.html',
        controller: 'customerDetailCtrl'
    }).
    when('/add', {
        templateUrl: 'src/views/customer-add.html',
        controller: 'customerAddCtrl'
    }).
    otherwise({
        redirectTo: '/customers'
    })
}]);


