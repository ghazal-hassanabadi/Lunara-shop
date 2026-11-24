import { products } from "./products.js";
import { renderProducts } from "./render.js";

export function initSearch() {
  const input = document.querySelector("#search");
  if (!input) return;

  const form = input.closest("form");
  const list = document.querySelector("#products-list");
  const emptyMessage = document.querySelector("#empty-message");
  const isShopPage = list && !list.dataset.limit;

  function showResults(text) {
    const query = text.trim().toLowerCase();
    const result = products.filter((p) => p.name.toLowerCase().includes(query));

    renderProducts(list, result);
    emptyMessage?.classList.toggle("hidden", result.length > 0);
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!isShopPage) {
      const q = input.value.trim();
      window.location.href = q
        ? `product.html?q=${encodeURIComponent(q)}`
        : "product.html";
    }
  });

  if (isShopPage) {
    input.addEventListener("input", () => showResults(input.value));

    const q = new URLSearchParams(window.location.search).get("q");
    if (q) {
      input.value = q;
      showResults(q);
    }
  }
}