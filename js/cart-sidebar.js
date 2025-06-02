// Modern Cart Sidebar Functionality

document.addEventListener('DOMContentLoaded', function() {
    initModernCartSidebar();
});

function initModernCartSidebar() {
    // Elements
    const cartIcon = document.querySelector('.cart-icon, .cart-btn');
    const cartClose = document.querySelector('.cart-close');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.overlay');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalAmountElement = document.querySelector('.total-amount');
    const checkoutButton = document.querySelector('.btn-checkout');
    
    // Initialize cart from localStorage
    loadCartFromStorage();
    
    // Update cart count
    updateCartCount();
    
    // Event Listeners
    if (cartIcon && cartClose && cartSidebar && overlay) {
        // Open cart sidebar
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            openCartSidebar();
        });
        
        // Close cart sidebar
        cartClose.addEventListener('click', closeCartSidebar);
        
        // Close cart when clicking on overlay
        overlay.addEventListener('click', closeCartSidebar);
        
        // Close cart on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && cartSidebar.classList.contains('active')) {
                closeCartSidebar();
            }
        });
        
        // Checkout button
        if (checkoutButton) {
            checkoutButton.addEventListener('click', function() {
                window.location.href = 'checkout-with-inventory.html';
            });
        }
    }
    
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart, .add-to-cart');
    addToCartButtons.forEach(button => {
        if (!button.disabled) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get product data
                let productData = {};
                
                // Check if button is in product card or product detail page
                const productCard = this.closest('.product-card') || this.closest('.favorite-card');
                const productDetail = this.closest('.product-actions');
                
                if (productCard) {
                    // Product from card
                    productData = {
                        id: productCard.getAttribute('data-product-id') || generateProductId(),
                        name: productCard.querySelector('h3, .product-title').textContent.trim(),
                        price: parseFloat(productCard.querySelector('.product-price, .favorite-price').textContent.replace('TL', '').replace(',', '.').trim()),
                        image: productCard.querySelector('img').src,
                        size: 'medium', // Default size
                        frame: 'none',   // Default frame
                        quantity: 1
                    };
                } else if (productDetail) {
                    // Product from detail page
                    const productContainer = document.querySelector('.product-detail');
                    const sizeSelect = document.querySelector('#size');
                    const frameSelect = document.querySelector('#frame');
                    const quantityInput = document.querySelector('#quantity');
                    
                    productData = {
                        id: productContainer.getAttribute('data-product-id') || generateProductId(),
                        name: document.querySelector('.product-title').textContent.trim(),
                        price: parseFloat(document.querySelector('.product-price').textContent.replace('TL', '').replace(',', '.').trim()),
                        image: document.querySelector('.product-image-main img').src,
                        size: sizeSelect ? sizeSelect.value : 'medium',
                        frame: frameSelect ? frameSelect.value : 'none',
                        quantity: quantityInput ? parseInt(quantityInput.value) : 1
                    };
                } else {
                    // Fallback for other cases
                    return;
                }
                
                // Add to cart
                addToCart(productData);
                
                // Show notification
                showNotification(`${productData.name} sepete eklendi!`);
                
                // Open cart sidebar
                openCartSidebar();
            });
        }
    });
}

// Open cart sidebar
function openCartSidebar() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.overlay');
    
    if (cartSidebar && overlay) {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('no-scroll');
    }
}

// Close cart sidebar
function closeCartSidebar() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.overlay');
    
    if (cartSidebar && overlay) {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}

// Add product to cart
function addToCart(productData) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => 
        item.id === productData.id && 
        item.size === productData.size && 
        item.frame === productData.frame
    );
    
    if (existingProductIndex !== -1) {
        // Update quantity if product exists
        cart[existingProductIndex].quantity += productData.quantity;
    } else {
        // Add new product to cart
        cart.push(productData);
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart UI
    renderCart();
    updateCartCount();
}

// Remove product from cart
function removeFromCart(index) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Remove product
    cart.splice(index, 1);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart UI
    renderCart();
    updateCartCount();
}

// Update product quantity
function updateProductQuantity(index, quantity) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update quantity
    cart[index].quantity = quantity;
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart UI
    renderCart();
    updateCartCount();
}

// Load cart from localStorage
function loadCartFromStorage() {
    renderCart();
}

