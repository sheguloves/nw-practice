var appController = angular.module('appController', []);

appController.controller('customerListCtrl', ['$scope', '$timeout', 'customerService',
    function ($scope, $timeout, customerService) {
        // initial fields
        $scope.sortType = "name";
        $scope.sortReverse = false;
        $scope.searchText = "";
        $scope.removeSuccess = false;
        $scope.removeCustomer = "";

        $scope.customers = customerService.getCustomerList();

        var timer;

        $scope.removeCustomer = function(customer) {
            if ($scope.removeSuccess) {
                $timeout.cancel(timer);
            }
            var result = customerService.removeCustomer(customer);
            if (result === true) {
                var index = $scope.customers.indexOf(customer);
                if (index > -1) {
                    $scope.customers.splice(index, 1);
                    $scope.customerName = customer.name;
                    $scope.removeSuccess = true;

                    timer = $timeout(resetStates, 3000);
                }
            }
        };

        var resetStates = function() {
            $scope.removeSuccess = false;
        };

        $scope.search = function(item) {
            var searchText = angular.lowercase($scope.searchText);
            if (item.name && angular.lowercase(item.name).indexOf(searchText) !== -1) {
                return true;
            }
            if (item.phone && angular.lowercase(item.phone).indexOf(searchText) !== -1) {
                return true;
            }
            if (item.comments && angular.lowercase(item.comments).indexOf(searchText) !== -1) {
                return true;
            }
            return false;
        };

        $scope.$on("$destroy", function(event) {
            $timeout.cancel(timer);
        });
    }]
);

appController.controller('customerDetailCtrl', ['$scope', '$routeParams', '$timeout', 'customerService',
    function ($scope, $routeParams, $timeout, customerService) {
        var customers = customerService.getCustomerDetail($routeParams.customerId);
        var customer = null;
        if (customers.length > 0) {
            customer = customers[0];
            $scope.customer = angular.copy(customer);
        } else {
            $scope.customer = null;
        }

        var timer;
        $scope.updateSuccess = false;
        $scope.profilesChanged = false;

        $scope.updateCustomer = function(customer) {
            if ($scope.updateSuccess) {
                $timeout.cancel(timer);
            }
            var result = customerService.updateCustomer(customer);
            $scope.profilesChanged = false;
            $scope.updateSuccess = true;
            $scope.customerName = customer.name;

            timer = $timeout(resetStates, 3000);
        };

        var resetStates = function() {
            $scope.updateSuccess = false;
        };

        $scope.changeHandler = function() {
            for (var field in customer) {
                if (customer.hasOwnProperty(field) &&
                    customer[field] !== $scope.customer[field]) {
                    $scope.profilesChanged = true;
                    return;
                }
            }
            $scope.profilesChanged = false;
        };

        $scope.reset = function () {
            $scope.customer = {};
            $scope.customer = angular.copy(customer);
        };

        $scope.$on("$destroy", function(event) {
            $timeout.cancel(timer);
        });
    }]
);

appController.controller('customerAddCtrl', ['$scope', '$timeout', 'customerService',
    function ($scope, $timeout, customerService) {

        $scope.addSuccess = false;
        $scope.nameExist = false;
        $scope.phoneExist = false;

        var timer;

        $scope.addCustomer = function(customer) {
            var result = customerService.addCustomer(customer);
            switch (result.code) {
                case 0:
                    $scope.hasError = true;
                    break;
                case 2:
                    $scope.customerExist = true;
                    break;
                case 1:
                    $scope.nameExist = result.sameName;
                    $scope.phoneExist = result.samePhone;
                    if ($scope.addSuccess) {
                        $timeout.cancel(timer);
                    }
                    $scope.addSuccess = true;
                    $scope.customerName = customer.name;
                    $scope.addform.$setPristine();
                    $scope.customer = {};
                    timer = $timeout(resetStates, 5000);
                    break;
                default:
                    break;
            }

        };

        var resetStates = function () {
            $scope.addSuccess = false;
            $scope.nameExist = false;
            $scope.phoneExist = false;
        };

        $scope.changed = function() {
            $scope.customerExist = false;
            $scope.nameExist = false;
            $scope.phoneExist = false;
        };

        $scope.reset = function() {
            $scope.customer = {};
            $scope.addform.$setPristine();
        };

        $scope.$on("$destroy", function(event) {
            $timeout.cancel(timer);
        });
    }]
);