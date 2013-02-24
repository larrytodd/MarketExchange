$(document).ready(function () {
    $('#divAddItemModal').dialog(
    {
        autoOpen: false,
        modal: true,
        dragable: true,
        width:350,
        height:210,
        show: "slide",
        hide:"slide"
    });
    $('#btnShowAdd').click(function (e) {
        $('#divAddItemModal').dialog('open');
    });
});
$(function () {
    function Item(data) {
        this.itemId = ko.observable(data.itemId);
        this.product = ko.observable(data.product);
        this.description = ko.observable(data.description);
        this.bid = ko.observable(data.bid);
        this.ask = ko.observable(data.ask);
        this.lastPrice = ko.observable(data.lastPrice);
        this.bidPrice = ko.observable(data.bidPrice);
    }
   var itemsModel = function ItemListViewModel() {
        var self = this;
        self.items = ko.observableArray([]);
        //Operations
        self.updateItems = function (data) {
            self.items.push(new Item({
                itemId:'itm_' + data.itemId,
                product: data.product,
                description: data.description,
                bid: data.bid,
                ask: data.ask,
                lastPrice: data.lastPrice,
                bidPrice: ""
            }));
        };
        self.bidItem = function () {

        };
    }
    ko.applyBindings(itemsModel());
    //SignalR bindings
    var hub = $.connection.marketExchangeHub;
    $.connection.hub.start();
    hub.client.updateItems = function (data) {
        updateItems(data);
    };
});
//Ajax succes and failure methods
function UpdateItemSuccess(data) {
    document.getElementById('Product').value = '';
    document.getElementById('Description').value = '';
    document.getElementById('Ask').value = '';
    $('#tblMarket th').css('border-bottom', '1px solid black');
    $('#divAddItemModal').dialog('close');
}
function UpdateItemFailure(data) {
    
}