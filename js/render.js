
const formatPrice = (n) => n.toLocaleString("fa-IR");

function createCard(p) {
  const hasDiscount = p.oldPrice && p.discount;

  return `
  <li data-product-item class="min-[600px]:w-[180px] min-[600px]:shrink-0 min-[600px]:snap-start lg:w-auto">
    <article class="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg" data-id="${p.id}" data-category="${p.category}">
      <figure class="relative overflow-hidden">
        <img
  src="${p.image}"
  alt="${p.name}"
  loading="lazy"
  decoding="async"
  class="aspect-3/4 w-full object-cover transition duration-300 group-hover:scale-105"
>
        <button type="button" class="absolute inset-s-2 top-2 text-base hover:text-wine sm:inset-s-3 sm:top-3 sm:text-lg" aria-label="افزودن به علاقه‌مندی">
          <i class="fa-regular fa-heart"></i>
        </button>
        ${hasDiscount ? `<figcaption class="absolute inset-e-2 top-2 rounded-full bg-wine px-2 py-0.5 text-[10px] font-bold text-white">${p.discount.toLocaleString("fa-IR")}٪</figcaption>` : ""}
      </figure>

      <header class="space-y-1.5 p-2 sm:p-3">
        <h3 class="text-[11px] font-medium group-hover:text-wine sm:text-xs lg:text-sm">${p.name}</h3>
        <p class="flex flex-wrap items-center gap-x-2 text-[11px] sm:text-xs lg:text-sm">
          <strong class="text-wine"><data value="${p.price}">${formatPrice(p.price)}</data> تومان</strong>
          ${hasDiscount ? `<del class="text-[10px] text-ink/50">${formatPrice(p.oldPrice)}</del>` : ""}
        </p>
      </header>

      <footer class="mt-auto p-2 pt-0 sm:p-3 sm:pt-0">
        <button type="button" data-add-to-cart class="w-full rounded-full bg-wine py-1.5 text-[11px] font-medium text-white hover:bg-ink active:scale-95 sm:text-xs lg:text-sm">افزودن به سبد خرید</button>
      </footer>
    </article>
  </li>`;
}

export function renderProducts(container, list) {
  container.querySelectorAll("[data-product-item]").forEach((li) => li.remove());
  container.insertAdjacentHTML("beforeend", list.map(createCard).join(""));
}
