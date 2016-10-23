var appController = angular.module('appController', []);

appController.controller('addCtrl', ['$scope', '$location', 'customerService',
    function($scope, $location, customerService) {
    $scope.information = {
        carNumber: undefined,
        carType: "",
        mailCount: undefined,
        name: "",
        enterDate: "",
        countDate: "",
        cost: {
            items: [],
            other: ""
        },
        stuffList: [],
        worktime: {
            items: [],
            other: ""
        }
    };

    $scope.costItemTemp = {
        name: "",
        cost: 0
    };
    $scope.workTimeItemTemp = {
        name: "",
        cost: 0
    };

    $scope.stuffTemp = {
        name: "",
        unit: "",
        number: 0,
        cost: 0
    };

    $scope.onStuffRemove = function(index) {
        $scope.information.stuffList.splice(index, 1);
    };

    $scope.onCostRemove = function(index) {
        $scope.information.cost.items.splice(index, 1);
    };

    $scope.onWorktimeRemove = function(index) {
        $scope.information.worktime.items.splice(index, 1);
    };

    $scope.onCostAdd = function() {
        $scope.information.cost.items.push(angular.copy($scope.costItemTemp));
        $scope.costItemTemp = {
            name: "",
            cost: 0
        };
    };

    $scope.onStuffAdd = function() {
        $scope.information.stuffList.push(angular.copy($scope.stuffTemp));
        $scope.stuffTemp = {
            name: "",
            unit: "",
            number: "",
            cost: 0
        };
    };

    $scope.onWorktimeAdd = function() {
        $scope.information.worktime.items.push(angular.copy($scope.workTimeItemTemp));
        $scope.workTimeItemTemp = {
            name: "",
            cost: 0
        };
    };

    $scope.onSubmit = function() {
        if ($scope.information.enterDate && typeof $scope.information.enterDate !== "string") {
            $scope.information.enterDate = $scope.information.enterDate.format("YYYY-MM-DD");
        }
        if ($scope.information.countDate && typeof $scope.information.countDate !== "string") {
            $scope.information.countDate = $scope.information.countDate.format("YYYY-MM-DD");
        }
        var result = customerService.addCustomer($scope.information);
        if (result.code === 0) {
            $scope.hasError = true;
        } else {
            $scope.hasError = false;
            $location.path('/customers');
        }
    };

    $scope.onCancel = function() {
        $location.path('/customers');
    };

    $scope.getAllCost = function(list) {
        var cost = 0;
        if (list && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                cost = cost + Number(list[i].cost);
            }
        }
        return cost;
    };

}]);

appController.controller('customerListCtrl', ['$scope', 'customerService',
    function ($scope, customerService) {
        // initial fields
        $scope.sortType = "name";
        $scope.sortReverse = false;
        $scope.searchText = "";

        $scope.customers = customerService.getCustomerList();



        $scope.onExport = function() {
            var nw = require('nw.gui'); //This line is only required for NW.js 0.12.x and below
            var fs = require('fs');
            var path = require('path');

            var file = 'my-settings-file.json';
            var filePath = path.join(nw.App.dataPath, file);
            fs.writeFile(filePath, $scope.customers, function(err) {
                if (err) {
                    console.info("There was an error attempting to save your data.");
                    console.warn(err.message);
                    return;
                } else {
                    console.log(filePath, 'Settings saved');
                }
            });
        };

        $scope.removeCustomer = function(customer) {
            var result = customerService.removeCustomer(customer);
            if (result === true) {
                var index = $scope.customers.indexOf(customer);
                if (index > -1) {
                    $scope.customers.splice(index, 1);
                }
                $scope.hasError = false;
            } else {
                $scope.hasError = true;
            }
        };

        $scope.search = function(item) {
            var searchText = angular.lowercase($scope.searchText);
            if (item.name && angular.lowercase(item.name).indexOf(searchText) !== -1) {
                return true;
            }
            if (item.carType && angular.lowercase(item.carType).indexOf(searchText) !== -1) {
                return true;
            }
            if (item.carNumber && angular.lowercase(item.carNumber).indexOf(searchText) !== -1) {
                return true;
            }
            if (item.enterDate && angular.lowercase(item.enterDate).indexOf(searchText) !== -1) {
                return true;
            }
            if (item.countDate && angular.lowercase(item.countDate).indexOf(searchText) !== -1) {
                return true;
            }
            return false;
        };
    }]
);

appController.controller('customerDetailCtrl', ['$scope', '$routeParams', '$location', 'customerService',
    function ($scope, $routeParams, $location, customerService) {
        $scope.costItemTemp = {
            name: "",
            cost: 0
        };
        $scope.workTimeItemTemp = {
            name: "",
            cost: 0
        };

        $scope.stuffTemp = {
            name: "",
            unit: "",
            number: 0,
            cost: 0
        };

        $scope.onStuffRemove = function(index) {
            $scope.information.stuffList.splice(index, 1);
        };

        $scope.onCostRemove = function(index) {
            $scope.information.cost.items.splice(index, 1);
        };

        $scope.onWorktimeRemove = function(index) {
            $scope.information.worktime.items.splice(index, 1);
        };

        $scope.onCostAdd = function() {
            $scope.information.cost.items.push(angular.copy($scope.costItemTemp));
            $scope.costItemTemp = {
                name: "",
                cost: 0
            };
        };

        $scope.onStuffAdd = function() {
            $scope.information.stuffList.push(angular.copy($scope.stuffTemp));
            $scope.stuffTemp = {
                name: "",
                unit: "",
                number: "",
                cost: 0
            };
        };

        $scope.onWorktimeAdd = function() {
            $scope.information.worktime.items.push(angular.copy($scope.workTimeItemTemp));
            $scope.workTimeItemTemp = {
                name: "",
                cost: 0
            };
        };

        $scope.onCancel = function() {
            $location.path('/customers');
        };

        $scope.getAllCost = function(list) {
            var cost = 0;
            if (list && list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    cost = cost + Number(list[i].cost);
                }
            }
            return cost;
        };

        var informations = customerService.getCustomerDetail($routeParams.customerId);
        var information = null;
        if (informations.length > 0) {
            information = informations[0];
            $scope.information = angular.copy(information);
        } else {
            $scope.information = null;
        }

        $scope.profilesChanged = false;

        $scope.updateCustomer = function() {
            if ($scope.information.enterDate && typeof $scope.information.enterDate !== "string") {
                $scope.information.enterDate = $scope.information.enterDate.format("YYYY-MM-DD");
            }
            if ($scope.information.countDate && typeof $scope.information.countDate !== "string") {
                $scope.information.countDate = $scope.information.countDate.format("YYYY-MM-DD");
            }
            var result = customerService.updateCustomer($scope.information);
            information = angular.copy($scope.information);
            $scope.profilesChanged = false;
        };

        $scope.$watch('information', function(newValue, oldValue) {
            if (!newValue || !oldValue) {
                return;
            }
            if ($scope.information.enterDate && typeof $scope.information.enterDate !== "string") {
                $scope.information.enterDate = $scope.information.enterDate.format("YYYY-MM-DD");
            }
            if ($scope.information.countDate && typeof $scope.information.countDate !== "string") {
                $scope.information.countDate = $scope.information.countDate.format("YYYY-MM-DD");
            }
            if (!angular.equals($scope.information, information)) {
                $scope.profilesChanged = true;
            } else {
                $scope.profilesChanged = false;
            }
        }, true);
    }]
);

