import { initMenu } from "./menu.js";
import { initSlider } from "./slider.js";
import { initCart } from "./cart.js";
import { initCartDrawer } from "./cart-drawer.js";
import { initSearch } from "./search.js";
import { products } from "./products.js";
import { renderProducts } from "./render.js";



const list = document.querySelector("#products-list");

if (list) {
  const limit = Number(list.dataset.limit) || products.length;
  renderProducts(list, products.slice(0, limit));
}


initMenu();
initSlider();
initSearch();
initCart();
initCartDrawer();