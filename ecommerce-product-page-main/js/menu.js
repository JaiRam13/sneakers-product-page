let toggleButton = document.querySelector(".js-toggle-button");
toggleButton.addEventListener("click", () => {
  let sideBar = document.querySelector(".js-visible");
  sideBar.classList.toggle("visible");
});

let cartDisplay = document.querySelector(".js-cart-logo");
cartDisplay.addEventListener("click", () => {
  let cartDetails = document.querySelector(".js-cart-details");
  cartDetails.classList.toggle("cart-details-active");
});

let mainImage = document.getElementById("js-main-image");
let clickedicons = document.querySelectorAll(".js-small-icons");
clickedicons.forEach((clickedicon) =>
  clickedicon.addEventListener("click", () => {
    mainImage.src = clickedicon.src.replace("-thumbnail", "");
  }),
);

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");

mainImage.addEventListener("click", () => {
  lightbox.classList.add("active");
  lightboxImg.src = mainImage.src;
});

closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

const images = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];

let currentIndex = 0;
mainImage.addEventListener("click", () => {
  let currentImage = lightboxImg.src;
  currentIndex = images.findIndex((img) => currentImage.includes(img));
});

function prevImage() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
}

function nextImage() {
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
}
function prevCombined(className, imageChanged) {
  document.querySelector(className).addEventListener("click", (e) => {
    e.stopPropagation();
    prevImage();
    imageChanged.src = images[currentIndex];
  });
}

function nextCombined(className, imageChanged) {
  document.querySelector(className).addEventListener("click", (e) => {
    e.stopPropagation();
    nextImage();
    imageChanged.src = images[currentIndex];
  });
}

function updateLightboxImage() {
  lightboxImg.src = images[currentIndex];
}

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) return;

  if (event.key === "ArrowLeft") {
    prevImage();
    updateLightboxImage();
  } else if (event.key === "ArrowRight") {
    nextImage();
    updateLightboxImage();
  } else if (event.key === "Escape") {
    lightbox.classList.remove("active");
  }
});

prevCombined(".prev-icon", mainImage);
nextCombined(".next-icon", mainImage);
prevCombined(".js-prev-icon", lightboxImg);
nextCombined(".js-next-icon", lightboxImg);

document.querySelector(".js-minus").addEventListener("click", () => {
  let quantity = Number(document.querySelector(".js-quantity").innerHTML);
  quantity = quantity > 0 ? quantity - 1 : 0;
  document.querySelector(".js-quantity").innerHTML = quantity;
});

document.querySelector(".js-plus").addEventListener("click", () => {
  let quantity = Number(document.querySelector(".js-quantity").innerHTML);
  quantity = quantity + 1;
  document.querySelector(".js-quantity").innerHTML = quantity;
});

let cartQuantity = 0;
document.querySelector(".js-add-to-cart").addEventListener("click", () => {
  let quantity = Number(document.querySelector(".js-quantity").innerHTML);

  if (quantity === 0) return;

  cartQuantity += quantity;

  updateCartUI();
});

function updateCartUI() {
  const cartInfo = document.querySelector(".js-cart-info");

  if (cartQuantity === 0) {
    cartInfo.innerHTML = `<p>Your cart is empty</p>`;
    return;
  }

  cartInfo.innerHTML = `
    <div class="inside-cart-flex">
      <img class="inside-cart-image" src="images/image-product-1-thumbnail.jpg">

      <p class="inside-cart-text">
        Fall Limited Edition Sneakers <br>
        $125.00 x ${cartQuantity}
        <strong>
          <span style="color:black">
            $${(125 * cartQuantity).toFixed(2)}
          </span>
        </strong>
      </p>

      <img class="delete-icon js-delete-icon" src="images/icon-delete.svg">
    </div>

    <p class="checkout">Checkout</p>
  `;
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-delete-icon")) {
    cartQuantity = 0;
    updateCartUI();
  }
});
