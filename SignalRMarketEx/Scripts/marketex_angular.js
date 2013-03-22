var marketex = angular.module('marketex', ['ui.bootstrap']);

marketex.controller('itemController', function ($scope, $http) {
    $http.get('/api/MarketExApi/load').success(function (data) {
        $scope.items = data;
    });
    $scope.submitBid = function (item, bidPrice) {
        $http.post('/api/MarketExApi?id=' + item.itemId + '&bid=' + bidPrice + '&ask=' + item.ask + '&lastPrice=' + item.lastPrice, {});
        this.bidPrice = '';
    };
    //SignalR 
    var hub = $.connection.marketExchangeHub;
    $.connection.hub.start();
    hub.client.updateItems = function (data) {
        $scope.$apply(function () {
            $scope.items.push(data);
            //Set item added for effect in directive
            $scope.addedItem = data;
        });
    };
    hub.client.updateBidPrice = function (data) {
        $scope.$apply(function () {
            angular.forEach($scope.items, function (item) {
                if (item.itemId == data.itemId) {
                    if (data.priceUpdated == true) {
                        item.lastPrice = data.lastPrice;
                        //Set item updated for effect and updating bids or prices
                        $scope.updatedItem = data;
                    }
                    else {
                        if (data.bid > item.bid) {
                            item.bid = data.bid;
                            //Set item updated for effect and updating bids or prices
                            $scope.updatedItem = data;
                        }
                    }
                }
            });
        });
    };
    //Default values for directives
    $scope.addedItem = null;
    $scope.updatedItem = null;
});
marketex.controller('showItemController', function ($scope, $dialog) {
    $scope.opts = {
        backdrop: true,
        keyboard: true,
        dialogFade:true,
        backdropClick: true,
        templateUrl: '/Templates/ItemEntry.html',
        controller: 'showItemController'
    };
    $scope.openDialog = function () {
        var d = $dialog.dialog($scope.opts);
        d.open('/Templates/ItemEntry.html','addItemController')
    };
});
marketex.controller('addItemController', function ($scope,$http, dialog) {
    $scope.submit = function (product, description, ask) {
        $http.post('/api/MarketExApi?product='+product+'&description='+description+'&ask='+ask, { }).success(function (data) {
            dialog.close();
        });
    };
});
marketex.directive("signalRDirectiveAdded",function () {
    return {
        link: function ($scope, element, attributes) {
            $scope.$watch(attributes.signalRDirectiveAdded, function (value) {
                if (value != null) {
                    $('#itm_' + value.itemId).animate({ "background-color": "red" }, 1000).animate({ "background-color": "white" });
                }
            });
        }
    }
});
marketex.directive("signalRDirectiveUpdated", function () {
    return {
        link: function ($scope, element, attributes) {
            $scope.$watch(attributes.signalRDirectiveUpdated, function (value) {
                if (value != null) {
                    $('#itm_' + value.itemId).animate({ "background-color": "green" }, 1000).animate({ "background-color": "white" }, 1000);
                }
            });
        }
    }
});