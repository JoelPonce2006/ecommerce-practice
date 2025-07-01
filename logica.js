document.addEventListener("DOMContentLoaded", () => {
  // -----------------------
  // Carrito - Declaraciones necesarias antes de llamar updateCartUI()
  // -----------------------
  const addToCartButton = document.getElementById("addToCartBtn");
  const cartOverlay = document.getElementById("cartOverlay");
  const removeAllBtn = document.getElementById("removeAll");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const cartTotal = document.querySelector(".value");
  const cartList = document.getElementById("cartProductsList");
  const cartCount = document.getElementById("cartCount");
  const cartBox = document.querySelector(".cart-box");

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  function updateCartUI() {
    if (!cartList || !cartCount || !cartTotal) return;

    cartList.innerHTML = ""; // Limpiar
    let total = 0;

    cartItems.forEach((item) => {
      total += item.price * item.quantity;

      const li = document.createElement("li");
      li.classList.add("cart");
      li.innerHTML = `
      <div class="cart-img-1">
        <img class="headphone-1" src="${item.image}" alt="${item.name}" />
      </div>
      <div class="name-product-quantity">
        <div class="cart-info">
          <span class="cart-name">${item.name}</span>
          <span class="cart-price">$ ${item.price}</span>
        </div>
        <div class="quantity-selector-container">
          <div class="quantity-selector">
            <button class="qty-btn" data-action="decrease">-</button>
            <span class="qty-number">${item.quantity}</span>
            <button class="qty-btn" data-action="increase">+</button>
          </div>
        </div>
      </div>
    `;
      cartList.appendChild(li);
    });

    cartCount.textContent = cartItems.length;
    cartTotal.textContent = `$ ${total.toLocaleString()}`;

    // Botones de + y -
    const carts = cartList.querySelectorAll(".cart");

    carts.forEach((cartElement, index) => {
      const decreaseBtn = cartElement.querySelector(
        'button[data-action="decrease"]'
      );
      const increaseBtn = cartElement.querySelector(
        'button[data-action="increase"]'
      );

      if (decreaseBtn) {
        decreaseBtn.addEventListener("click", (e) => {
          e.stopPropagation(); // ⬅️ evita que burbujee al overlay
          if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            saveCartToStorage();
            updateCartUI();
          }
        });
      }

      if (increaseBtn) {
        increaseBtn.addEventListener("click", (e) => {
          e.stopPropagation(); // ⬅️ evita que burbujee al overlay
          cartItems[index].quantity++;
          saveCartToStorage();
          updateCartUI();
        });
      }
    });
  }

  updateCartUI();

  // -----------------------
  // Validación de Email
  // -----------------------
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const form = document.getElementById("form");
  const emailLabel = document.getElementById("emailLabel");

  if (emailInput && emailError && form && emailLabel) {
    emailInput.addEventListener("input", () => {
      const emailValue = emailInput.value.trim();

      if (emailValue === "") {
        emailInput.classList.remove("error");
        emailError.style.display = "none";
        emailLabel.classList.remove("error");
      } else if (!emailInput.validity.valid) {
        emailInput.classList.add("error");
        emailError.style.display = "inline";
        emailLabel.classList.add("error");
      } else {
        emailInput.classList.remove("error");
        emailError.style.display = "none";
        emailLabel.classList.remove("error");
      }
    });

    form.addEventListener("submit", (e) => {
      if (!emailInput.validity.valid) {
        e.preventDefault();
        emailInput.classList.add("error");
        emailError.style.display = "inline";
        emailLabel.classList.add("error");
      }
    });
  }

  // -----------------------
  // Métodos de Pago
  // -----------------------
  const eMoneyRadio = document.getElementById("e-money");
  const cashRadio = document.getElementById("cash-delivery");

  const eMoneyNumber = document.getElementById("e-money-number");
  const eMoneyPin = document.getElementById("e-money-pin");
  const cashInfo = document.getElementById("cash-info");

  function updatePaymentView() {
    if (eMoneyRadio?.checked) {
      eMoneyNumber?.classList.remove("hidden");
      eMoneyPin?.classList.remove("hidden");
      cashInfo?.classList.add("hidden");
    } else if (cashRadio?.checked) {
      eMoneyNumber?.classList.add("hidden");
      eMoneyPin?.classList.add("hidden");
      cashInfo?.classList.remove("hidden");
    }
  }

  if (eMoneyRadio && cashRadio) {
    eMoneyRadio.addEventListener("change", updatePaymentView);
    cashRadio.addEventListener("change", updatePaymentView);
    updatePaymentView();
  }

  if (addToCartButton && cartOverlay && removeAllBtn && checkoutBtn) {
    addToCartButton.addEventListener("click", () => {
      cartOverlay.classList.remove("hidden");
    });

    cartOverlay.addEventListener("click", (e) => {
      if (e.target === cartOverlay) {
        cartOverlay.classList.add("hidden");
      }
    });
  }

  const addToCartButtons = document.querySelectorAll(".button-banner");

  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      const image = btn.dataset.image;

      const counterSpan = btn.parentElement.querySelector(
        ".product-detail-count"
      );
      const quantity = counterSpan ? parseInt(counterSpan.textContent) : 1;

      const existingItem = cartItems.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push({ name, price, image, quantity });
      }

      saveCartToStorage();
      updateCartUI();
      cartOverlay.classList.remove("hidden");
    });
  });

  if (removeAllBtn) {
    removeAllBtn.addEventListener("click", () => {
      cartItems = [];
      saveCartToStorage();
      updateCartUI();
    });
  }

  if (cartOverlay && cartBox) {
    cartOverlay.addEventListener("click", (e) => {
      // si el clic NO fue dentro del panel blanco, cerramos
      if (!cartBox.contains(e.target)) {
        cartOverlay.classList.add("hidden");
      }
    });
  }

  const showCart = localStorage.getItem("showCartOnReturn");
  if (showCart === "true" && cartOverlay) {
    localStorage.removeItem("showCartOnReturn");
    cartOverlay.classList.remove("hidden");
  }

  const goBackLink = document.getElementById("goBackLink");
  if (goBackLink) {
    goBackLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.setItem("showCartOnReturn", "true");
      window.history.back();
    });
  }

  const summaryList = document.getElementById("checkoutSummaryList");
  const totalSpan = document.getElementById("checkoutTotal");
  const shippingSpan = document.getElementById("checkoutShipping");
  const vatSpan = document.getElementById("checkoutVat");
  const grandTotalSpan = document.getElementById("checkoutGrandTotal");
  const payBtn = document.getElementById("continuePayBtn");

  /* ---------- carrito desde localStorage ---------- */
  cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  /* ---------- si hay nodos, pinto el resumen ---------- */
  if (summaryList && totalSpan && shippingSpan && vatSpan && grandTotalSpan) {
    let total = 0;
    summaryList.innerHTML = ""; // limpio lista

    cartItems.forEach((item) => {
      total += item.price * item.quantity;

      const li = document.createElement("li");
      li.classList.add("cart"); // mismo estilo que el pop‑over
      li.innerHTML = `
      <div class="cart-img-1">
        <img class="headphone-1" src="${item.image}" alt="${item.name}" />
      </div>
      <div class="cart-summary-quantity">
        <div class="cart-info">
          <span class="cart-name">${item.name}</span>
          <span class="cart-price">$ ${item.price.toLocaleString()}</span>
        </div>
        <span class="qty-number-checkout">x${item.quantity}</span>
      </div>
    `;
      summaryList.appendChild(li);
    });

    /* ─── Totales ─────────────────────────── */
    const SHIPPING = 50; // costo fijo
    const vat = Math.round(total * 0.2); // 20 % de VAT
    const grand = total + SHIPPING;

    totalSpan.textContent = `$ ${total.toLocaleString()}`;
    shippingSpan.textContent = `$ ${SHIPPING}`;
    vatSpan.textContent = `$ ${vat.toLocaleString()}`;
    grandTotalSpan.textContent = `$ ${grand.toLocaleString()}`;
  }

  /* ---------- “Continue & Pay” →  vaciar carrito y redirigir ---------- */
  if (payBtn) {
    payBtn.addEventListener("click", () => {
      // ejemplo simple: vaciar carrito y redirigir a confirmación
      localStorage.removeItem("cart");
      window.location.href = "confirmation.html"; // o tu página final
    });
  }
});
