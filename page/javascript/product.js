const cards = document.querySelectorAll( `.product-box`);
[...cards].forEach((card) => {
    card.addEventListener('mouseover',function(){
        card.classList.add(`is-hover`);
    })
    card.addEventListener('mouseleave',function(){
        card.classList.remove(`is-hover`);
    })
})
// $(document).ready(function(){
//     $(".card-link").click(function(){
//         $(".rounded").attr("src",$(this).parent().siblings().attr("Src"));
//         $(".product_name").text($(this).siblings("h3").text());
//         $(".prpduct-desc").text($(this).siblings("div").find("p:nth(0").text());
//         $(".product_price").text($(this).siblings("div").find("p:nth(1)").text());
//     });
// $(window).resize(function(){
//     if($(window).width() <600) 
//    {
//      $(".modal-content").css("transform", "scaleX(1)");
//     }
//     else {
//         $(".modal-content").css("transform", "scaleX(1.4)");
//     }
// });
// })