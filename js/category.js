document.addEventListener('DOMContentLoaded', function() {
    // Initialize price range slider
    initPriceRangeSlider();
    
    // Initialize filter toggles
    initFilterToggles();
    
    // Initialize sorting functionality
    initSorting();
    
    // Initialize quick view functionality
    initQuickView();
    
    // Initialize mobile filter toggle
    initMobileFilterToggle();
    
    // Initialize product hover effects
    initProductHoverEffects();
});

// Initialize Price Range Slider
function initPriceRangeSlider() {
    const rangeInput = document.querySelectorAll('.price-range-input input');
    const priceInput = document.querySelectorAll('.price-input input');
    const progress = document.querySelector('.price-slider .progress');
    const priceGap = 50; // Minimum gap between handles
    
    priceInput.forEach(input => {
        input.addEventListener('input', e => {
            // Get min and max values
            let minVal = parseInt(priceInput[0].value);
            let maxVal = parseInt(priceInput[1].value);
            
            // Validate input values
            if (maxVal - minVal >= priceGap && maxVal <= 1000) {
                if (e.target.className === 'min-input') {
                    rangeInput[0].value = minVal;
                    // Calculate progress position
                    progress.style.left = (minVal / rangeInput[0].max) * 100 + '%';
                } else {
                    rangeInput[1].value = maxVal;
                    // Calculate progress position
                    progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + '%';
                }
            }
        });
    });
    
    rangeInput.forEach(input => {
        input.addEventListener('input', e => {
            // Get min and max values
            let minVal = parseInt(rangeInput[0].value);
            let maxVal = parseInt(rangeInput[1].value);
            
            // Check if max - min < priceGap
            if (maxVal - minVal < priceGap) {
                if (e.target.className === 'min-range') {
                    rangeInput[0].value = maxVal - priceGap;
                } else {
                    rangeInput[1].value = minVal + priceGap;
                }
            } else {
                // Update price inputs
                priceInput[0].value = minVal;
                priceInput[1].value = maxVal;
                
                // Calculate progress position
                progress.style.left = (minVal / rangeInput[0].max) * 100 + '%';
                progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + '%';
            }
            
            // Filter products based on price range
            filterProductsByPrice(minVal, maxVal);
        });
    });
}

// Filter products based on price range
function filterProductsByPrice(minPrice, maxPrice) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const priceElement = product.querySelector('.product-price');
        if (priceElement) {
            const price = parseFloat(priceElement.textContent.replace('₺', '').replace(',', '.'));
            
            if (price >= minPrice && price <= maxPrice) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        }
    });
    
    // Update product count
    updateProductCount();
}

// Initialize Filter Toggles
function initFilterToggles() {
    const filterHeaders = document.querySelectorAll('.filter-header');
    
    filterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const filterBody = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle filter body visibility
            filterBody.classList.toggle('active');
            
            // Toggle icon
            if (icon.classList.contains('fa-chevron-down')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
    
    // Add event listeners to filter checkboxes
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            applyFilters();
        });
    });
}

// Apply all active filters
function applyFilters() {
    const products = document.querySelectorAll('.product-card');
    
    // Get selected sizes
    const selectedSizes = [];
    document.querySelectorAll('.size-filter input:checked').forEach(checkbox => {
        selectedSizes.push(checkbox.value);
    });
    
    // Get selected frames
    const selectedFrames = [];
    document.querySelectorAll('.frame-filter input:checked').forEach(checkbox => {
        selectedFrames.push(checkbox.value);
    });
    
    // Get selected ratings
    const selectedRatings = [];
    document.querySelectorAll('.rating-filter input:checked').forEach(checkbox => {
        selectedRatings.push(parseInt(checkbox.value));
    });
    
    // Get price range
    const minPrice = parseInt(document.querySelector('.min-range').value);
    const maxPrice = parseInt(document.querySelector('.max-range').value);
    
    // Apply filters to each product
    products.forEach(product => {
        let showProduct = true;
        
        // Check size filter
        if (selectedSizes.length > 0) {
            const productSize = product.getAttribute('data-size');
            if (!selectedSizes.includes(productSize)) {
                showProduct = false;
            }
        }
        
        // Check frame filter
        if (showProduct && selectedFrames.length > 0) {
            const productFrame = product.getAttribute('data-frame');
            if (!selectedFrames.includes(productFrame)) {
                showProduct = false;
            }
        }
        
        // Check rating filter
        if (showProduct && selectedRatings.length > 0) {
            const productRating = parseInt(product.getAttribute('data-rating'));
            if (!selectedRatings.includes(productRating)) {
                showProduct = false;
            }
        }
        
        // Check price filter
        if (showProduct) {
            const priceElement = product.querySelector('.product-price');
            if (priceElement) {
                const price = parseFloat(priceElement.textContent.replace('₺', '').replace(',', '.'));
                if (price < minPrice || price > maxPrice) {
                    showProduct = false;
                }
            }
        }
        
        // Show or hide product
        if (showProduct) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    
    // Update product count
    updateProductCount();
}

// Update product count
function updateProductCount() {
    const visibleProducts = document.querySelectorAll('.product-card[style="display: block"]').length;
    const totalProducts = document.querySelectorAll('.product-card').length;
    
    const countElement = document.querySelector('.product-count');
    if (countElement) {
        countElement.textContent = `${visibleProducts} / ${totalProducts} ürün gösteriliyor`;
    }
}

// Initialize Sorting Functionality
function initSorting() {
    const sortSelect = document.querySelector('#sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            sortProducts(sortValue);
        });
    }
}

