// Central Database Object Array - Expanded Menu Ecosystem
const FOOD_DATABASE = [
    { 
        id: "p1", 
        name: "Signature Cheese Pizza", 
        price: 12.50, 
        desc: "Freshly baked artisan crust topped with ultimate stretchy signature cheese blend.", 
        tag: "bestseller", 
        src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop" 
    },
    { 
        id: "p2", 
        name: "Ultimate Double Burger", 
        price: 8.99, 
        desc: "Flame-grilled double beef patties stacked with melted cheese, fresh greens, and tomatoes.", 
        tag: "bestseller", 
        src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop" 
    },
   
    { 
        id: "p4", 
        name: "Juicy Spaghetti Bolognese", 
        price: 10.50, 
        desc: "Rich Italian tomato meat sauce over artisan pasta seasoned with fresh herbs.", 
        tag: "rated", 
        src: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=600&auto=format&fit=crop" 
    },
    { 
        id: "p5", 
        name: "Crispy Golden Fries", 
        price: 3.50, 
        desc: "Perfectly sea-salted premium cut potatoes fried to a flawless golden crisp.", 
        tag: "rated", 
        src: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600&auto=format&fit=crop" 
    },
    { 
        id: "p6", 
        name: "Crunchy Chicken Nuggets", 
        price: 5.99, 
        desc: "Tender, juicy chicken white meat coated in a savory, crunchy seasoned breading.", 
        tag: "bestseller", 
        src: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600&auto=format&fit=crop" 
    },
    { 
        id: "p7", 
        name: "Fresh Caesar Salad", 
        price: 7.25, 
        desc: "Crisp romaine lettuce tossed with premium dressing, crunchy croutons, and parmesan.", 
        tag: "rated", 
        src: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=600&auto=format&fit=crop" 
    },
    { 
        id: "p8", 
        name: "Iced Caramel Macchiato", 
        price: 3.99, 
        desc: "Rich espresso combined with milk and vanilla syrup, topped off with a caramel drizzle.", 
        tag: "rated", 
        src: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop" 
    },
    { 
        id: "d1", 
        name: "Classic Cola Float", 
        price: 2.99, 
        desc: "Chilled vintage cola served over crushed ice with a rich scoop of vanilla bean ice cream.", 
        tag: "bestseller", 
        category: "drink",
        src: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop" 
    },
    { 
        id: "d2", 
        name: "Fresh Mint Mojito", 
        price: 4.25, 
        desc: "Ultra-refreshing blend of muddled lime wedges, fresh garden mint, sugar cane, and sparkling soda.", 
        tag: "rated", 
        category: "drink",
        src: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop" 
    },
    { 
        id: "d3", 
        name: "Strawberry Lemonade", 
        price: 3.50, 
        desc: "Tart, freshly squeezed lemons paired perfectly with sweet, pureed organic strawberries.", 
        tag: "rated", 
        category: "drink",
        src: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop" 
    },
    { 
        id: "d4", 
        name: "Matcha Green Tea Latte", 
        price: 4.50, 
        desc: "Premium stone-ground Japanese matcha whisked smooth with steamed oat milk.", 
        tag: "bestseller", 
        category: "drink",
        src: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=600&auto=format&fit=crop" 
    },
    { 
        id: "d5", 
        name: "Tropical Mango Smoothie", 
        price: 4.99, 
        desc: "Thick and creamy blend of ripe tropical mangoes, Greek yogurt, and a touch of wild honey.", 
        tag: "rated", 
        category: "drink",
        src: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=600&auto=format&fit=crop" 
    }
];

let cartState = [];
let favoriteIds = [];
const DELIVERY_CHARGE = 2.50;

// On window load initialization 
window.onload = function() {
    renderDishesGrid(FOOD_DATABASE, 'dishesGrid');
    updateCartUI();
};

// SIDEBAR BUTTON CLICK ROUTING LOGIC
function switchView(viewId, clickedButton) {
    document.querySelectorAll('.app-view').forEach(view => {
        view.classList.remove('active-view');
    });
    document.querySelectorAll('.sidebar-item').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(viewId).classList.add('active-view');
    clickedButton.classList.add('active');

    if(viewId === 'favs-view') {
        renderFavorites();
    }
}

// Render card layouts onto target layout zones
function renderDishesGrid(items, targetContainerId) {
    const container = document.getElementById(targetContainerId);
    if(items.length === 0) {
        container.innerHTML = `<p style="color: var(--text-gray); grid-column: 1/-1;">No matching dishes found.</p>`;
        return;
    }

    container.innerHTML = items.map(dish => {
        const isFav = favoriteIds.includes(dish.id) ? 'is-favorite' : '';
        return `
        <div class="product-card">
            <button class="fav-toggle-btn ${isFav}" onclick="toggleFavorite('${dish.id}', this)">
                <i class="fas fa-heart"></i>
            </button>
            <div class="card-img-wrapper"><img class="product-img" src="${dish.src}" alt="${dish.name}"></div>
            <div class="card-details">
                <div class="card-header">
                    <h4 class="product-title">${dish.name}</h4>
                    <span class="product-price">$${dish.price.toFixed(2)}</span>
                </div>
                <p class="product-desc">${dish.desc}</p>
                <div class="card-meta">
                    <span><i class="fas fa-clock"></i>15-30mn</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart('${dish.id}')"><i class="fas fa-plus"></i></button>
            </div>
        </div>`;
    }).join('');
}

