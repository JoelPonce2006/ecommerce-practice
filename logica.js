const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const form = document.getElementById("form");
const emailLabel = document.getElementById("emailLabel");

emailInput.addEventListener("input", () => {
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    // Campo vacío, quitamos todo
    emailInput.classList.remove("error");
    emailError.style.display = "none";
    emailLabel.classList.remove("error");
  } else if (!emailInput.validity.valid) {
    // Formato incorrecto
    emailInput.classList.add("error");
    emailError.style.display = "inline";
    emailLabel.classList.add("error");
  } else {
    // Todo correcto
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
  }
});

const eMoneyRadio = document.getElementById("e-money");
const cashRadio = document.getElementById("cash-delivery");

const eMoneyNumber = document.getElementById("e-money-number");
const eMoneyPin = document.getElementById("e-money-pin");
const cashInfo = document.getElementById("cash-info");

function updatePaymentView() {
  if (eMoneyRadio.checked) {
    eMoneyNumber.classList.remove("hidden");
    eMoneyPin.classList.remove("hidden");
    cashInfo.classList.add("hidden");
  } else if (cashRadio.checked) {
    eMoneyNumber.classList.add("hidden");
    eMoneyPin.classList.add("hidden");
    cashInfo.classList.remove("hidden");
  }
}

eMoneyRadio.addEventListener("change", updatePaymentView);
cashRadio.addEventListener("change", updatePaymentView);

// Ejecutar al cargar por si ya hay uno seleccionado
window.addEventListener("DOMContentLoaded", updatePaymentView);
