(function () {
  var API_BASE_URL = window.API_BASE_URL || "http://localhost:5000";
  var fallbackMenuItems = [
  {
    "name": "Green Goddess Vegan Burger",
    "description": "Plant-based patty, avocado, lettuce, tomato, pickles, and basil cashew sauce.",
    "price": 10.99,
    "category": "Burgers",
    "image": "assets/menu-green-goddess-burger.png"
  },
  {
    "name": "BBQ Jackfruit Burger",
    "description": "Pulled jackfruit, smoky barbecue sauce, slaw, grilled onions, and toasted bun.",
    "price": 11.5,
    "category": "Burgers",
    "image": "assets/menu-bbq-jackfruit-burger.png"
  },
  {
    "name": "Rainbow Rice & Beans Bowl",
    "description": "Rice, beans, avocado, salsa, greens, and a choice of jerk tofu, mushroom steak, or chickpea bites.",
    "price": 12.0,
    "category": "Mains",
    "image": "assets/menu-rainbow-rice-beans-bowl.png"
  },
  {
    "name": "Coconut Curry Chickpea Bowl",
    "description": "Creamy coconut curry with chickpeas, spinach, sweet potato, herbs, and steamed rice.",
    "price": 11.75,
    "category": "Mains",
    "image": "assets/menu-coconut-curry-chickpea-bowl.png"
  },
  {
    "name": "Garden Veggie Pizza",
    "description": "Crisp crust with tomato sauce, vegan cheese, peppers, mushrooms, olives, and basil.",
    "price": 13.25,
    "category": "Pizza",
    "image": "assets/menu-garden-veggie-pizza.png"
  },
  {
    "name": "Hummus Veggie Rolls",
    "description": "Soft wraps filled with hummus, cucumber, carrots, avocado, greens, and lemon-tahini drizzle.",
    "price": 8.5,
    "category": "Rolls",
    "image": "assets/menu-hummus-veggie-rolls.png"
  },
  {
    "name": "Cauliflower Tacos",
    "description": "Roasted cauliflower tacos with crunchy slaw, herbs, and creamy vegan sauce in soft tortillas.",
    "price": 6.95,
    "category": "Sides",
    "image": "assets/menu-cauliflower-tacos.png"
  },
  {
    "name": "Sweet Potato Fries",
    "description": "Crispy sweet potato fries served hot in a green box with sea salt.",
    "price": 5.99,
    "category": "Sides",
    "image": "assets/menu-sweet-potato-fries.png"
  },
  {
    "name": "Avocado Kale Power Salad",
    "description": "A vibrant salad with kale, avocado, roasted corn, tomatoes, seeds, vinaigrette, and chickpeas.",
    "price": 8.95,
    "category": "Mains",
    "image": "assets/menu-avocado-kale-salad.png"
  },
  {
    "name": "Mango Coconut Parfait",
    "description": "Coconut yogurt, mango pur\u00e9e, granola, toasted coconut, and berries.",
    "price": 5.5,
    "category": "Dessert",
    "image": "assets/menu-mango-coconut-parfait.png"
  },
  {
    "name": "Chocolate Avocado Brownie",
    "description": "Fudgy dairy-free brownie made with cacao, avocado, and a decadent chocolate finish.",
    "price": 4.95,
    "category": "Dessert",
    "image": "assets/menu-chocolate-avocado-brownie.png"
  },
  {
    "name": "Mint Cucumber Lemonade",
    "description": "Fresh lemon, cucumber, mint, agave, and sparkling water served over ice.",
    "price": 3.75,
    "category": "Drinks",
    "image": "assets/menu-mint-cucumber-lemonade.png"
  }
];
  var menuItems = [];
  var cart = [];
  var galleryIndex = 0;
  var galleryTimer;
  var currentFilter = "All";

  var sessionId = localStorage.getItem("veganBiteSessionId");
  if (!sessionId) {
    sessionId = "vb-" + Date.now() + "-" + Math.random().toString(16).slice(2);
    localStorage.setItem("veganBiteSessionId", sessionId);
  }

  function money(value) { return "$" + Number(value).toFixed(2); }

  function api(path, options) {
    options = options || {};
    return fetch(API_BASE_URL + path, {
      method: options.method || "GET",
      headers: { "Content-Type": "application/json" },
      body: options.body ? JSON.stringify(options.body) : undefined
    }).then(function (response) {
      if (!response.ok) {
        return response.json().catch(function () { return {}; }).then(function (errorBody) {
          throw new Error(errorBody.message || "API request failed");
        });
      }
      return response.json();
    });
  }

  function saveCartLocal() {
    localStorage.setItem("veganBiteCartNoBlank", JSON.stringify(cart));
  }

  function persistCart() {
    saveCartLocal();
    return api("/api/cart/" + sessionId, { method: "PUT", body: { items: cart } })
      .catch(function (error) { console.warn("Cart saved locally, but not to database:", error.message); });
  }

  function openCart() {
    var drawer = document.querySelector(".cart-drawer");
    var backdrop = document.querySelector(".cart-backdrop");
    if (drawer) drawer.classList.add("open");
    if (backdrop) backdrop.classList.add("show");
  }

  function closeCart() {
    var drawer = document.querySelector(".cart-drawer");
    var backdrop = document.querySelector(".cart-backdrop");
    if (drawer) drawer.classList.remove("open");
    if (backdrop) backdrop.classList.remove("show");
  }

  function renderFilters() {
    var filterBar = document.querySelector(".filter-bar");
    if (!filterBar) return;
    var categories = ["All"];
    menuItems.forEach(function (item) { if (categories.indexOf(item.category) === -1) categories.push(item.category); });
    filterBar.innerHTML = categories.map(function (category) {
      return '<button class="filter-btn ' + (category === currentFilter ? 'active' : '') + '" type="button" data-filter="' + category + '">' + category + '</button>';
    }).join("");
  }

  function renderMenu() {
    var grid = document.querySelector(".menu-grid");
    if (!grid) return;
    var items = currentFilter === "All" ? menuItems : menuItems.filter(function (item) { return item.category === currentFilter; });
    grid.innerHTML = items.map(function (item) {
      var id = item._id || item.id || item.name;
      return '<article class="menu-card" data-id="' + id + '" data-category="' + item.category + '" data-name="' + item.name + '" data-price="' + item.price + '">' +
        '<img src="' + item.image + '" alt="' + item.name + '" class="menu-img">' +
        '<div class="menu-card-body"><h3>' + item.name + '</h3><p>' + item.description + '</p>' +
        '<div class="menu-bottom"><span class="price">' + money(item.price) + '</span><button class="add-btn" type="button">Add</button></div></div>' +
        '</article>';
    }).join("");
  }

  function addToCart(itemId) {
    var item = menuItems.find(function (menuItem) { return String(menuItem._id || menuItem.id || menuItem.name) === String(itemId); });
    if (!item) return;
    var id = item._id || item.id;
    var existing = cart.find(function (cartItem) { return String(cartItem.menuItem || cartItem.name) === String(id || item.name); });
    if (existing) existing.quantity += 1;
    else cart.push({ menuItem: id, name: item.name, price: Number(item.price), quantity: 1 });
    renderCart();
    persistCart();
    openCart();
  }

  function changeQuantity(identifier, amount) {
    cart = cart.map(function (item) {
      if (String(item.menuItem || item.name) === String(identifier)) {
        item.quantity += amount;
      }
      return item;
    }).filter(function (item) { return item.quantity > 0; });
    renderCart();
    persistCart();
  }

  function removeFromCart(identifier) {
    cart = cart.filter(function (item) { return String(item.menuItem || item.name) !== String(identifier); });
    renderCart();
    persistCart();
  }

  function clearCart() {
    cart = [];
    localStorage.removeItem("veganBiteCartNoBlank");
    renderCart();
    api("/api/cart/" + sessionId, { method: "DELETE" })
      .catch(function (error) { console.warn("Cart cleared locally, but not in database:", error.message); });
  }

  function renderCart() {
    var count = cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    var total = cart.reduce(function (sum, item) { return sum + item.price * item.quantity; }, 0);
    document.querySelectorAll(".cart-count").forEach(function (node) { node.textContent = count; });
    var totalNode = document.querySelector(".cart-total");
    if (totalNode) totalNode.textContent = money(total);
    var itemsNode = document.querySelector(".cart-items");
    if (!itemsNode) return;
    if (cart.length === 0) {
      itemsNode.innerHTML = '<div class="empty-cart">Your cart is empty. Open the menu and click a vegan food item to add it.</div>';
      return;
    }
    itemsNode.innerHTML = cart.map(function (item) {
      var identifier = item.menuItem || item.name;
      return '<div class="cart-item"><div><h3>' + item.name + '</h3><p>' + money(item.price) + ' each</p>' +
        '<div class="quantity-controls"><button class="quantity-btn" type="button" data-cart-id="' + identifier + '" data-change="-1">−</button>' +
        '<strong>' + item.quantity + '</strong><button class="quantity-btn" type="button" data-cart-id="' + identifier + '" data-change="1">+</button></div></div>' +
        '<div class="cart-item-price"><strong>' + money(item.price * item.quantity) + '</strong>' +
        '<button class="remove-btn" type="button" data-remove-id="' + identifier + '">Remove</button></div></div>';
    }).join("");
  }

  function checkout() {
    if (cart.length === 0) { alert("Your cart is empty."); return; }
    var customerName = prompt("Enter your name for the order:");
    if (!customerName) return;
    var customerEmail = prompt("Enter your email:");
    if (!customerEmail) return;
    var customerPhone = prompt("Enter your phone number, or leave blank:") || "";
    api("/api/orders", {
      method: "POST",
      body: { customerName: customerName, customerEmail: customerEmail, customerPhone: customerPhone, sessionId: sessionId, items: cart }
    }).then(function (order) {
      cart = [];
      localStorage.removeItem("veganBiteCartNoBlank");
      renderCart();
      closeCart();
      alert("Thank you! Your order was saved to MongoDB. Order ID: " + order._id);
    }).catch(function (error) {
      alert("Order could not be saved: " + error.message);
    });
  }

  function setGallery(index) {
    var track = document.querySelector(".gallery-track");
    var slides = document.querySelectorAll(".gallery-slide");
    var dots = document.querySelectorAll(".gallery-dots button");
    if (!track || slides.length === 0) return;
    galleryIndex = (index + slides.length) % slides.length;
    track.style.transform = "translateX(-" + (galleryIndex * 100) + "%)";
    dots.forEach(function (dot, i) { dot.classList.toggle("active", i === galleryIndex); });
  }

  function initGallery() {
    var dotsContainer = document.querySelector(".gallery-dots");
    var slides = document.querySelectorAll(".gallery-slide");
    if (!dotsContainer || slides.length === 0) return;
    dotsContainer.innerHTML = "";
    slides.forEach(function (_, index) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Go to slide " + (index + 1));
      dot.addEventListener("click", function () { setGallery(index); });
      dotsContainer.appendChild(dot);
    });
    setGallery(0);
    clearInterval(galleryTimer);
    galleryTimer = setInterval(function () { setGallery(galleryIndex + 1); }, 5000);
  }

  function initContactForms() {
    document.querySelectorAll(".contact-form").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        form.reset();
        var message = form.parentElement.querySelector(".success-message");
        if (message) {
          message.hidden = false;
          setTimeout(function () { message.hidden = true; }, 2500);
        }
      });
    });
  }

  function loadMenuItems() {
    return api("/api/menu").then(function (items) {
      menuItems = items;
    }).catch(function (error) {
      console.warn("Using fallback menu because backend is not reachable:", error.message);
      menuItems = fallbackMenuItems;
    }).then(function () {
      renderFilters();
      renderMenu();
    });
  }

  function loadCart() {
    return api("/api/cart/" + sessionId).then(function (savedCart) {
      cart = Array.isArray(savedCart.items) ? savedCart.items : [];
    }).catch(function () {
      try { cart = JSON.parse(localStorage.getItem("veganBiteCartNoBlank")) || []; }
      catch (error) { cart = []; }
    }).then(renderCart);
  }

  document.addEventListener("click", function (event) {
    var hamburger = event.target.closest(".hamburger");
    if (hamburger) {
      var nav = document.querySelector(".nav-content");
      if (nav) nav.classList.toggle("open");
      return;
    }

    if (event.target.closest(".cart-button")) { openCart(); return; }
    if (event.target.closest(".close-btn") || event.target.closest(".cart-backdrop")) { closeCart(); return; }
    if (event.target.closest(".clear-btn")) { clearCart(); return; }
    if (event.target.closest(".checkout-btn")) { checkout(); return; }

    var addButton = event.target.closest(".add-btn");
    if (addButton) {
      var addCard = addButton.closest(".menu-card");
      if (addCard) addToCart(addCard.dataset.id || addCard.dataset.name);
      return;
    }

    var menuCard = event.target.closest(".menu-card");
    if (menuCard && !event.target.closest("button")) { addToCart(menuCard.dataset.id || menuCard.dataset.name); return; }

    var filterButton = event.target.closest(".filter-btn");
    if (filterButton) {
      currentFilter = filterButton.dataset.filter;
      renderFilters();
      renderMenu();
      return;
    }

    var quantityButton = event.target.closest(".quantity-btn");
    if (quantityButton) { changeQuantity(quantityButton.dataset.cartId, Number(quantityButton.dataset.change)); return; }

    var removeButton = event.target.closest(".remove-btn");
    if (removeButton) { removeFromCart(removeButton.dataset.removeId); return; }

    if (event.target.closest(".slider-btn.prev")) { setGallery(galleryIndex - 1); return; }
    if (event.target.closest(".slider-btn.next")) { setGallery(galleryIndex + 1); return; }

    var navLink = event.target.closest(".nav-link");
    if (navLink) {
      document.querySelectorAll(".nav-link").forEach(function (link) { link.classList.remove("active"); });
      navLink.classList.add("active");
      var navContent = document.querySelector(".nav-content");
      if (navContent) navContent.classList.remove("open");
    }
  });

  document.addEventListener("keydown", function (event) { if (event.key === "Escape") closeCart(); });

  document.addEventListener("DOMContentLoaded", function () {
    initGallery();
    initContactForms();
    loadMenuItems().then(loadCart);
  });
})();
