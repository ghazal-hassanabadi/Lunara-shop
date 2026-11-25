const formatPrice = (n) => n.toLocaleString("fa-IR");

function createCard(p) {
  const hasDiscount = p.oldPrice && p.discount;

  return `
  <li data-product-item class="min-[600px]:w-[180px] min-[600px]:shrink-0 min-[600px]:snap-start lg:w-auto">
    <article class="group relative flex h-full flex-col overflow-hidden rounded-t-full rounded-b-2xl bg-white/70 ring-1 ring-brass/40 transition duration-300 hover:bg-white hover:ring-wine" data-id="${p.id}" data-category="${p.category}">
      <figure class="relative overflow-hidden bg-sand">
        <img
  src="${p.image}"
  alt="${p.name}"
  loading="lazy"
  decoding="async"
  class="aspect-3/4 w-full object-cover transition duration-500 group-hover:scale-105"
>
        <button type="button" class="absolute inset-s-2 bottom-2 grid size-8 place-items-center rounded-full bg-white/90 text-sm hover:bg-wine hover:text-white sm:inset-s-3 sm:bottom-3" aria-label="افزودن به علاقه‌مندی">
          <i class="fa-regular fa-heart"></i>
        </button>
        ${hasDiscount ? `<figcaption class="absolute inset-e-2 bottom-2 rounded-full bg-brass px-2.5 py-1 text-[10px] font-bold text-white sm:inset-e-3 sm:bottom-3">${p.discount.toLocaleString("fa-IR")}٪</figcaption>` : ""}
      </figure>

      <header class="space-y-1.5 border-t border-brass/30 px-2 pb-2 pt-3 text-center sm:px-3">
        <h3 class="text-[11px] font-medium group-hover:text-wine sm:text-xs lg:text-sm">${p.name}</h3>
        <p class="flex flex-wrap items-center justify-center gap-x-2 text-[11px] sm:text-xs lg:text-sm">
          <strong class="font-extrabold text-wine"><data value="${p.price}">${formatPrice(p.price)}</data> تومان</strong>
          ${hasDiscount ? `<del class="text-[10px] text-ink/50">${formatPrice(p.oldPrice)}</del>` : ""}
        </p>
      </header>

      <footer class="mt-auto px-2 pb-3 sm:px-3">
        <button type="button" data-add-to-cart class="w-full rounded-full border border-wine py-1.5 text-[11px] font-medium text-wine hover:bg-wine hover:text-white active:scale-95 sm:text-xs lg:text-sm">افزودن به سبد خرید</button>
      </footer>
    </article>
  </li>`;
}

export function renderProducts(container, list) {
  container.querySelectorAll("[data-product-item]").forEach((li) => li.remove());
  container.insertAdjacentHTML("beforeend", list.map(createCard).join(""));
}