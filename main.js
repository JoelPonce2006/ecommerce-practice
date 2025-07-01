var menuHamburguer = document.getElementById("menu-hamburguer");
var backdrop = document.getElementById("backdrop");
var menu = document.getElementById("menu");
var toPay = document.getElementById("to-pay");
var payOrder = document.getElementById("pay-order");

/* ─── Menú hamburguesa ─────────────────────────────── */
if (menuHamburguer && menu && backdrop) {
  menuHamburguer.addEventListener("click", () => {
    if (menu.classList.contains("header-menu-open")) {
      menu.classList.remove("header-menu-open");
      backdrop.classList.remove("backdrop-open");
    } else {
      menu.classList.add("header-menu-open");
      backdrop.classList.add("backdrop-open");
    }
  });
}

/* ─── Modal de pago ────────────────────────────────── */
if (toPay && payOrder && backdrop) {
  toPay.addEventListener("click", () => {
    var isOpen = payOrder.classList.contains(
      "modal-succesfull-order-container-open"
    );
    if (isOpen) {
      payOrder.classList.remove("modal-succesfull-order-container-open");
      backdrop.classList.remove("backdrop-open");
    } else {
      payOrder.classList.add("modal-succesfull-order-container-open");
      backdrop.classList.add("backdrop-open");
    }
  });
}
