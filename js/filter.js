import { products } from "./products.js";
import { renderProducts } from "./render.js";
import { debounce } from "./debounce.js";


const normalize = (text) =>
  String(text)
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, " ")
    .trim()
    .toLowerCase();


function parsePrice(value) {
  const latin = String(value ?? "")
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
    .replace(/[,،٬\s]/g, "");
  if (latin === "") return null;
  const n = Number(latin);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

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
    let min = parsePrice(data.get("min")) ?? 0;
    let max = parsePrice(data.get("max")) ?? Infinity;
    if (min > max) [min, max] = [max, min]; 

    return {
      query: searchInput ? normalize(searchInput.value) : "",
      categories: data.getAll("category"),
      min,
      max,
      onlyDiscount: data.has("discount"),
    };
  }

  function apply() {
    const { query, categories, min, max, onlyDiscount } = getFilters();

    const result = products.filter((p) => {
      if (query && !normalize(p.name).includes(query)) return false;
      if (categories.length && !categories.includes(p.category)) return false;
      if (p.price < min || p.price > max) return false;
      if (onlyDiscount && !p.discount) return false;
      return true;
    });

    renderProducts(list, result);
    emptyMessage?.classList.toggle("hidden", result.length > 0);
  }

  const debouncedApply = debounce(apply, 300);

 
  form.addEventListener("input", debouncedApply);

  
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
  searchInput?.addEventListener("input", debouncedApply);

  
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