'use strict';

//Constantes
const shoppingCart = document.querySelector('.js-shopping-cart');
const productsList = document.querySelector('.js-products-list');
const input = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const url = 'https://fakestoreapi.com/products';

//Variables
let products = [];

//Funciones 
function renderProducts (products) {

    for (let product of products) {
    productsList.innerHTML += `<li class='product'>
    <img class='img-products-list'src=${product.image}>
    <h2 class='product-title'>${product.title}</h2>
    <p class='product-price'>${product.price}€</p>
    <button class='btn-purchase'>Purchase</button>
    </li>`
}
}

renderProducts(products);


//Funciones manejadoras

//Eventos

//Llamadas al servidor

fetch(url)
    .then(response => response.json())
    .then(data => {
        products = data;
        renderProducts(products);
        
    })
