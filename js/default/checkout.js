$(document).ready(function() {
var checkoutdata = $('#checkoutdata');
databackarry = []
  // var currentrow = 0
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
function createdatarow(data, index){
    let datacount = data.quantity;
    var mainRow = $("<tr data-key='"+index+"'>").addClass('data-row');
    var td = $('<td>')
    var img = $('<img>').addClass('checkout-product-img').attr('src', data.preview);
    var tdname =$('<td>').text(data.name);
    var tdQcount =$('<td>').text(parseInt(data.price));
    var tdcount =$('<td>').addClass('text-center');
    let countdv = $('<div>').text(datacount)
    tdcount.append(countdv);
    let divinc = $('<div>').text('+').attr('id', 'increment')
    tdcount.append(divinc)
    let divdec = $('<div>').text('-').addClass('decrement')
    tdcount.append(divdec)
    let tdtotal =$('<td>').text(parseInt(data.totalPrice));
    let tddel =$('<td>').addClass('text-center');
    let dlt = $('<i>').addClass('fa fa-trash');
   
    dlt.on('click', function(){
        var selectCard = document.getElementById(data.id)
    var sortedList = productList;
    
    var removepost = -1
     for(let i=0; i<sortedList.length; i++){
        console.log(sortedList[i].id, data.id)
        if(sortedList[i].id === data.id){
            removepost =i;
            break;
        }
      }
      
     sortedList.splice(removepost,1)
    localStorage.setItem('productlist', JSON.stringify(sortedList))
    mainRow.remove()
    calculateTotalQuantity();
    var grandTotal = calculateGrandTotal(); 
    $('#total-count').html(grandTotal);
    })
    $(tddel).append(dlt)
    divinc.on("click",function(){
        if(datacount < 40){
            var currentIndex = $(this).closest('tr').data('key');
            var productLIst = JSON.parse(window.localStorage.getItem('productlist'));

            datacount++
            countdv.text(datacount);
            var totalPrice = parseInt(datacount) * parseInt(data.price);
            tdtotal.text(totalPrice);
            
            productLIst[currentIndex]['quantity'] = datacount;
            productLIst[currentIndex]['totalPrice'] = totalPrice;

            localStorage.setItem('productlist', JSON.stringify(productLIst));
            var grandTotal = calculateGrandTotal(); 
            $('#total-count').html(grandTotal);

            calculateTotalQuantity();
        }
        
    })
    divdec.on("click",function(){
        if(datacount>1){
            var currentIndex = $(this).closest('tr').data('key');
            var productLIst = JSON.parse(window.localStorage.getItem('productlist'));

            datacount--
            countdv.text(datacount)
            var totalPrice = parseInt(datacount) * parseInt(data.price);
            tdtotal.text(totalPrice);

            productLIst[currentIndex]['quantity'] = datacount;
            productLIst[currentIndex]['totalPrice'] = totalPrice;

            localStorage.setItem('productlist', JSON.stringify(productLIst));
            var grandTotal = calculateGrandTotal(); 

            $('#total-count').html(grandTotal);

            calculateTotalQuantity();

        }
    })

    $(td).append(img);
    $(mainRow).append(td);
    $(mainRow).append(tdname);
    $(mainRow).append(tdQcount);
    $(mainRow).append(tdcount);
    $(mainRow).append(tdtotal);
    $(mainRow).append(tddel);
    
   return mainRow
  
}
//var productList = JSON.parse(window.localStorage.getItem('productlist'));

function calculateGrandTotal() {
    var productList = JSON.parse(window.localStorage.getItem('productlist'));
    var grandTotal = 0;
    var parentCnt = {};
    $("#checkoutdata").html("");

    for(i=0; i<productList.length; i++){
        
        var currentIndex = 1 + i;
        var content = createdatarow(productList[i], i);
        
        $("#checkoutdata").append(content);
        
        //var totalforcurrentproduct = parseFloat(productList[i].count) * parseFloat(productList[i].price);
        grandTotal = grandTotal + parseFloat(productList[i].totalPrice);
    }
 
    return grandTotal;
}
var grandTotal = calculateGrandTotal();
var productList = JSON.parse(window.localStorage.getItem('productlist'));
console.log(calculateGrandTotal(databackarry))
calculateTotalQuantity();
$('#total-count').html(grandTotal);

$('#placeorder').click( function(){
var orderitem=[]
for(var i=0; i<productList.length; i++){
    var proObj = {
        "id" : productList[i].id,
        'name': productList[i].name,
        'price': productList[i].price,
        'preview': productList[i].preview,
        'accessory': productList[i].isAccessory,
        'totalprice':productList[i].totalPrice
    }
    orderitem.push(proObj)
}
var datalist ={
    amount: grandTotal,
    products:orderitem
}
databackarry = productList;
calculateGrandTotal(databackarry);
$.post('https://5ee248c68b27f30016094891.mockapi.io/order', datalist, function(){
   localStorage.setItem('productlist', []);
    location.assign('./thankyou.html');
})
})
function rendertable(dataarry){
    checkoutdata.html('');
   for(i=0; i<dataarry.length; i++){
     $(checkoutdata).append(createdatarow(dataarry[i]));
    }
  }
  

})