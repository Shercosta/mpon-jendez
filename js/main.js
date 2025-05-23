import { items } from "./items.js";
import { GetProductByCode, nominalize } from "./core-functions.js";

const baseWaLink = "https://wa.me/6281112525686?text=";
const haloMponJendez = "Halo Mpon Jendez!";

const baseRenderPage = window.location.origin + "/mpon-jendez/";

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
      if (item.isCommingSoon) {
        h2.innerText = "Coming Soon";
      } else {
        h2.innerText = item.price + "K";
      }

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

      // disable button if item price is 0
      if (item.isCommingSoon) {
        button.setAttribute("disabled", true);
        button.innerText = "Coming Soon";
      }

      cardFooterDiv.appendChild(button);
      pricingCardDiv.appendChild(cardFooterDiv);

      pricingColumnDiv.appendChild(pricingCardDiv);

      element.appendChild(pricingColumnDiv);
    });
  }
}

initiateProducts();

function initiateProductDescriptions() {
  const element = document.getElementById("toInitiateProductDescriptions");

  if (element) {
    items.map((item, index) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row", "py-5");
      rowDiv.setAttribute(
        "style",
        "background-color: " +
          item.bgColor +
          ";" +
          " color: " +
          item.txtColor +
          ";"
      );

      const imgDiv = document.createElement("div");
      imgDiv.classList.add("col-lg-4", "order-0", "order-lg-0");
      const imgImg = document.createElement("img");
      imgImg.setAttribute("src", item.imagePath);
      imgImg.setAttribute("alt", item.name);
      imgImg.classList.add("img-fluid");
      imgDiv.appendChild(imgImg);

      const textDiv = document.createElement("div");
      textDiv.classList.add(
        "col-lg-8",
        "m-auto",
        "p-3",
        "order-1",
        "order-lg-0"
      );

      const h3 = document.createElement("h3");
      h3.innerText = item.longName;
      if (index % 2 === 0) {
        rowDiv.classList.add("product-name-l");
      } else {
        rowDiv.classList.add("product-name-r");
      }
      textDiv.appendChild(h3);

      const p = document.createElement("p");
      p.classList.add("product-description");
      p.innerText = item.description;
      textDiv.appendChild(p);

      if (index % 2 === 0) {
        rowDiv.appendChild(imgDiv);
        rowDiv.appendChild(textDiv);
      } else {
        rowDiv.appendChild(textDiv);
        rowDiv.appendChild(imgDiv);
      }

      element.appendChild(rowDiv);
    });
  }
}

initiateProductDescriptions();

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

// function GetProductByCode(code) {
//   return items.find((item) => item.code === code);
// }

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

// Logic to generate jsId of orders

function GenerateJsId() {
  // clone selectedProducts
  let selectedProductsClone = [...selectedProducts];

  let generatedJsId = [];

  selectedProductsClone.forEach((product) => {
    const currentItem = GetProductByCode(product.id);
    const jsId = currentItem.jsId;
    const amount = product.amount;
    const completeId = `${jsId}-${amount}`;
    generatedJsId.push(completeId);
  });

  return generatedJsId.join("/");
}

// Clear Cart and Checkout

document.getElementById("clearCart").addEventListener("click", function () {
  selectedProducts = [];
  cartItem = 0;
  updateCartNumber();
  DisplaySelectedProducts();
});

document.getElementById("checkout").addEventListener("click", function () {
  if (selectedProducts.length > 0) {
    const jsid = GenerateJsId();

    const message = ` Saya ingin memesan Jamu dengan kode: *${jsid}*.
    Konfirmasi pesanan saya pada link berikut: ${baseRenderPage}order-details.html#${jsid}`;

    const url = baseWaLink + encodeURIComponent(haloMponJendez + message);
    const win = window.open(url, "_blank");
  } else {
    alert("Keranjang Belanja Kosong!");
  }
});

// Power up contact button

function PowerUpContactButton() {
  const buttonIds = ["contact-button", "contact-button2", "contact-button3"];

  buttonIds.map((buttonId) => {
    document.getElementById(buttonId).addEventListener("click", function () {
      const url = baseWaLink + encodeURIComponent(haloMponJendez);
      const win = window.open(url, "_blank");
    });
  });
}

PowerUpContactButton();
