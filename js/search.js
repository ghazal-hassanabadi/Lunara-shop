import { products } from "./products.js";
import { renderProducts } from "./render.js";
import { debounce } from "./debounce.js";

export function initSearch() {
  const input = document.querySelector("#search");
  const list = document.querySelector("#products-list");

  
  if (!input || !list?.dataset.limit) return;

  input.closest("form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const q = input.value.trim();
    window.location.href = q
      ? `product.html?q=${encodeURIComponent(q)}`
      : "product.html";
  });
}