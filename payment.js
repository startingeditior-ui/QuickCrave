const paymentMethod = document.getElementById("paymentMethod");
const cardSection = document.getElementById("cardSection");
const upiSection = document.getElementById("upiSection");
const payBtn = document.getElementById("payBtn");
const status = document.getElementById("status");
const terms = document.getElementById("terms");

const requiredFields = [
    "name", "phone", "address", "city", "pincode"
];

const urlParams = new URLSearchParams(window.location.search);
const foodName = urlParams.get("item");
const price = parseInt(urlParams.get("price")) || 0;

const DELIVERY_FEE = 40;

document.getElementById("foodName").textContent = foodName || "Selected Item";
document.getElementById("itemTotal").textContent = price;
document.getElementById("deliveryFee").textContent = DELIVERY_FEE;
document.getElementById("totalPayable").textContent = price + DELIVERY_FEE;

paymentMethod.addEventListener("change", () => {
    cardSection.classList.add("hidden");
    upiSection.classList.add("hidden");

    if (paymentMethod.value === "card") {
        cardSection.classList.remove("hidden");
    }

    if (paymentMethod.value === "upi") {
        upiSection.classList.remove("hidden");
    }

    validate();
});

document.addEventListener("input", validate);

function validate() {
    let valid = true;

    requiredFields.forEach(id => {
        if (document.getElementById(id).value.trim() === "") {
            valid = false;
        }
    });

    if (!paymentMethod.value) valid = false;

    if (!terms.checked) valid = false;

    if (paymentMethod.value === "card") {
        const cardNumber = document.getElementById("cardNumber").value;
        const cvv = document.getElementById("cvv").value;

        if (cardNumber.length !== 16 || cvv.length !== 3) {
            valid = false;
        }
    }

    if (paymentMethod.value === "upi") {
        const upiId = document.getElementById("upiId").value;
        if (!upiId.includes("@")) {
            valid = false;
        }
    }

    payBtn.disabled = !valid;
    status.textContent = valid
        ? "Ready to place order"
        : "Please complete all required fields";
}

payBtn.addEventListener("click", () => {
    alert("Order placed successfully!");
});
