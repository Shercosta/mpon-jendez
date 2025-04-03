import { items } from "./items.js";

// Initiate Products

function initiateProducts() {
  const element = document.getElementById("toInitiateProducts");

  if (element) {
    items.map((item) => {
      const pricingColumnDiv = document.createElement("div");
      pricingColumnDiv.classList.add(
        "prcing-column",
        "col-lg-4",
        "col-md-6",
        "col-sm-12"
      );

      const pricingCardDiv = document.createElement("div");
      pricingCardDiv.classList.add("card");
      pricingCardDiv.setAttribute("style", "height: 100%");

      const cardHeaderDiv = document.createElement("div");
      cardHeaderDiv.classList.add("card-header");

      const h3 = document.createElement("h3");
      h3.innerText = item.name;

      cardHeaderDiv.appendChild(h3);
      pricingCardDiv.appendChild(cardHeaderDiv);

      const cardBodyDiv = document.createElement("div");
      cardBodyDiv.classList.add("card-body");

      const h2 = document.createElement("h2");
      h2.innerText = item.price;

      cardBodyDiv.appendChild(h2);
      item.lists.map((list) => {
        const p = document.createElement("p");
        p.innerText = list;

        cardBodyDiv.appendChild(p);
      });

      pricingCardDiv.appendChild(cardBodyDiv);

      const cardFooterDiv = document.createElement("div");
      cardFooterDiv.classList.add("card-footer");

      const button = document.createElement("button");
      button.classList.add("btn", "btn-lg", "w-100", "btn-outline-dark");
      button.setAttribute("id", item.code);
      button.innerText = "Masuk Keranjang";

      cardFooterDiv.appendChild(button);
      pricingCardDiv.appendChild(cardFooterDiv);

      pricingColumnDiv.appendChild(pricingCardDiv);

      element.appendChild(pricingColumnDiv);
    });
  }
}

initiateProducts();

var cartItem = 0;

if (cartItem > 0) {
  document.getElementById("cartnumber").style.visibility = "visible";
} else {
  document.getElementById("cartnumber").style.visibility = "hidden";
}

function updateCartNumber() {
  document.getElementById("cartnumber").innerText = cartItem;
  if (cartItem > 0) {
    document.getElementById("cartnumber").style.visibility = "visible";
  } else {
    document.getElementById("cartnumber").style.visibility = "hidden";
  }
}

document.getElementById("item1").addEventListener("click", function () {
  cartItem++;
  updateCartNumber();
});
