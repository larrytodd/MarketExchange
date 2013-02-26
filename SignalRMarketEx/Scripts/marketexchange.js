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
    $('[name="hrefbid"]').live('click', function (e) {
        var id = $(this).attr('id').replace('href_', '');
        var bidPrice = document.getElementById('bidPrice_' + id).value;
        var lastPrice = document.getElementById('lastPrice_' + id).innerHTML;
        $.getJSON('/Home/ItemBid', { 'id': id, 'bid': bidPrice, 'lastPrice': lastPrice }, function (data) {

        });
    });
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