const texRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 300;

window.addEventListener("load", () => {
  calculateCartPrice();
  localStorage.setItem("taxRate", texRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);

  sessionStorage.setItem("taxRate", texRate);
  sessionStorage.setItem("shippingPrice", shippingPrice);
  sessionStorage.setItem("shippingFreePrice", shippingFreePrice);
});

const productsDiv = document.querySelector(".products");
productsDiv.addEventListener("click", (e) => {
  if (e.target.className == "fa-solid fa-minus") {
    console.log("minus btn is clicked");
    if (e.target.parentElement.querySelector(".quantity").innerText > 1) {
      e.target.parentElement.querySelector(".quantity").innerText--;
      calculateProductPrice(e.target);
      calculateCartPrice();
    } else {
      if (
        confirm(
          `${
            e.target.parentElement.parentElement.querySelector("h2").innerText
          } will be deleted???`
        )
      ) {
        e.target.parentElement.parentElement.parentElement.remove();
        calculateCartPrice();
      }
    }
  } else if (e.target.classList.contains("fa-plus")) {
    console.log("plus btn is clicked");
    e.target.previousElementSibling.innerText++;
    calculateProductPrice(e.target);
    calculateCartPrice();
  } else if (e.target.className == "remove-product") {
    console.log("remove btn is clicked");
    e.target.parentElement.parentElement.parentElement.remove();
    calculateCartPrice();
  } else {
    console.log("other element was cliecked");
  }
});


const calculateProductPrice = (btn) => {
  const productInfoDiv = btn.parentElement.parentElement;
  const price = productInfoDiv.querySelector(".product-price strong").innerText;
  const quantity = productInfoDiv.querySelector(".quantity").innerText;
  const productTotalDiv = productInfoDiv.querySelector(".product-line-price");
  productTotalDiv.innerText = (price * quantity).toFixed(2);
};

const calculateCartPrice = () => {
  const productsTotalPricesDivs = document.querySelectorAll(
    ".product-line-price"
  );
  let subtotal = 0;
  productsTotalPricesDivs.forEach((div) => {
    subtotal += parseFloat(div.innerText);
  });

  const taxPrice = subtotal * localStorage.getItem("taxRate");
  const shippingPrice = parseFloat(
    subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice")
      ? localStorage.getItem("shippingPrice")
      : 0
  );

  document.querySelector("#cart-subtotal").lastElementChild.innerText =
    subtotal.toFixed(2);
  document.querySelector("#cart-tax p:nth-child(2)").innerText =
    taxPrice.toFixed(2);
  document.querySelector("#cart-shipping").children[1].innerText =
    shippingPrice.toFixed(2);
  document.querySelector("#cart-total").lastElementChild.innerText = (
    subtotal +
    taxPrice +
    shippingPrice
  ).toFixed(2);
};
