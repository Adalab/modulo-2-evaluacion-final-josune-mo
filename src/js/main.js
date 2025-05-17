'use strict';

//Constantes
const shoppingCart = document.querySelector(".js-shopping-cart");
const productsList = document.querySelector(".js-products-list");
const input = document.querySelector(".js-input");
const btnFind = document.querySelector(".js-btn-find");
const url = "https://fakestoreapi.com/products";

//Variables
let products = [];
let cart = [];

//Local Storage
if (JSON.parse(localStorage.getItem('shoppingCart'))) {
  cart = JSON.parse(localStorage.getItem('shoppingCart'));
}
renderCart();

//Funciones
function renderProducts(products) {
  productsList.innerHTML = '';
  for (let product of products) {
    productsList.innerHTML += `<li class='product'>
    <img class='img-products-list'src=${product.image}>
    <h2 class='product-title'>${product.title}</h2>
    <p class='product-price'>${product.price}€</p>
    <button class='btn-purchase' id='${product.id}'>Purchase</button>
    </li>`;
  }
  const btnsPurchase = document.querySelectorAll(".btn-purchase");
  for (let btnPurchase of btnsPurchase) {
    btnPurchase.addEventListener("click", handleClickPurchase);
  }
}

function renderCart() {
  shoppingCart.innerHTML = '';
  for (let productInCart of cart) {
    shoppingCart.innerHTML += `<li class='product'>
    <img class='img-products-list'src=${productInCart.image}>
    <h2 class='product-title'>${productInCart.title}</h2>
    <p class='product-price'>${productInCart.price}€</p>
    </li>`;
  }
}

//Funciones manejadoras
function handleClickFind(event) {
  event.preventDefault();
  const inputSearch = input.value;
  const inputProducts = products.filter((product) =>
    product.title.toLowerCase().includes(inputSearch.toLowerCase())
  );
  renderProducts(inputProducts);
}

function handleClickPurchase(event) {
  const btnPurchaseClick = event.target;
  const btnPurchaseClickId = parseInt(event.target.id);
  btnPurchaseClick.classList.add("btn-purchase-click");
  btnPurchaseClick.innerHTML = "Delete";
  const productToAdd = products.find(
    (product) => product.id === btnPurchaseClickId
  );
  cart.push(productToAdd);
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
  renderCart();
}

//Eventos
btnFind.addEventListener("click", handleClickFind);

//Llamadas al servidor
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    products = data;
    renderProducts(products);
  });
