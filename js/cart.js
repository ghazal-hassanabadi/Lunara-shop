const CART_KEY = "lunara-cart";
export const CHANGE_EVENT = "cart:change";

export function getCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY));
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item) => item && item.id && Number.isFinite(item.qty) && item.qty > 0
    );
  } catch {
    return [];
  }
}

function notifyChange() {
  document.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    
  }
  notifyChange();
}

export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
}

export function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
}

export function removeFromCart(id) {
  saveCart(getCart().filter((item) => item.id !== id));
}

export function getTotalCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

export function getTotalPrice() {
  return getCart().reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.qty,
    0
  );
}

function renderCartCount() {
  const count = getTotalCount();
  const badge = document.querySelector("#cart-count");
  if (badge) badge.textContent = count.toLocaleString("fa-IR");

  document
    .querySelector("#cart-open")
    ?.setAttribute("aria-label", `سبد خرید، ${count.toLocaleString("fa-IR")} محصول`);
}

function readProduct(card) {
  return {
    id: card.dataset.id,
    name: card.querySelector("h3").textContent.trim(),
    price: Number(card.querySelector("data").value),
    image: card.querySelector("img").getAttribute("src"),
  };
}

export function initCart() {
  renderCartCount();

 
  document.addEventListener(CHANGE_EVENT, renderCartCount);

 
  window.addEventListener("storage", (event) => {
    if (event.key === CART_KEY) notifyChange();
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-to-cart]");
    if (!button) return;

    addToCart(readProduct(button.closest("article")));
  });
}