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