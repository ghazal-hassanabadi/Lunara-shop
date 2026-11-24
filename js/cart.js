const CART_KEY = "lunara-cart";

export function getCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
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




export function getTotalCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function renderCartCount() {
  const badge = document.querySelector("#cart-count");
  if (!badge) return;

  badge.textContent = getTotalCount().toLocaleString("fa-IR");
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

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-to-cart]");
    if (!button) return;

    const card = button.closest("article");
    addToCart(readProduct(card));
    renderCartCount();
  });
}