// Render cart items
function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const totalAmountElement = document.querySelector('.total-amount');
    
    if (!cartItemsContainer) return;
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Clear cart items container
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        // Show empty cart message
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class="fas fa-shopping-cart"></i>
                <p>Sepetinizde ürün bulunmamaktadır.</p>
                <button class="btn btn-outline continue-shopping">Alışverişe Devam Et</button>
            </div>
        `;
        
        // Add event listener to continue shopping button
        const continueShoppingButton = cartItemsContainer.querySelector('.continue-shopping');
        if (continueShoppingButton) {
            continueShoppingButton.addEventListener('click', function() {
                closeCartSidebar();
            });
        }
        
        // Update total
        if (totalAmountElement) {
            totalAmountElement.textContent = '0.00 TL';
        }
        
        return;
    }
    
    // Calculate total
    let total = 0;
    
    // Add each item to cart
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-meta">
                    <span>${formatSize(item.size)}</span>
                    <span>${formatFrame(item.frame)}</span>
                </div>
                <div class="cart-item-price-qty">
                    <span class="cart-item-price">${item.price.toFixed(2)} TL</span>
                    <div class="cart-item-quantity">
                        <button class="quantity-minus" data-index="${index}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" data-index="${index}">
                        <button class="quantity-plus" data-index="${index}">+</button>
                    </div>
                </div>
            </div>
            <button class="cart-item-remove" data-index="${index}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Update total
    if (totalAmountElement) {
        totalAmountElement.textContent = `${total.toFixed(2)} TL`;
    }
    
    // Add event listeners to quantity buttons and remove buttons
    addCartItemEventListeners();
}

// Add event listeners to cart items
function addCartItemEventListeners() {
    const quantityMinusButtons = document.querySelectorAll('.cart-item .quantity-minus');
    const quantityPlusButtons = document.querySelectorAll('.cart-item .quantity-plus');
    const quantityInputs = document.querySelectorAll('.cart-item .quantity-input');
    const removeButtons = document.querySelectorAll('.cart-item .cart-item-remove');
    
    // Decrease quantity
    quantityMinusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
            let value = parseInt(input.value);
            
            if (value > 1) {
                value--;
                input.value = value;
                updateProductQuantity(index, value);
            }
        });
    });
    
    // Increase quantity
    quantityPlusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
            let value = parseInt(input.value);
            
            if (value < 10) {
                value++;
                input.value = value;
                updateProductQuantity(index, value);
            }
        });
    });
    
    // Input change
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const index = parseInt(this.getAttribute('data-index'));
            let value = parseInt(this.value);
            
            if (isNaN(value) || value < 1) {
                value = 1;
            } else if (value > 10) {
                value = 10;
            }
            
            this.value = value;
            updateProductQuantity(index, value);
        });
    });
    
    // Remove item
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeFromCart(index);
        });
    });
}

// Update cart count
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate total quantity
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update all cart count elements
    cartCountElements.forEach(element => {
        element.textContent = totalQuantity;
        
        // Add animation class
        if (totalQuantity > 0) {
            element.classList.remove('cart-count-animation');
            void element.offsetWidth; // Trigger reflow
            element.classList.add('cart-count-animation');
        }
    });
}

// Show notification
function showNotification(message) {
    // Check if notification container exists
    let notificationContainer = document.querySelector('.notification-container');
    
    // Create notification container if it doesn't exist
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="notification-content">
            <p>${message}</p>
        </div>
    `;
    
    // Add notification to container
    notificationContainer.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
        
        // Remove notification from DOM after animation
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Helper function to format size
function formatSize(size) {
    const sizeMap = {
        'small': 'Küçük (30x40cm)',
        'medium': 'Orta (50x70cm)',
        'large': 'Büyük (70x100cm)'
    };
    
    return sizeMap[size] || size;
}

// Helper function to format frame
function formatFrame(frame) {
    const frameMap = {
        'none': 'Çerçevesiz',
        'simple': 'Basit Çerçeve',
        'premium': 'Premium Çerçeve'
    };
    
    return frameMap[frame] || frame;
}

// Helper function to generate product ID
function generateProductId() {
    return 'product_' + Math.random().toString(36).substr(2, 9);
}