'use strict';

//Constantes
const shoppingCart = document.querySelector('.js-shopping-cart');
const productsList = document.querySelector('.js-products-list');
const input = document.querySelector('.js-input');
const btnFind = document.querySelector('.js-btn-find');
const url = 'https://fakestoreapi.com/products';

//Variables
let products = [];

//Funciones 
function renderProducts (products) {
    productsList.innerHTML = '';
    for (let product of products) {
    productsList.innerHTML += `<li class='product'>
    <img class='img-products-list'src=${product.image}>
    <h2 class='product-title'>${product.title}</h2>
    <p class='product-price'>${product.price}€</p>
    <button class='btn-purchase'>Purchase</button>
    </li>`
}
const btnPurchase = document.querySelector('.btn-purchase');
}

renderProducts(products);

//Funciones manejadoras
function handleClickFind(event) {
    event.preventDefault();
    const inputSearch = input.value;
    const inputProducts = products.filter(product => product.title.toLowerCase().includes(inputSearch.toLowerCase()));
    renderProducts(inputProducts);
}

function handleClickPurchase(event) {
    const btnPurchaseClick = btnPurchase;
    btnPurchase.classList.toggle('btn-purchase-click');
    btnPurchase.innerHTML = 'Delete';
}


//Eventos
btnFind.addEventListener('click', handleClickFind);
btnPurchase.addEventListener('click', handleClickPurchase);

//Llamadas al servidor
fetch(url)
    .then(response => response.json())
    .then(data => {
        products = data;
        renderProducts(products);
        
    })
