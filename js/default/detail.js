$(document).ready(function() {   
var source = location.href.split('source=')[1];
var url = 'https://5ee248c68b27f30016094891.mockapi.io/homepagedata/'+ source;
currentObj = null;

createProductimg = (url, pos) =>{
    
var image  = $('<img>');
image.attr('src', url);

if(pos === 0) {
    image .addClass('active-image');
}
image.click(function() {
   $('#product-images img').removeClass("active-image")
    image.addClass("active-image");
    $('#product-preview').attr('src', url);
  });
  
return image ;

}
$.get(url , function(responsedetails){
    currentObj = responsedetails;
    $('#product-preview').attr('src', responsedetails.preview).addClass('smalll')
    $('#productlink').attr('href', responsedetails.preview)
    $('#product-title').text(responsedetails.name)
    $('#product-brand').text(responsedetails.brand)
    $('#product-price').text(responsedetails.price)
    $('#description').text(responsedetails.description)
    for(i=0; i<responsedetails.photos.length; i++){
       $('#product-images').append(createProductimg(responsedetails.photos[i],i))
    } 
     
})

$("#btn-add-to-cart").click(function(){
    if(localStorage.getItem('productlist') === null || localStorage.getItem('productlist') === ''){
        localStorage.setItem('productlist', JSON.stringify([]));
    }
    
    var productList = JSON.parse(window.localStorage.getItem('productlist'));
    var findposAt = -1;
    for(i=0; i<productList.length; i++){
        if(parseInt(productList[i].id) == parseInt(currentObj.id)){
            findposAt=i
        }
    }
    
    if(findposAt>-1){
        productList[findposAt].count = productList[findposAt].count+1;
        console.log(productList[findposAt].count);
        productList[findposAt].quantity =   productList[findposAt].count;
        productList[findposAt].totalPrice = parseFloat(currentObj.price) * parseFloat(productList[findposAt].quantity);
        window.localStorage.setItem('productlist', JSON.stringify(productList));
    } else{  
        currentObj.count = 1;
        currentObj.quantity =  1;
        currentObj.totalPrice = currentObj.price;
        
        productList.push(currentObj);
        window.localStorage.setItem('productlist', JSON.stringify(productList))
    }

    calculateTotalQuantity();
})

})