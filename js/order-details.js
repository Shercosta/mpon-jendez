import { items } from "./items.js";
import { GetProductByCode, nominalize } from "./core-functions.js";

const currentURL = window.location.href;
const orderId = currentURL.split("#").pop();
const orderIdArr = orderId.split("/");
let selectedProducts = [];

console.log(orderIdArr);

orderIdArr.forEach((order) => {
  const [jsId, amount] = order.split("-");
  selectedProducts.push({
    id: items.find((item) => item.jsId === jsId).code,
    amount: parseInt(amount),
  });
});

console.log(selectedProducts);

function MainOrderDetails() {
  document.getElementById("MainOrderDetails").innerHTML = `<tr>
              <th>Nama Item</th>
              <th>Jumlah</th>
              <th>Total Harga</th>
            </tr>`;

  let totalOrders = 0;

  selectedProducts.map((product) => {
    const currentItem = GetProductByCode(product.id);

    const tr = document.createElement("tr");

    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td5 = document.createElement("td");

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

    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td5);

    document.getElementById("MainOrderDetails").appendChild(tr);
  });

  // update Total Belanja

  document.getElementById("calculatedTotalOrders").innerText =
    "Rp. " + nominalize(totalOrders);
}

MainOrderDetails();
