"use strict";

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
if (JSON.parse(localStorage.getItem("shoppingCart"))) {
  cart = JSON.parse(localStorage.getItem("shoppingCart"));
}
renderCart();

//Funciones
function renderProducts(products) {
  productsList.innerHTML = "";
  for (let product of products) {
    productsList.innerHTML += `<li class='product'>
    <img class='img-products-list'src=${product.image}>
    <h2 class='product-title'>${product.title}</h2>
    <p class='product-price'>${product.price}€</p>
    <button class='btn-add' id='${product.id}'>Add</button>
    </li>`;
  }
  const btnsAdd = document.querySelectorAll(".btn-add");
  for (let btnAdd of btnsAdd) {
    btnAdd.addEventListener("click", handleClickAdd);
  }
}

function renderCart() {
  shoppingCart.innerHTML = "";
  for (let productInCart of cart) {
    shoppingCart.innerHTML += `<li class='product'>
    <img class='img-products-list'src=${productInCart.image}>
    <h2 class='product-title'>${productInCart.title}</h2>
    <p class='product-price'>${productInCart.price}€</p>
    <button class='btn-delete' id='${productInCart.id}'>❌</button>
    </li>`;
  }
  const btnsDelete = document.querySelectorAll(".btn-delete");
  for (let btnDelete of btnsDelete) {
    btnDelete.addEventListener("click", handleClickDelete);
    btnAddDelete();
  }
}

function btnAddDelete() {
  const btnAddClick = document.querySelectorAll(".btn-add");
  for (let btnAdd of btnAddClick) {
    const btnAddClickId = parseInt(btnAdd.id);
    const atLeastOneProductMatches = cart.some(
      (product) => product.id === btnAddClickId
    );
    if (atLeastOneProductMatches) {
      btnAdd.classList.add("btn-add-click");
      btnAdd.innerHTML = "Delete";
    } else {
      btnAdd.classList.remove("btn-add-click");
      btnAdd.innerHTML = "Add";
    }
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

function handleClickAdd(event) {
  const btnAddClickId = parseInt(event.target.id);
  const noProductMatches = !cart.some(
    (product) => product.id === btnAddClickId
  );
  if (noProductMatches) {
    const productToAdd = products.find(
      (product) => product.id === btnAddClickId
    );
    cart.push(productToAdd);
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    renderCart();
    btnAddDelete();
  }
}

function handleClickDelete(event) {
  const btnDeleteClickId = parseInt(event.target.id);
  const productToDelete = cart.filter(
    (product) => product.id === btnDeleteClickId
  );
  cart.shift(productToDelete);
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  renderCart();
  btnAddDelete();
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
