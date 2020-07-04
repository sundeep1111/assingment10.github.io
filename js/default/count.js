function calculateTotalQuantity() {
    var totalcount = 0;
    var productList = JSON.parse(window.localStorage.getItem('productlist'));

    for(let i=0; i<productList.length; i++){
        totalcount = totalcount + productList[i].quantity;
    }

    $('.cart_quantity').html(totalcount);
    $('#item-count').html(totalcount);
   
    return totalcount;
}


$(document).ready(function() {
    calculateTotalQuantity();
})
