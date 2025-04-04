import { items } from "./items.js";

function nominalize(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Initiate Products

function initiateProducts() {
  const element = document.getElementById("toInitiateProducts");

  if (element) {
    items.map((item) => {
      const pricingColumnDiv = document.createElement("div");
      pricingColumnDiv.classList.add("prcing-column", "col");

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
      h2.classList.add("price-text");
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

// Cart

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

// Selected Products

let selectedProducts = []; // contains items codes and amount
// {id: item.code, amount: 1}

function GetProductByCode(code) {
  return items.find((item) => item.code === code);
}

function DisplaySelectedProducts() {
  document.getElementById("DisplaySelectedProducts").innerHTML = `<tr>
              <th></th>
              <th>Nama Item</th>
              <th>Jumlah</th>
              <th></th>
              <th>Total Harga</th>
              <th></th>
            </tr>`;

  let totalOrders = 0;

  console.log(selectedProducts);

  selectedProducts.map((product) => {
    const currentItem = GetProductByCode(product.id);

    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");

    const minus = document.createElement("i");
    minus.classList.add("fa-solid", "fa-square-minus");

    const plus = document.createElement("i");
    plus.classList.add("fa-solid", "fa-square-plus");

    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash");

    td1.appendChild(minus);
    td4.appendChild(plus);
    td6.appendChild(trash);

    // add event listener to plus, minus and trash
    plus.addEventListener("click", function () {
      product.amount++;
      cartItem++;
      updateCartNumber();
      DisplaySelectedProducts();
    });

    minus.addEventListener("click", function () {
      if (product.amount > 1) {
        product.amount--;
        cartItem--;
        updateCartNumber();
        DisplaySelectedProducts();
      }
    });

    trash.addEventListener("click", function () {
      selectedProducts = selectedProducts.filter(
        (selectedProduct) => selectedProduct.id !== product.id
      );
      cartItem = cartItem - product.amount;
      updateCartNumber();
      DisplaySelectedProducts();
    });

    const itemName = document.createElement("p");
    itemName.classList.add("mb-0");
    itemName.innerText = currentItem.name;

    td2.appendChild(itemName);

    const itemAmount = document.createElement("p");
    itemAmount.classList.add("mb-0");
    itemAmount.innerText = product.amount;

    td3.appendChild(itemAmount);

    const itemPrice = document.createElement("p");
    itemPrice.classList.add("mb-0");
    const totalHarga = Number(currentItem.price * product.amount) * 1000;
    itemPrice.innerText = "Rp. " + nominalize(totalHarga);

    totalOrders += totalHarga;

    td5.appendChild(itemPrice);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    document.getElementById("DisplaySelectedProducts").appendChild(tr);
  });

  // update Total Belanja

  document.getElementById("calculatedTotalOrders").innerText =
    "Rp. " + nominalize(totalOrders);
}

// Products Listener

function ListenItems() {
  items.map((item) => {
    document.getElementById(item.code).addEventListener("click", function () {
      cartItem++;
      updateCartNumber();

      let existSelectedProduct = selectedProducts.find(
        (product) => product.id === item.code
      );

      if (existSelectedProduct) {
        existSelectedProduct.amount++;
      } else {
        selectedProducts.push({ id: item.code, amount: 1 });
      }

      DisplaySelectedProducts();
      // selectedProducts.push(item.code);
    });
  });
}

ListenItems();
updateCartNumber();

document.getElementById("clearCart").addEventListener("click", function () {
  selectedProducts = [];
  cartItem = 0;
  updateCartNumber();
  DisplaySelectedProducts();
});
