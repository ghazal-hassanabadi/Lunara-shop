import { products } from "./products.js";
import { renderProducts } from "./render.js";
import { debounce } from "./debounce.js";

export function initFilter() {
  const form = document.querySelector("#filter-form");
  const list = document.querySelector("#products-list");
  if (!form || !list) return;

  const searchInput = document.querySelector("#search");
  const searchForm = searchInput?.closest("form");
  const emptyMessage = document.querySelector("#empty-message");
  const toggle = document.querySelector("#filter-toggle");
  const panel = document.querySelector("#filters");

  function getFilters() {
    const data = new FormData(form);
    let min = Number(data.get("min")) || 0;
    let max = Number(data.get("max")) || Infinity;
    if (min > max) [min, max] = [max, min]; 

    return {
      query: searchInput ? searchInput.value.trim().toLowerCase() : "",
      categories: data.getAll("category"),
      min,
      max,
      onlyDiscount: data.has("discount"),
    };
  }

  function apply() {
    const { query, categories, min, max, onlyDiscount } = getFilters();

    const result = products.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query)) return false;
      if (categories.length && !categories.includes(p.category)) return false;
      if (p.price < min || p.price > max) return false;
      if (onlyDiscount && !p.discount) return false;
      return true;
    });

    renderProducts(list, result);
    emptyMessage?.classList.toggle("hidden", result.length > 0);
  }


  form.addEventListener("change", apply);

  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    apply();
    setPanel(false);
  });

  
  form.addEventListener("reset", () => setTimeout(apply, 0));


  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    apply();
  });
  searchInput?.addEventListener("input", debounce(apply, 300));


  function setPanel(open) {
    if (!toggle || !panel) return;
    panel.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  toggle?.addEventListener("click", () => {
    setPanel(toggle.getAttribute("aria-expanded") !== "true");
  });


  const q = new URLSearchParams(window.location.search).get("q");
  if (q && searchInput) searchInput.value = q;

  apply();
}