import {
  getCart,
  getTotalPrice,
  changeQty,
  removeFromCart,
  CHANGE_EVENT,
} from "./cart.js";

const FREE_SHIPPING = 1000000;

const formatPrice = (n) => n.toLocaleString("fa-IR");

// داده‌ی localStorage قابل دستکاری است، پس قبل از ورود به HTML امن می‌شود
const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );

function createItem(item) {
  const name = escapeHtml(item.name);
  const price = Number(item.price) || 0;

  return `
  <li data-id="${escapeHtml(item.id)}" class="flex gap-3 rounded-xl bg-white p-2 shadow-sm">
    <figure class="w-20 shrink-0">
      <img src="${escapeHtml(item.image)}" alt="" class="aspect-3/4 w-full rounded-lg object-cover">
    </figure>

    <section class="flex min-w-0 flex-1 flex-col gap-1">
      <h3 class="truncate text-sm font-medium">${name}</h3>
      <p class="text-xs">
        <strong class="text-wine"><data value="${price}">${formatPrice(price)}</data> تومان</strong>
      </p>

      <span role="group" aria-label="تعداد" class="mt-auto inline-flex w-fit items-center gap-3 rounded-full bg-sand/60 px-2 py-1 text-sm">
        <button type="button" data-cart-action="decrease"
          class="grid size-6 place-items-center rounded-full hover:bg-wine hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit"
          aria-label="کم کردن تعداد ${name}" ${item.qty <= 1 ? "disabled" : ""}>
          <i class="fa-solid fa-minus text-xs"></i>
        </button>
        <output class="min-w-4 text-center font-bold">${formatPrice(item.qty)}</output>
        <button type="button" data-cart-action="increase"
          class="grid size-6 place-items-center rounded-full hover:bg-wine hover:text-white"
          aria-label="زیاد کردن تعداد ${name}">
          <i class="fa-solid fa-plus text-xs"></i>
        </button>
      </span>
    </section>

    <button type="button" data-cart-action="remove" class="self-start hover:text-wine" aria-label="حذف ${name} از سبد">
      <i class="fa-regular fa-trash-can"></i>
    </button>
  </li>`;
}

export function initCartDrawer() {
  const dialog = document.querySelector("#cart-drawer");
  const openButton = document.querySelector("#cart-open");
  if (!dialog || !openButton) return;

  const list = dialog.querySelector("#cart-items");
  const emptyMessage = dialog.querySelector("#cart-empty");
  const footer = dialog.querySelector("#cart-footer");
  const totalEl = dialog.querySelector("#cart-total");
  const shippingEl = dialog.querySelector("#cart-shipping");
  const closeButton = dialog.querySelector("#cart-close");

  function render() {
    const cart = getCart();
    const total = getTotalPrice();

    list.innerHTML = cart.map(createItem).join("");
    emptyMessage.classList.toggle("hidden", cart.length > 0);
    footer.classList.toggle("hidden", cart.length === 0);

    totalEl.value = total;
    totalEl.textContent = formatPrice(total);

    shippingEl.textContent =
      total >= FREE_SHIPPING
        ? "ارسال سفارش شما رایگان است."
        : `${formatPrice(FREE_SHIPPING - total)} تومان دیگر خرید کنید تا ارسال رایگان شود.`;
  }

  function open() {
    render();
    dialog.showModal();
    document.body.classList.add("overflow-hidden");
  }

  openButton.addEventListener("click", open);

  // با هر راه بسته شدن (دکمه، Escape، کلیک بیرون) قفل اسکرول برداشته می‌شود
  dialog.addEventListener("close", () => {
    document.body.classList.remove("overflow-hidden");
    openButton.focus();
  });

  // کلیک روی پس‌زمینه‌ی تیره
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // تغییر سبد در حالی که پنجره باز است
  document.addEventListener(CHANGE_EVENT, () => {
    if (dialog.open) render();
  });

  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");
    if (!button) return;

    const id = button.closest("li").dataset.id;
    const action = button.dataset.cartAction;

    if (action === "increase") changeQty(id, 1);
    if (action === "decrease") changeQty(id, -1);
    if (action === "remove") removeFromCart(id);

    // لیست دوباره ساخته شده؛ فوکوس کاربر کیبوردی نباید گم شود
    const item = `[data-id="${CSS.escape(id)}"]`;
    const next =
      list.querySelector(`${item} [data-cart-action="${action}"]:not(:disabled)`) ??
      list.querySelector(`${item} [data-cart-action="increase"]`) ??
      closeButton;
    next.focus();
  });
}