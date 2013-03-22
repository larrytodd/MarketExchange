function BidMade(data) {
    if (data.priceUpdated == true) {
        document.getElementById('lastPrice_' + data.itemId).innerHTML = data.lastPrice;
        $('#itm_' + data.itemId).animate({ "background-color": "green" }, 1000).animate({ "background-color": "white" }, 1000);
    }
    else {
        var currentBid = document.getElementById('bid_' + data.itemId).innerHTML;
        if (data.bid > currentBid) {
            document.getElementById('bid_' + data.itemId).innerHTML = data.bid;
            $('#itm_' + data.itemId).animate({ "background-color": "green" }, 1000).animate({ "background-color": "white" }, 1000);
        }
    }
}
function ItemAdded(data) {
    setTimeout(function () {
        $('#itm_' + data.itemId).animate({ "background-color": "red" }, 1000).animate({ "background-color": "white" }, 1000);
    }, 300);
}