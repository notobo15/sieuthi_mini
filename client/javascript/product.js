$(document).ready(function() {
    $.ajax({
        type:"GET",
        url: "http://localhost:3000/api/product/list",
        success: function(data){
            html = "";
            data.forEach(function(item,index){
               if(index < 16){
                html += `
                <div class="col-md-3 col-sm-6 col-6 p-0 ">
                     <div class="product-box">
                       <div class="product-inner-box position-relative">
                         <div class="icons position-absolute">
                           <a href="#" data="${item.product_id}" class="text-decoration-none"data-toggle="modal" data-target="#modalId"><i class="fa-solid fa-eye"></i></a>
                           <a href="#" class="text-decoration-none"><i class="fa-solid fa-cart-plus"></i></a>
                         </div>
                         <div class="onsale position-absolute top-0 start-0">
                           <span class="badge rounded-0"><i class="fa-solid fa-arrow-down"></i> 45%</span>
                         </div>
                         <div class="product-img">
                           <img src="http://localhost:3000/img/products/${item.img}" alt="woodan chair" class="img-fluid">
                         </div>
                         <div class="cart-btn">
                           <button data=${item.product_id} class="btn btn-white bg-white shadow-sm rounded-pill"><i class="fa-solid fa-cart-shopping"></i>Mua Ngay</button>
                         </div>
                       </div>
                       <div class="product-info">
                         <div class="product-name">
                           <h3>${item.name}</h3>
                         </div>
                         <div class="product-price">
                           <span>${item.price}</span>đ
                         </div>
                       </div>
                     </div>
                     </div>
                `
               }
            });
            $(".product-list").html(html);
        }
    })

});
