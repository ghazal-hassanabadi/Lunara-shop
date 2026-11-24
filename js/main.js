import { initCart } from "./cart.js";
import { products } from "./products.js";
import { renderProducts } from "./render.js";

const list = document.querySelector("#products-list");

if (list) {
  const limit = Number(list.dataset.limit) || products.length;
  renderProducts(list, products.slice(0, limit));
}

initCart();