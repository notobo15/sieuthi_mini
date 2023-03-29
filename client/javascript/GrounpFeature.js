$(document).ready(function() {
  $.ajax({
      type:"GET",
      url: "http://localhost:3000/api/category/list",
      success: function(data){
        let inHTML = " ";
        data.forEach(function(item,index){
          console.log(index);

           if(index <= 7){
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
        const categr = $(".grounp-category");
         for(let i = 0; i < 8; i++) {
          let category_id = $(categr[i]).attr("data");
          let textTO = " ";
          $.ajax({
            type: "GET",
            url: `http://localhost:3000/api/category/${category_id}`,
            success: function(data){
                let textHTML =" ";
                data.products.forEach(function(i){
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
                categr[i].innerHTML = textTO;
              }
            })
         }

      }
    })
  });
  // grounpcategory_2-------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------
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
            console.log(categr2[i]);
            
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