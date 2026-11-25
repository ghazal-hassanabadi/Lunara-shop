export function initMenu() {
  const button = document.querySelector("#menu-toggle");
  const nav = document.querySelector("#main-nav");
  if (!button || !nav) return;

  const icon = button.querySelector("i");
  const desktop = window.matchMedia("(min-width: 64rem)");

  const isOpen = () => button.getAttribute("aria-expanded") === "true";

  function setOpen(open) {
    nav.classList.toggle("hidden", !open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "بستن منو" : "باز کردن منو");
    icon.classList.toggle("fa-bars", !open);
    icon.classList.toggle("fa-xmark", open);
  }

  button.addEventListener("click", () => setOpen(!isOpen()));


  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      button.focus();
    }
  });

 
  document.addEventListener("click", (event) => {
    if (!isOpen()) return;
    if (event.target.closest("#main-nav, #menu-toggle")) return;
    setOpen(false);
  });


  desktop.addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}