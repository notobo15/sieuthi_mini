const cardElement = document.querySelector(`.icon-card`);
const modalcard = document.querySelector(`.modal_card`);
const closecard = document.querySelector(`.icon-close-card`);
cardElement.addEventListener('click',function(e){
     modalcard.style.display = 'block';
});
closecard.addEventListener('click',function(e){
    modalcard.style.display = 'none';
});