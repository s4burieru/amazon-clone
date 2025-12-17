// String accumulator for the HTML of all product cards.
let productsHTML = "";

products.forEach((product) => {
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.priceCents / 100}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            product.id
          }">
            Add to Cart
          </button>
        </div>`;
});

// Insert the assembled products HTML into the grid container.
document.querySelector(".js-products-grid").innerHTML = productsHTML;

// Attach click handlers to every Add to Cart button.
// The handler reads the selected quantity and updates `window.cart`.
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // product id is stored on the button via data-product-id
    const productId = button.dataset.productId;

    // the quantity selector for this product uses a class with the
    // product id embedded, so query it and convert its value to a Number
    const quantity = Number(
      document.querySelector(`.js-quantity-selector-${productId}`).value
    );

    // Find an existing cart item with the same productId (if any)
    let matchingItem;
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    // If found, increment its quantity; otherwise add a new entry.
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId: productId,
        quantity: quantity,
      });
    }

    // Recalculate total items in cart and update the small cart badge
    // shown in the header (element `.js-cart-quantity`).
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    // Show the "Added" checkmark/text briefly inside the product card.
    // The element exists in the product HTML as `.js-added-to-cart`.
    const productContainer = button.closest(".product-container");
    if (productContainer) {
      const addedMsg = productContainer.querySelector(".js-added-to-cart");
      if (addedMsg) {
        // make visible
        addedMsg.style.opacity = 1;
        // hide again after a short delay
        setTimeout(() => {
          addedMsg.style.opacity = 0;
        }, 2000);
      }
    }
  });
});
