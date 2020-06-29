$(document).ready(function() {
var checkoutdata = $('#checkoutdata');
function createdatarow(data){
    var mainRow = $('<tr>').addClass('data-row');
    var td = $('<td>')
    var img = $('<img>').addClass('checkout-product-img').attr('src', data.preview);
    var tdname =$('<td>').text(data.name);
    var tdQcount =$('<td>').text(parseInt(data.price));
    var tdcount =$('<td>').text('Q'+data.count);
    var tdtotal =$('<td>').text(parseInt(data.count) * parseInt(data.price));
     $(td).append(img);
    $(mainRow).append(td);
    $(mainRow).append(tdname);
    $(mainRow).append(tdQcount);
    $(mainRow).append(tdcount);
    $(mainRow).append(tdtotal);
   return mainRow
}

var productList = JSON.parse(window.localStorage.getItem('productlist'));
var grandTotal = 0;
for(i=0; i<productList.length; i++){
    console.log(productList)
    $(checkoutdata).append(createdatarow(productList[i]));
    var totalforcurrentproduct = parseFloat(productList[i].count) * parseFloat(productList[i].price);
    grandTotal = grandTotal + totalforcurrentproduct;
}
var totalcount = 0;
for(i=0; i<productList.length; i++){
    totalcount = totalcount + productList[i].count;
}
$('.cart_quantity').html(totalcount);


$('#item-count').html(productList.length);
$('#total-count').html(grandTotal);

$('#placeorder').click( function(){
var orderitem=[]
for(var i=0; i<productList.length; i++){
    var proObj = {
        "id" : productList[i].id,
        'name': productList[i].name,
        'price': productList[i].price,
        'preview': productList[i].preview,
        'accessory': productList[i].isAccessory
    }
    orderitem.push(proObj)
}
var datalist ={
    amount: grandTotal,
    products:orderitem
}
$.post('https://5ee248c68b27f30016094891.mockapi.io/order', datalist, function(){
   localStorage.setItem('productlist', []);
    location.assign('./thankyou.html');
})
})
})