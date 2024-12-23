// Fake categories
const categories = [
  "All",
  "Clothing",
  "Electronics",
  "Toys",
  "Home Decor",
  "Beauty"
];

// Fake products
const productsData = [
  {
    name: "Festive Sweater",
    price: 25.99,
    image: "https://via.placeholder.com/200",
    category: "Clothing"
  },
  {
    name: "Santa Hat",
    price: 5.99,
    image: "https://via.placeholder.com/200",
    category: "Clothing"
  },
  {
    name: "Toy Train",
    price: 15.0,
    image: "https://via.placeholder.com/200",
    category: "Toys"
  },
  {
    name: "Decorative Lights",
    price: 12.49,
    image: "https://via.placeholder.com/200",
    category: "Home Decor"
  },
  {
    name: "Headphones",
    price: 49.99,
    image: "https://via.placeholder.com/200",
    category: "Electronics"
  },
  {
    name: "Lipstick Set",
    price: 19.99,
    image: "https://via.placeholder.com/200",
    category: "Beauty"
  },
  {
    name: "Smart Watch",
    price: 99.99,
    image: "https://via.placeholder.com/200",
    category: "Electronics"
  }
];

// Cart array
let cart = [];

// DOM elements
const categoriesList = document.getElementById("categoriesList");
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const hamburgerBtn = document.getElementById("hamburgerBtn");

// Display categories in menu
function renderCategories() {
  categories.forEach(cat => {
    const li = document.createElement("li");
    li.textContent = cat;
    li.addEventListener("click", () => {
      filterByCategory(cat);
      toggleCategoriesList(false);
    });
    categoriesList.appendChild(li);
  });
}

// Render products
function renderProducts(products) {
  productsGrid.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = product.image;

    const name = document.createElement("div");
    name.className = "product-name";
    name.textContent = product.name;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = `$${product.price.toFixed(2)}`;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.addEventListener("click", () => addToCart(product));

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(addToCartBtn);

    productsGrid.appendChild(card);
  });
}

// Filter products by category
function filterByCategory(category) {
  if (category === "All") {
    renderProducts(productsData);
  } else {
    const filtered = productsData.filter(item => item.category === category);
    renderProducts(filtered);
  }
}

// Search products
function searchProducts() {
  const query = searchInput.value.toLowerCase();
  const filtered = productsData.filter(item =>
    item.name.toLowerCase().includes(query)
  );
  renderProducts(filtered);
}

// Add item to cart
function addToCart(product) {
  cart.push(product);
  updateCartButton();
}

// Update cart button text
function updateCartButton() {
  cartBtn.textContent = `Cart (${cart.length})`;
}

// Show/hide cart modal
cartBtn.addEventListener("click", () => {
  renderCartItems();
  cartModal.style.display = "block";
});

closeCart.addEventListener("click", () => {
  cartModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
});

// Render cart items in modal
function renderCartItems() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    total += item.price;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = total.toFixed(2);
}

// Toggle categories list on hamburger click
hamburgerBtn.addEventListener("click", () => {
  const currentDisplay = categoriesList.style.display;
  toggleCategoriesList(currentDisplay !== "block");
});

function toggleCategoriesList(show) {
  categoriesList.style.display = show ? "block" : "none";
}

// Event listeners
searchBtn.addEventListener("click", searchProducts);
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchProducts();
  }
});

// Initialize
renderCategories();
renderProducts(productsData);