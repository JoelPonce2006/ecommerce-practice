var menuHamburguer = document.getElementById("menu-hamburguer");

var backdrop = document.getElementById("backdrop");

var menu = document.getElementById("menu");

menuHamburguer.addEventListener("click", () => {
  if (menu.classList.contains("header-menu-open")) {
    menu.classList.remove("header-menu-open");
    backdrop.classList.remove("backdrop-open");
  } else {
    menu.classList.add("header-menu-open");
    backdrop.classList.add("backdrop-open");
  }
});
