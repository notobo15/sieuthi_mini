const cardElement = document.querySelector(`.icon-card`);
const modalcard = document.querySelector(`.modal_card`);
const closecard = document.querySelector(`.icon-close-card`);
cardElement.addEventListener('click',function(e){
     modalcard.style.display = 'block';
});
closecard.addEventListener('click',function(e){
    modalcard.style.display = 'none';
});
$(document).ready(function() {
    $('.minus_card').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus_card').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
});