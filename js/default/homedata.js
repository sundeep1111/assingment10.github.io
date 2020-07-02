var Clothing_Data = $('#Clothing_Data')
var accessories_men_women = $('#accessories_men_women')
var url = 'https://5ee248c68b27f30016094891.mockapi.io/homepagedata';
var databackarry = []

renderCard = (data)=>{
   var mainRow = $('<div>').addClass('col-12 col-sm-6 col-md-4 col-lg-3 mb-3');
   mainRow.attr('id', data.id, );
   var single_product_area =$('<div>').addClass('single-product-area mb-0');
   $(mainRow).append(single_product_area);
   var dropsw = $('<div>').addClass('dropsw')
   $(single_product_area).append(dropsw);
   var product_image = $('<div>').addClass('product_image apparels_offer_area');
   $(dropsw).append(product_image);
   var link = $('<a>').addClass('normal_img').attr('href', "detail.html?source=" + data.id);
   $(product_image).append(link);
   var img = $('<img>').addClass('normal_img').attr('src', data.preview);
  $(link).append(img);
   var product_description = $('<div>').addClass('product_description');
   $(dropsw).append(product_description);
   var h4 = $('<h4>').text(data.name)
   $(product_description).append(h4);
   var h5 = $('<h5>').text(data.brand)
   $(product_description).append(h5);
   var p = $('<p>').addClass('ptxt').text(data.price)
   $(product_description).append(p);
  
return mainRow
}


$.get(url,(response)=> {
    for(var i=0; i<response.length; i++) {
        
        if(response[i].isAccessory) {
            $(accessories_men_women).append(renderCard(response[i]))
           } else {
            $(Clothing_Data).append(renderCard(response[i]))
        }
      }
})
