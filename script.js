let products = [
  {
    product_id: 1,
    product_name: "Rice",
    product_price: 6,
    product_quantity: 2,
    product_measurement_unit: "Kg",
  },
  {
    product_id: 2,
    product_name: "Sugar",
    product_price: 7,
    product_quantity: 1,
    product_measurement_unit: "Kg",
  },
  {
    product_id: 3,
    product_name: "Atta",
    product_price: 5,
    product_quantity: 2,
    product_measurement_unit: "Kg",
  },
  {
    product_id: 4,
    product_name: "Milk",
    product_price: 4,
    product_quantity: 1,
    product_measurement_unit: "L",
  },
];
let cart = [];

let productList = document.querySelector(".product-list");
let productsInCart = document.querySelector(".product-cart");
let totalDisplay = document.querySelector(".total");

//Function to render the products to the table from the array
function renderProductToList() {
  products.forEach((element) => {
    let tr = document.createElement("tr");
    tr.setAttribute("class", "product-row");
    tr.innerHTML = `<td>${element.product_name}</td>
          <td>${element.product_quantity}${element.product_measurement_unit}</td>
          <td>${element.product_price}$</td>
          <td><a href="#" class="btn__add-to-cart" ><i class="fa-solid fa-cart-plus" data-id="${element.product_id}"></i></a></td>
          `;
    productList.appendChild(tr);
  });
}

//Adding Event listeners to all the cart buttons
function addEventListeners() {
  let btnAddToCart = document.querySelectorAll(".btn__add-to-cart");
  console.log(btnAddToCart);
  btnAddToCart.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      let targetId = event.target.getAttribute("data-id");
      addProductToCart(parseInt(targetId));
    });
  });
}

//Adding product to cart
function addProductToCart(id) {
  let clickedElement = products.findIndex(
    (product) => product.product_id === parseInt(id)
  );

  let selectedProduct = products[clickedElement];
  cart.push(selectedProduct);
  applyDiscount(cart);
  let tr = document.createElement("tr");
  tr.setAttribute("class", "product-row");
  tr.innerHTML = `<td>${selectedProduct.product_name}</td>
        <td>${selectedProduct.product_quantity}${selectedProduct.product_measurement_unit}</td>
        <td>${selectedProduct.product_price}$</td>`;
  productsInCart.appendChild(tr);
}

function applyDiscount(products) {
  let total = 0;
  let discountDisplay = document.querySelector(".discount");
  let savedDisplay = document.querySelector(".saved");
  for (let i = 0; i < products.length; i++) {
    total += products[i].product_price;
  }
  totalDisplay.innerHTML = "Total : $" + total;
  let discount = (total / 100) * 10;
  if (discount < 1) {
    discount = discount * 10;
    discountDisplay.innerHTML =
      "Discount (10%) - you saved : " + discount + " cents";
  } else {
    discountDisplay.innerHTML =
      "Discount (10%) you saved : $" + discount.toFixed(2);
  }
}
renderProductToList();
addEventListeners();
