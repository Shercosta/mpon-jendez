var cartItem = 0;

if (cartItem > 0) {
  document.getElementById("cartnumber").style.visibility = "visible";
} else {
  document.getElementById("cartnumber").style.visibility = "hidden";
}

const items = [
  {
    code: "item1",
    name: "Jamu 1",
    price: 100,
  },
  {
    code: "item2",
    name: "Jamu 2",
    price: 200,
  },
  {
    code: "item3",
    name: "Jamu 3",
    price: 300,
  },
];

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
