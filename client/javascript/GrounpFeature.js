$(document).ready(function() {
  $.ajax({
      type:"GET",
      url: "http://localhost:3000/api/category/list",
      success: function(data){
        let inHTML = " ";
        data.forEach(function(item,index){
           if(index < 8){
            inHTML += `
            <div class="container-grounpfreature">
            <div class="title-grounpfeature" style=" background: linear-gradient(to left top, rgb(244, 248, 136), green);">
                   <h3 class="fs-4  text-uppercase">${item.name}</h3>
                 </div>
            <div class="row pb-2 px-3 grounp-category" data=${item.category_id}>
            
              
            </div>
          </div>
          <div class=" see-more-container my-2">
            <div class="see-more-grounpfeature">
              <a href="#"> Xem thêm sản phẩm...</a>
            </div>
          </div>
            `
           }
        });
        // console.log(inHTML);
        $(".myGrounpFeature1").html(inHTML);
        // -------------------------------------------------------------------------------------------
        // add sản phẩm vào trong category-------------------------------------------------------------------------------------------
        const categr = $(".grounp-category");
         for(let i = 0; i < 8; i++) {
          let category_id = $(categr[i]).attr("data");
          let textTO = " ";
          $.ajax({
            type: "GET",
            url: `http://localhost:3000/api/category/${category_id}`,
            success: function(data){
                let textHTML = " ";
                data.products.forEach(function(i){
                  textHTML = ` 
                  <div class="col-md-3 col-sm-6 col-6 p-0 ">
                  <div class="product-box">
                    <div class="product-inner-box position-relative">
                      <div class="icons position-absolute">
                        <a href="#" class="text-decoration-none"><i class="fa-solid fa-eye"></i></a>
                        <a href="#" class="text-decoration-none"><i class="fa-solid fa-cart-plus"></i></a>
                      </div>
                      <div class="onsale position-absolute top-0 start-0">
                        <span class="badge rounded-0"><i class="fa-solid fa-arrow-down"></i> 45%</span>
                      </div>
                      <div class="product-img">
                        <img src="http://localhost:3000/img/products/${i.img}" alt="woodan chair" class="img-fluid">
                      </div>
                      <div class="cart-btn">
                        <button class="btn btn-white bg-white shadow-sm rounded-pill" data3="${i.product_id}" data2="${i.name}" data="${data.category_id}"><i class="fa-solid fa-cart-shopping"></i>Mua Ngay</button>
                      </div>
                    </div>
                    <div class="product-info">
                      <div class="product-name">
                        <h3>${i.name}</h3>
                      </div>
                      <div class="product-price">
                        <span>${i.price} </span>đ
                      </div>
                    </div>
                  </div>
                  </div> 
                  `
                  textTO += textHTML;
                });
                categr[i].innerHTML = textTO;
                
                // -------------------------------------------------------------------------------------------------------
                // click add cart------------------------------------------------------------------------------------------
                let textCard =" ";
                $(".cart-btn button").click(function () {
                  let cate_id = $(this).attr("data");
                  let Nameproduct = $(this).attr("data2");
                  let product_id_data= $(this).attr("data3");
                  console.log(cate_id);
                   
                  // console.log(`http://localhost:3000/api/product/${product_id}`);
                  $.ajax({
                    method: "get",
                    url: `http://localhost:3000/api/category/${cate_id}`,
                    success: function(data) {
                      console.log(data);
                      if(i == 1){
                        data.products.forEach(function(item) {
                          let html12 = " ";
                          if(item.product_id == product_id_data){
                             html12 = `
                            <tr> 
                            <td data-th="Sản Phẩm" class="my-3"> 
                             <div class="row"> 
                              <div class="col-sm-4 hidden-md"><img src="http://localhost:3000/img/products/${item.img}" alt="Sản phẩm 1" class="img-responsive" width="100">
                              </div> 
                              <div class="col-sm-8 fs-6"> 
                               <h4 class="nomargin fs-6">${item.name}</h4> 
                               <p>Nhập khẩu trực tiếp từ ${item.make_in}</p> 
                              </div> 
                             </div> 
                            </td> 
                            <td data-th="Giá">${item.price} đ</td> 
                            <td data-th="Số lượng">
                             <div class="number_card">
                               <span class="minus_card"><i class="fa-solid fa-minus"></i></span>
                               <input type="text" value="1" min="1"/>
                               <span class="plus_card"><i class="fa-solid fa-plus"></i></span>
                             </div>
                            </td> 
                            <td data-th="Tổng tiền" class="text-center">${item.price} đ</td> 
                            <td class="actions" data-th="">
                             <button class="btn btn-info btn-sm"><i class="fa fa-edit"></i>
                             </button> 
                             <button class="btn btn-danger btn-sm text-black btn-remove-card" data2="${item.name}" data="${item.product_id}"><i class="fa-solid fa-trash"></i>
                             </button>
                            </td> 
                           </tr>                             
                            `;
                          }
                          textCard += html12;
                          $(".add-card-product").html(textCard);
                        })
                        alert(`Sản phẩm ${Nameproduct} đã được thêm vào giỏ hàng !`);
                        // ----------------------------------------------------------------------------------------------------------
                         // Remove-card ----------------------------------------------------------------------------------------------------------

                        $(".btn-remove-card").click(function () {
                          let product_id = $(this).parent();
                          let textNamesp = $(this).attr("data2")
                          product_id.parent().remove();    
                          alert(`Đã xóa sản phẩm ${textNamesp} khỏi giỏ hàng !`)                
                        });
                      }
                      // alert("Sản phẩm đã được thêm vào giỏ hàng")
                     
                    }
                  });
                });
              }
            })
         }
      }
    })
  });








  // grounpcategory_2-------------------------------------------------------------------------------------------------
  //----------------------------------------dat---------------------------------------------------------------------------
  $(document).ready(function() {
    $.ajax({
        type:"GET",
        url: "http://localhost:3000/api/category/list",
        success: function(data){
          let inHTML = " ";
          data.forEach(function(item,index){
             if(index > 7){
              inHTML += `
              <div class="container-grounpfreature-2">
              <div class="title-grounpfeature-2">
                  <div class="heart-grounpfeature-2"></div>
                  <h3 class="fs-4 text-uppercase">${item.name}</h3>
              </div>
              <div class="row pb-2 px-3 grounp-category2" data=${item.category_id}>
              
                
              </div>
            </div>
            <div class=" see-more-container my-2">
              <div class="see-more-grounpfeature">
                <a href="#"> Xem thêm sản phẩm...</a>
              </div>
            </div>
              `
             }
          });
          // console.log(inHTML);
          $(".myGrounpFeature").html(inHTML);

          const categr2 = $(".grounp-category2");
           for(let i = 0; i < 6; i++) {
            // console.log(categr2[i]);
            
              let category_id = $(categr2[i]).attr("data");
              let textTO = " ";
            $.ajax({
              type: "GET",
              url: `http://localhost:3000/api/category/${category_id}`,
              success: function(data){
                  let textHTML =" ";
                  data.products.forEach(function(i,index1){
                    // console.log(i);
                      textHTML = ` 
                      <div class="col-md-3 col-sm-6 col-6 p-0 ">
                      <div class="product-box">
                        <div class="product-inner-box position-relative">
                          <div class="icons position-absolute">
                            <a href="#" class="text-decoration-none"><i class="fa-solid fa-eye"></i></a>
                            <a href="#" class="text-decoration-none"><i class="fa-solid fa-cart-plus"></i></a>
                          </div>
                          <div class="onsale position-absolute top-0 start-0">
                            <span class="badge rounded-0"><i class="fa-solid fa-arrow-down"></i> 45%</span>
                          </div>
                          <div class="product-img">
                            <img src="http://localhost:3000/img/products/${i.img}" alt="woodan chair" class="img-fluid">
                          </div>
                          <div class="cart-btn">
                            <button class="btn btn-white bg-white shadow-sm rounded-pill" data="${i.product_id}"><i class="fa-solid fa-cart-shopping"></i>Mua Ngay</button>
                          </div>
                        </div>
                        <div class="product-info">
                          <div class="product-name">
                            <h3>${i.name}</h3>
                          </div>
                          <div class="product-price">
                            <span>${i.price} </span>đ
                          </div>
                        </div>
                      </div>
                      </div> 
                      `
                      textTO += textHTML;
                    
                  });
                  categr2[i].innerHTML = textTO;
                }
              })
            
           }
  
        }
      })
    });