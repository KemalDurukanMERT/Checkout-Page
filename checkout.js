const texRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 300;

window.addEventListener("load", () => {
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
    } else {
      if (confirm("Product will be remowed???")) {
        e.target.parentElement.parentElement.parentElement.remove();
      }
    }
  } else if (e.target.classList.contains("fa-plus")) {
    console.log("plus btn is clicked");
    e.target.previousElementSibling.innerText++;
  } else if (e.target.className == "remove-product") {
    console.log("remove btn is clicked");
    e.target.parentElement.parentElement.parentElement.remove();
  } else {
    console.log("other element was cliecked");
  }
});
