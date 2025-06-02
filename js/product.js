document.addEventListener('DOMContentLoaded', function() {
    // Product Image Gallery
    initProductGallery();
    
    // Product Tabs
    initProductTabs();
    
    // Quantity Selector
    initQuantitySelector();
    
    // Product Options
    initProductOptions();
    
    // Add to Cart Functionality
    initAddToCart();
    
    // Product Image Tilt Effect
    initTiltEffect();
});

// Initialize Product Gallery
function initProductGallery() {
    const mainImage = document.querySelector('.product-main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
            
            // Update main image
            const imageUrl = this.getAttribute('data-image');
            mainImage.src = imageUrl;
            mainImage.setAttribute('data-tilt-reset', 'true');
            
            // Reset tilt effect
            setTimeout(() => {
                mainImage.removeAttribute('data-tilt-reset');
            }, 100);
        });
    });
    
    // Lightbox functionality
    mainImage.addEventListener('click', function() {
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = lightbox.querySelector('img');
        const overlay = document.querySelector('.overlay');
        
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        
        lightbox.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    const lightboxClose = document.querySelector('.lightbox-close');
    lightboxClose.addEventListener('click', closeLightbox);
    
    const overlay = document.querySelector('.overlay');
    overlay.addEventListener('click', closeLightbox);
    
    function closeLightbox() {
        const lightbox = document.querySelector('.lightbox');
        const overlay = document.querySelector('.overlay');
        
        lightbox.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize Product Tabs
function initProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab panel
            const tabId = this.getAttribute('data-tab');
            tabPanels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Initialize Quantity Selector
function initQuantitySelector() {
    const minusBtn = document.querySelector('.quantity-button.minus');
    const plusBtn = document.querySelector('.quantity-button.plus');
    const quantityInput = document.querySelector('#product-quantity');
    
    minusBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });
    
    quantityInput.addEventListener('change', function() {
        let currentValue = parseInt(this.value);
        if (isNaN(currentValue) || currentValue < 1) {
            this.value = 1;
        } else if (currentValue > 10) {
            this.value = 10;
        }
    });
}

// Initialize Product Options
function initProductOptions() {
    const optionButtons = document.querySelectorAll('.option-button');
    
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find parent option group
            const optionGroup = this.closest('.option-group');
            
            // Update active button in this group only
            const buttonsInGroup = optionGroup.querySelectorAll('.option-button');
            buttonsInGroup.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update price based on selected options (example)
            updateProductPrice();
        });
    });
}

// Example function to update product price based on selected options
function updateProductPrice() {
    // Base price
    let basePrice = 249.99;
    
    // Get selected size
    const sizeButtons = document.querySelectorAll('.option-group:nth-child(1) .option-button');
    let selectedSize;
    sizeButtons.forEach(button => {
        if (button.classList.contains('active')) {
            selectedSize = button.textContent.trim();
        }
    });
    
    // Get selected frame
    const frameButtons = document.querySelectorAll('.option-group:nth-child(2) .option-button');
    let selectedFrame;
    frameButtons.forEach(button => {
        if (button.classList.contains('active')) {
            selectedFrame = button.textContent.trim();
        }
    });
    
    // Adjust price based on size
    if (selectedSize === '50x70 cm') {
        basePrice += 50;
    } else if (selectedSize === '70x100 cm') {
        basePrice += 100;
    }
    
    // Adjust price based on frame
    if (selectedFrame === 'Siyah Çerçeve' || selectedFrame === 'Beyaz Çerçeve') {
        basePrice += 75;
    } else if (selectedFrame === 'Ahşap Çerçeve') {
        basePrice += 100;
    }
    
    // Update displayed price
    const priceElement = document.querySelector('#product-price');
    priceElement.textContent = `₺${basePrice.toFixed(2)}`;
}

// Initialize Add to Cart Functionality
function initAddToCart() {
    const addToCartBtn = document.querySelector('#add-to-cart-btn');
    
    addToCartBtn.addEventListener('click', function() {
        // Get product details
        const productTitle = document.querySelector('#product-title').textContent;
        const productPrice = document.querySelector('#product-price').textContent;
        const productImage = document.querySelector('#product-image').src;
        const productQuantity = document.querySelector('#product-quantity').value;
        
        // Get selected options
        let selectedSize = '';
        let selectedFrame = '';
        
        const sizeButtons = document.querySelectorAll('.option-group:nth-child(1) .option-button');
        sizeButtons.forEach(button => {
            if (button.classList.contains('active')) {
                selectedSize = button.textContent.trim();
            }
        });
        
        const frameButtons = document.querySelectorAll('.option-group:nth-child(2) .option-button');
        frameButtons.forEach(button => {
            if (button.classList.contains('active')) {
                selectedFrame = button.textContent.trim();
            }
        });
        
        // Create cart item object
        const cartItem = {
            id: generateUniqueId(),
            title: productTitle,
            price: productPrice,
            image: productImage,
            quantity: parseInt(productQuantity),
            size: selectedSize,
            frame: selectedFrame
        };
        
        // Add to cart (localStorage)
        addItemToCart(cartItem);
        
        // Show success message
        showAddToCartMessage();
        
        // Update cart count
        updateCartCount();
        
        // Open cart sidebar
        openCartSidebar();
    });
}