// Home Tab Category Chip Filter
function filterCategory(category, button) {
    document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
    button.classList.add('active');

    if(category === 'all') {
        document.getElementById('grid-title').innerText = "Recommended For You";
        renderDishesGrid(FOOD_DATABASE, 'dishesGrid');
    } else {
        document.getElementById('grid-title').innerText = category === 'bestseller' ? "Best Sellers" : "Top Rated";
        const filtered = FOOD_DATABASE.filter(d => d.tag === category);
        renderDishesGrid(filtered, 'dishesGrid');
    }
}

// Real-time Global Input Filter Search Logic
function executeGlobalSearch() {
    const query = document.getElementById('globalSearchInput').value.toLowerCase().trim();
    if(!query) {
        document.getElementById('searchResultsGrid').innerHTML = `<p style="color: var(--text-gray);">Start typing above to search dishes live...</p>`;
        return;
    }
    const matchingItems = FOOD_DATABASE.filter(dish => dish.name.toLowerCase().includes(query) || dish.desc.toLowerCase().includes(query));
    renderDishesGrid(matchingItems, 'searchResultsGrid');
}

// Manage Favorite State array
function toggleFavorite(id, element) {
    if(favoriteIds.includes(id)) {
        favoriteIds = favoriteIds.filter(fId => fId !== id);
        element.classList.remove('is-favorite');
    } else {
        favoriteIds.push(id);
        element.classList.add('is-favorite');
    }
    if(document.getElementById('favs-view').classList.contains('active-view')) {
        renderFavorites();
    }
}

function renderFavorites() {
    const favItems = FOOD_DATABASE.filter(dish => favoriteIds.includes(dish.id));
    if(favItems.length === 0) {
        document.getElementById('favoritesGrid').innerHTML = `
        <div class="placeholder-view" style="grid-column: 1/-1;">
            <i class="fas fa-heart"></i>
            <p>No favorite items selected yet.</p>
        </div>`;
    } else {
        renderDishesGrid(favItems, 'favoritesGrid');
    }
}

// Add to Cart Mutation
function addToCart(productId) {
    const product = FOOD_DATABASE.find(d => d.id === productId);
    const existingItem = cartState.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartState.push({ 
            id: productId, 
            name: product.name, 
            price: product.price, 
            src: product.src, 
            quantity: 1 
        });
    }
    updateCartUI();
}

function changeQuantity(productId, delta) {
    const item = cartState.find(item => item.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cartState = cartState.filter(i => i.id !== productId);
    }
    updateCartUI();
}

// Sync State to layout sidebars with design patches
function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cartState.length === 0) {
        container.innerHTML = `
            <div class="cart-empty-state">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
            </div>`;
        document.getElementById('subtotalCost').innerText = "$0.00";
        document.getElementById('deliveryCost').innerText = "$0.00";
        document.getElementById('totalCost').innerText = "$0.00";
        checkoutBtn.disabled = true;
        return;
    }

    container.innerHTML = cartState.map(item => `
        <div class="cart-item-row" style="display: flex; align-items: center; gap: 12px; margin-bottom: 4px;">
            <img src="${item.src}" alt="${item.name}" class="cart-item-thumb" style="width: 50px; height: 50px; object-fit: cover; border-radius: 10px;">
            <div class="cart-item-info" style="flex: 1;">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div class="quantity-controls">
                <button onclick="changeQuantity('${item.id}', -1)"><i class="fas fa-minus"></i></button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity('${item.id}', 1)"><i class="fas fa-plus"></i></button>
            </div>
        </div>
    `).join('');

    const subtotal = cartState.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + DELIVERY_CHARGE;

    document.getElementById('subtotalCost').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('deliveryCost').innerText = `$${DELIVERY_CHARGE.toFixed(2)}`;
    document.getElementById('totalCost').innerText = `$${total.toFixed(2)}`;
    checkoutBtn.disabled = false;
}

function processPayout() {
    document.getElementById('paymentModal').classList.add('active');
}

function closeModal() {
    document.getElementById('paymentModal').classList.remove('active');
    cartState = [];
    updateCartUI();
}
function filterCategory(category, button) {
    document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
    button.classList.add('active');

    if(category === 'all') {
        document.getElementById('grid-title').innerText = "Recommended For You";
        renderDishesGrid(FOOD_DATABASE, 'dishesGrid');
    } else if (category === 'drink') {
        document.getElementById('grid-title').innerText = "Refreshing Beverages";
        const filtered = FOOD_DATABASE.filter(d => d.category === 'drink');
        renderDishesGrid(filtered, 'dishesGrid');
    } else {
        document.getElementById('grid-title').innerText = category === 'bestseller' ? "Best Sellers" : "Top Rated";
        const filtered = FOOD_DATABASE.filter(d => d.tag === category);
        renderDishesGrid(filtered, 'dishesGrid');
    }
}