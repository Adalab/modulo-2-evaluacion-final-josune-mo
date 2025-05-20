const l=document.querySelector(".js-shopping-cart"),a=document.querySelector(".js-products-list"),p=document.querySelector(".js-input"),f=document.querySelector(".js-btn-find"),h="https://fakestoreapi.com/products";let s=[],c=[];JSON.parse(localStorage.getItem("shoppingCart"))&&(c=JSON.parse(localStorage.getItem("shoppingCart")));r();function u(e){a.innerHTML="";for(let n of e)a.innerHTML+=`<li class='product'>
    <img class='img-products-list'src=${n.image}>
    <h2 class='product-title'>${n.title}</h2>
    <p class='product-price'>${n.price}€</p>
    <button class='btn-add' id='${n.id}'>Add</button>
    </li>`;const t=document.querySelectorAll(".btn-add");for(let n of t)n.addEventListener("click",g)}function r(){l.innerHTML="";for(let t of c)l.innerHTML+=`<li class='product'>
    <img class='img-products-list'src=${t.image}>
    <h2 class='product-title'>${t.title}</h2>
    <p class='product-price'>${t.price}€</p>
    <button class='btn-delete' id='${t.id}'>❌</button>
    </li>`;const e=document.querySelectorAll(".btn-delete");for(let t of e)t.addEventListener("click",m),i()}function i(){const e=document.querySelectorAll(".btn-add");for(let t of e){const n=parseInt(t.id);c.some(d=>d.id===n)?(t.classList.add("btn-add-click"),t.innerHTML="Delete"):(t.classList.remove("btn-add-click"),t.innerHTML="Add")}}function b(e){e.preventDefault();const t=p.value,n=s.filter(o=>o.title.toLowerCase().includes(t.toLowerCase()));u(n)}function g(e){const t=parseInt(e.target.id);if(!c.some(o=>o.id===t)){const o=s.find(d=>d.id===t);c.push(o),localStorage.setItem("shoppingCart",JSON.stringify(c)),r(),i()}}function m(e){const t=parseInt(e.target.id),n=c.filter(o=>o.id===t);c.shift(n),localStorage.setItem("shoppingCart",JSON.stringify(c)),r(),i()}f.addEventListener("click",b);fetch(h).then(e=>e.json()).then(e=>{s=e,u(s)});
//# sourceMappingURL=main.js.map