// Generate a unique ID for cart items
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Add item to cart in localStorage
function addItemToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => 
        cartItem.title === item.title && 
        cartItem.size === item.size && 
        cartItem.frame === item.frame
    );
    
    if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        // Add new item if it doesn't exist
        cart.push(item);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show add to cart success message
function showAddToCartMessage() {
    // Create message element
    const message = document.createElement('div');
    message.className = 'add-to-cart-message';
    message.innerHTML = `
        <div class="message-content">
            <i class="fas fa-check-circle"></i>
            <span>Ürün sepete eklendi!</span>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(message);
    
    // Show message
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    // Remove message after delay
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 3000);
}

// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cartCount;
    
    if (cartCount > 0) {
        cartCountElement.classList.add('has-items');
    } else {
        cartCountElement.classList.remove('has-items');
    }
}

// Open cart sidebar
function openCartSidebar() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.overlay');
    
    // Update cart items in sidebar
    updateCartSidebar();
    
    // Show cart sidebar and overlay
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Update cart sidebar contents
function updateCartSidebar() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Clear current items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        // Show empty cart message
        cartItemsContainer.innerHTML = '<div class="empty-cart-message">Sepetiniz boş.</div>';
    } else {
        // Add each cart item
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <div class="cart-item-meta">
                        <p>${item.size} | ${item.frame}</p>
                    </div>
                    <div class="cart-item-price-qty">
                        <span class="cart-item-price">${item.price}</span>
                        <div class="cart-item-quantity">
                            <button class="cart-qty-btn minus" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="cart-qty-btn plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Add event listeners for quantity buttons and remove buttons
        addCartItemEventListeners();
    }
    
    // Update cart total
    updateCartTotal();
}

// Add event listeners to cart item buttons
function addCartItemEventListeners() {
    // Quantity decrease buttons
    const minusButtons = document.querySelectorAll('.cart-qty-btn.minus');
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            updateCartItemQuantity(itemId, -1);
        });
    });
    
    // Quantity increase buttons
    const plusButtons = document.querySelectorAll('.cart-qty-btn.plus');
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            updateCartItemQuantity(itemId, 1);
        });
    });
    
    // Remove buttons
    const removeButtons = document.querySelectorAll('.cart-item-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            removeCartItem(itemId);
        });
    });
}

// Update cart item quantity
function updateCartItemQuantity(itemId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        // Remove item if quantity is 0 or less
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update UI
        updateCartSidebar();
        updateCartCount();
    }
}

// Remove cart item
function removeCartItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const updatedCart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Update UI
    updateCartSidebar();
    updateCartCount();
}

// Update cart total
function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate total
    let total = 0;
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('₺', '').replace(',', '.'));
        total += price * item.quantity;
    });
    
    // Update total in cart sidebar
    const totalElement = document.querySelector('.total-amount');
    totalElement.textContent = `₺${total.toFixed(2).replace('.', ',')}`;
    
    // Update checkout button visibility
    const checkoutButton = document.querySelector('.btn-checkout');
    if (cart.length > 0) {
        checkoutButton.classList.remove('hidden');
    } else {
        checkoutButton.classList.add('hidden');
    }
}

// Initialize Tilt Effect
function initTiltEffect() {
    const tiltElement = document.querySelector('.tilt');
    
    if (tiltElement) {
        let tiltSettings = {
            max: 15,
            perspective: 1000,
            scale: 1.05,
            speed: 300,
            reset: true
        };
        
        let rect, centerX, centerY, mouseX, mouseY;
        
        tiltElement.addEventListener('mouseenter', function() {
            rect = this.getBoundingClientRect();
        });
        
        tiltElement.addEventListener('mousemove', function(e) {
            if (this.hasAttribute('data-tilt-reset')) return;
            
            rect = this.getBoundingClientRect();
            centerX = rect.left + rect.width / 2;
            centerY = rect.top + rect.height / 2;
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            const percentX = (mouseX - centerX) / (rect.width / 2);
            const percentY = (mouseY - centerY) / (rect.height / 2);
            
            const tiltX = percentY * tiltSettings.max * -1;
            const tiltY = percentX * tiltSettings.max;
            
            this.style.transform = `perspective(${tiltSettings.perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${tiltSettings.scale})`;
            this.style.transition = `transform ${tiltSettings.speed}ms ease-out`;
        });
        
        tiltElement.addEventListener('mouseleave', function() {
            if (tiltSettings.reset) {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count on page load
    updateCartCount();
    
    // Initialize cart sidebar functionality
    const cartIcon = document.querySelector('.cart-icon');
    const cartClose = document.querySelector('.cart-close');
    const overlay = document.querySelector('.overlay');
    
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        openCartSidebar();
    });
    
    cartClose.addEventListener('click', function() {
        const cartSidebar = document.querySelector('.cart-sidebar');
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    overlay.addEventListener('click', function() {
        const cartSidebar = document.querySelector('.cart-sidebar');
        if (cartSidebar.classList.contains('active')) {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});