// Sort products based on selected option
function sortProducts(sortOption) {
    const productGrid = document.querySelector('.product-grid');
    const products = Array.from(document.querySelectorAll('.product-card'));
    
    // Sort products based on option
    switch (sortOption) {
        case 'price-low-high':
            products.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('₺', '').replace(',', '.'));
                const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('₺', '').replace(',', '.'));
                return priceA - priceB;
            });
            break;
            
        case 'price-high-low':
            products.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('₺', '').replace(',', '.'));
                const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('₺', '').replace(',', '.'));
                return priceB - priceA;
            });
            break;
            
        case 'newest':
            products.sort((a, b) => {
                const dateA = new Date(a.getAttribute('data-date'));
                const dateB = new Date(b.getAttribute('data-date'));
                return dateB - dateA;
            });
            break;
            
        case 'rating':
            products.sort((a, b) => {
                const ratingA = parseInt(a.getAttribute('data-rating'));
                const ratingB = parseInt(b.getAttribute('data-rating'));
                return ratingB - ratingA;
            });
            break;
            
        case 'popularity':
            products.sort((a, b) => {
                const popularityA = parseInt(a.getAttribute('data-popularity'));
                const popularityB = parseInt(b.getAttribute('data-popularity'));
                return popularityB - popularityA;
            });
            break;
            
        default:
            // Default sorting (featured)
            products.sort((a, b) => {
                const orderA = parseInt(a.getAttribute('data-order'));
                const orderB = parseInt(b.getAttribute('data-order'));
                return orderA - orderB;
            });
    }
    
    // Clear product grid
    productGrid.innerHTML = '';
    
    // Append sorted products
    products.forEach(product => {
        productGrid.appendChild(product);
    });
}

// Initialize Quick View Functionality
function initQuickView() {
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    const quickViewModal = document.querySelector('.quick-view-modal');
    const quickViewClose = document.querySelector('.quick-view-close');
    const overlay = document.querySelector('.overlay');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product data
            const product = this.closest('.product-card');
            const productId = product.getAttribute('data-id');
            const productTitle = product.querySelector('.product-title').textContent;
            const productPrice = product.querySelector('.product-price').textContent;
            const productImage = product.querySelector('.product-image img').src;
            const productRating = product.getAttribute('data-rating');
            
            // Populate quick view modal
            document.querySelector('.quick-view-image img').src = productImage;
            document.querySelector('.quick-view-title').textContent = productTitle;
            document.querySelector('.quick-view-price').textContent = productPrice;
            
            // Set rating stars
            const ratingStars = document.querySelectorAll('.quick-view-rating i');
            ratingStars.forEach((star, index) => {
                if (index < productRating) {
                    star.className = 'fas fa-star';
                } else {
                    star.className = 'far fa-star';
                }
            });
            
            // Show modal and overlay
            quickViewModal.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close quick view modal
    quickViewClose.addEventListener('click', function() {
        quickViewModal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    overlay.addEventListener('click', function() {
        if (quickViewModal.classList.contains('active')) {
            quickViewModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Quick view quantity buttons
    const minusBtn = document.querySelector('.quick-view-quantity .minus');
    const plusBtn = document.querySelector('.quick-view-quantity .plus');
    const quantityInput = document.querySelector('.quick-view-quantity input');
    
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
    
    // Quick view add to cart button
    const addToCartBtn = document.querySelector('.quick-view-add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        const productTitle = document.querySelector('.quick-view-title').textContent;
        const productPrice = document.querySelector('.quick-view-price').textContent;
        const productImage = document.querySelector('.quick-view-image img').src;
        const productQuantity = document.querySelector('.quick-view-quantity input').value;
        
        // Get selected options
        let selectedSize = '';
        document.querySelectorAll('.quick-view-size-options button').forEach(button => {
            if (button.classList.contains('active')) {
                selectedSize = button.textContent.trim();
            }
        });
        
        let selectedFrame = '';
        document.querySelectorAll('.quick-view-frame-options button').forEach(button => {
            if (button.classList.contains('active')) {
                selectedFrame = button.textContent.trim();
            }
        });
        
        // Create cart item
        const cartItem = {
            id: generateUniqueId(),
            title: productTitle,
            price: productPrice,
            image: productImage,
            quantity: parseInt(productQuantity),
            size: selectedSize || '30x40 cm', // Default size
            frame: selectedFrame || 'Çerçevesiz' // Default frame
        };
        
        // Add to cart
        addItemToCart(cartItem);
        
        // Show success message
        showAddToCartMessage();
        
        // Update cart count
        updateCartCount();
        
        // Close quick view modal
        quickViewModal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Open cart sidebar
        openCartSidebar();
    });
    
    // Quick view option buttons
    const optionButtons = document.querySelectorAll('.quick-view-options button');
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find parent option group
            const optionGroup = this.closest('.quick-view-options-group');
            
            // Update active button in this group only
            const buttonsInGroup = optionGroup.querySelectorAll('button');
            buttonsInGroup.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Initialize Mobile Filter Toggle
function initMobileFilterToggle() {
    const filterToggleBtn = document.querySelector('.filter-toggle-btn');
    const filterSidebar = document.querySelector('.filter-sidebar');
    const filterCloseBtn = document.querySelector('.filter-close-btn');
    const overlay = document.querySelector('.overlay');
    
    if (filterToggleBtn && filterSidebar) {
        filterToggleBtn.addEventListener('click', function() {
            filterSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        filterCloseBtn.addEventListener('click', function() {
            filterSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        overlay.addEventListener('click', function() {
            if (filterSidebar.classList.contains('active')) {
                filterSidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Initialize Product Hover Effects
function initProductHoverEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count on page load
    updateCartCount();
});