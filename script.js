const servicePrices = {
  basic: 500,
  premium: 1100,
  custom: 1100,
};

const optionMultipliers = {
  standard: 1.0,
  advanced: 1.5,
  professional: 2.0,
};

const propertyPrice = 500;

const quantityInput = document.getElementById("quantity");
const serviceTypeRadios = document.querySelectorAll(
  'input[name="serviceType"]'
);
const optionsGroup = document.getElementById("optionsGroup");
const optionsSelect = document.getElementById("options");
const propertyGroup = document.getElementById("propertyGroup");
const propertyCheckbox = document.getElementById("property");
const totalPriceElement = document.getElementById("totalPrice");

function getSelectedServiceType() {
  for (const radio of serviceTypeRadios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return "basic";
}

function updateFormVisibility() {
  const serviceType = getSelectedServiceType();

  optionsGroup.style.display = "none";
  propertyGroup.style.display = "none";

  switch (serviceType) {
    case "premium":
      optionsGroup.style.display = "block";
      break;
    case "custom":
      propertyGroup.style.display = "block";
      break;
  }
}

function calculateTotalPrice() {
  const quantity = parseInt(quantityInput.value) || 1;
  const serviceType = getSelectedServiceType();
  const basePrice = servicePrices[serviceType];

  let total = basePrice * quantity;

  if (serviceType === "premium") {
    const optionMultiplier = optionMultipliers[optionsSelect.value];
    total *= optionMultiplier;
  }

  if (serviceType === "custom" && propertyCheckbox.checked) {
    total += propertyPrice * quantity;
  }

  return total;
}

function updatePriceDisplay() {
  const totalPrice = calculateTotalPrice();
  totalPriceElement.textContent = totalPrice.toLocaleString("ru-RU");
}

quantityInput.addEventListener("input", updatePriceDisplay);

serviceTypeRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    updateFormVisibility();
    updatePriceDisplay();
  });
});

optionsSelect.addEventListener("change", updatePriceDisplay);
propertyCheckbox.addEventListener("change", updatePriceDisplay);

document.addEventListener("DOMContentLoaded", function () {
  updateFormVisibility();
  updatePriceDisplay();
});
