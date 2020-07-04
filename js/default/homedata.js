var Clothing_Data = $('#Clothing_Data')
var accessories_men_women = $('#accessories_men_women')
var url = 'https://5ee248c68b27f30016094891.mockapi.io/homepagedata';
var databackarry = []
 $('#search-box').on(({
     input:function(){
       var enterval = $(this).val()
      // $('#info-content').css('display', 'none')
       enterval = enterval.toLowerCase();
       console.log(enterval)
       var serachresult =[]
       for(i=0;i<databackarry.length; i++){
        var firstName = databackarry[i].name;
        firstName = firstName.toLowerCase();
         if(firstName.includes(enterval)){
          //console.log(databackarry[i])
         serachresult.push(databackarry[i])
         }
       }
      // console.log(serachresult)
       rendertable(serachresult)
     }
   }))
renderCard = (data)=>{
   var mainRow = $('<div>').addClass('col-12 col-sm-6 col-md-4 col-lg-3 mb-3');
   mainRow.attr('id', data.id, );
   var single_product_area =$('<div>').addClass('single-product-area  mb-0');
   $(mainRow).append(single_product_area);
   var dropsw = $('<div>').addClass('dropsw')
   $(single_product_area).append(dropsw);
   var product_image = $('<div>').addClass('product_image apparels_offer_area');
   $(dropsw).append(product_image);
   var link = $('<a>').addClass('normal_img');
   $(product_image).append(link);
   var img = $('<img>').addClass('normal_img').attr('src', data.preview);
   $(link).append(img);
   var product_badge = $('<div>').addClass('product_badge');
   var span = $('<span>');
   span.text('top');
   $(product_badge).append(span);
   $(product_image).append(product_badge);

   var product_wishlist = $('<div>').addClass('product_wishlist');
   var alinkicon = $('<a>').attr('href', "#");
   var alinki = $('<i>').addClass('icofont-heart posrel');
   $(alinkicon).append(alinki);
   $(product_wishlist).append(alinkicon);
   $(product_image).append(product_wishlist);

   var product_compare = $('<div>').addClass('product_compare');
   var alinkiconexc = $('<a>').attr('href', "#");
   var alinkiexc = $('<i>').addClass('icofont-exchange posrel');
   $(alinkiconexc).append(alinkiexc);
   $(product_compare).append(alinkiconexc);
   $(product_image).append(product_compare);

   var product_description = $('<div>').addClass('product_description');
   $(dropsw).append(product_description);
   var h4 = $('<h4>').text(data.name)
   $(product_description).append(h4);
   var h5 = $('<h5>').text(data.brand)
   $(product_description).append(h5);
   var p = $('<p>').addClass('ptxt').text('Rs'+ data.price)
   $(product_description).append(p);
   var product_add_to_cart = $('<div>').addClass('product_add_to_cart');
   var alinkcart =$('<a>').attr('href', "detail.html?source=" + data.id).text(' Add to Cart').addClass('fontsz');
   alinkcart.text(' Quick View');
   var alinkiexccart = $('<i>').addClass('icofont-cart ml-2');
   $(alinkcart).append(alinkiexccart);
   $(product_add_to_cart).append(alinkcart);
   $(product_description).append(product_add_to_cart);
return mainRow
}

function rendertable(dataarry){
    Clothing_Data.html('');
    accessories_men_women.html('');
   for(i=0; i<dataarry.length; i++){
    var aceMW = 1; var clothing = 1;
    for(var i=0; i<dataarry.length; i++) {
    	if(dataarry[i].isAccessory) {
    		if (aceMW < 5) {
    			$(accessories_men_women).append(renderCard(dataarry[i]));
    		}
            
    		aceMW++;
    	} else {
    		if (clothing < 5) {
    			$(Clothing_Data).append(renderCard(dataarry[i]));
    		}
            
    		clothing++;
    	}
    }
    }
  }
  
$.get(url, function(response){
 databackarry = response;
 rendertable(databackarry);
//console.log(rendertable(databackarry))
})

// $.get(url,(response)=> {
//   //  var aceMW,clothing = 1;
//   var aceMW = 1; var clothing = 1;
// for(var i=0; i<response.length; i++) {
// 	if(response[i].isAccessory) {
// 		if (aceMW < 5) {
// 			$(accessories_men_women).append(renderCard(response[i]));
// 		}
		
// 		aceMW++;
// 	} else {
// 		if (clothing < 5) {
// 			$(Clothing_Data).append(renderCard(response[i]));
// 		}
		
// 		clothing++;
// 	}
// }
// $('.fontsz').on('click',function(){
//     $('.modal-body').load("detail.html?source=" + data.id ,function(){
//         $('#myModal').modal({show:true});
//     });
 //});
    
//})