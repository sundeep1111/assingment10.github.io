$(document).ready(function() {
    var productList = window.localStorage.getItem('productlist');
    productList = productList === null || productList === '' ? [] : productList;
    productList = productList.length > 0 ? JSON.parse(productList) : [];

    var totalcount = 0;
for(i=0; i<productList.length; i++){
    totalcount = totalcount + productList[i].count;
}
$('.cart_quantity').html(totalcount);
})