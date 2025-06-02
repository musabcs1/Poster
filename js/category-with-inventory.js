document.addEventListener('DOMContentLoaded', function() {
    // Initialize category page
    initCategoryPage();
});

function initCategoryPage() {
    // Initialize price range slider
    initPriceRangeSlider();
    
    // Initialize filter toggles
    initFilterToggles();
    
    // Initialize sorting
    initSorting();
    
    // Initialize quick view
    initQuickView();
    
    // Initialize mobile filter toggle
    initMobileFilterToggle();
    
    // Initialize product hover effects
    initProductHoverEffects();
    
    // Update product availability based on inventory
    updateProductAvailability();
}

// Initialize price range slider
function initPriceRangeSlider() {
    const rangeInput = document.querySelectorAll('.price-range-input');
    const priceInput = document.querySelectorAll('.price-input input');
    const progress = document.querySelector('.price-slider .progress');
    const priceGap = 100;
    
    if (rangeInput.length === 0 || priceInput.length === 0 || !progress) return;
    
    priceInput.forEach(input => {
        input.addEventListener('input', e => {
            let minVal = parseInt(priceInput[0].value);
            let maxVal = parseInt(priceInput[1].value);
            
            if ((maxVal - minVal >= priceGap) && maxVal <= 2000) {
                if (e.target.className === 'min-input') {
                    rangeInput[0].value = minVal;
                    progress.style.left = (minVal / rangeInput[0].max) * 100 + '%';
                } else {
                    rangeInput[1].value = maxVal;
                    progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + '%';
                }
            }
        });
    });
    
    rangeInput.forEach(input => {
        input.addEventListener('input', e => {
            let minVal = parseInt(rangeInput[0].value);
            let maxVal = parseInt(rangeInput[1].value);
            
            if (maxVal - minVal < priceGap) {
                if (e.target.className === 'min-range') {
                    rangeInput[0].value = maxVal - priceGap;
                } else {
                    rangeInput[1].value = minVal + priceGap;
                }
            } else {
                priceInput[0].value = minVal;
                priceInput[1].value = maxVal;
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
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const priceElement = card.querySelector('.product-price');
        if (!priceElement) return;
        
        const price = parseFloat(priceElement.textContent.replace(' TL', '').replace(',', '.'));
        
        if (price >= minPrice && price <= maxPrice) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update product count
    updateProductCount();
}

// Initialize filter toggles
function initFilterToggles() {
    const filterHeaders = document.querySelectorAll('.filter-header');
    
    filterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const filterBody = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            filterBody.classList.toggle('active');
            
            if (icon) {
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
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

// Apply all filters
function applyFilters() {
    // Get selected filters
    const selectedSizes = getSelectedFilters('size');
    const selectedFrames = getSelectedFilters('frame');
    const selectedRatings = getSelectedFilters('rating');
    
    // Get price range
    const minPrice = parseInt(document.querySelector('.min-input').value);
    const maxPrice = parseInt(document.querySelector('.max-input').value);
    
    // Filter products
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const price = parseFloat(card.querySelector('.product-price').textContent.replace(' TL', '').replace(',', '.'));
        const size = card.getAttribute('data-size');
        const frame = card.getAttribute('data-frame');
        const rating = parseInt(card.getAttribute('data-rating'));
        
        const matchesPrice = price >= minPrice && price <= maxPrice;
        const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(size);
        const matchesFrame = selectedFrames.length === 0 || selectedFrames.includes(frame);
        const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(rating.toString());
        
        if (matchesPrice && matchesSize && matchesFrame && matchesRating) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update product count
    updateProductCount();
}

// Get selected filters by type
function getSelectedFilters(type) {
    const checkboxes = document.querySelectorAll(`.filter-option[data-filter="${type}"] input:checked`);
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// Update product count
function updateProductCount() {
    const visibleProducts = document.querySelectorAll('.product-card[style=""], .product-card:not([style*="display: none"])');
    const countElement = document.querySelector('.product-count');
    
    if (countElement) {
        countElement.textContent = `${visibleProducts.length} ürün gösteriliyor`;
    }
}

// Initialize sorting
function initSorting() {
    const sortSelect = document.querySelector('#sort-select');
    
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        sortProducts(sortValue);
    });
}

// Sort products
function sortProducts(sortValue) {
    const productGrid = document.querySelector('.product-grid');
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    
    if (!productGrid || productCards.length === 0) return;
    
    // Sort products based on selected option
    productCards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.product-price').textContent.replace(' TL', '').replace(',', '.'));
        const priceB = parseFloat(b.querySelector('.product-price').textContent.replace(' TL', '').replace(',', '.'));
        const nameA = a.querySelector('.product-title').textContent;
        const nameB = b.querySelector('.product-title').textContent;
        
        switch (sortValue) {
            case 'price-low-high':
                return priceA - priceB;
            case 'price-high-low':
                return priceB - priceA;
            case 'name-a-z':
                return nameA.localeCompare(nameB);
            case 'name-z-a':
                return nameB.localeCompare(nameA);
            default:
                return 0;
        }
    });
    
    // Reorder products in the DOM
    productCards.forEach(card => {
        productGrid.appendChild(card);
    });
}

// Initialize quick view
function initQuickView() {
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    const quickViewModal = document.querySelector('.quick-view-modal');
    const quickViewClose = document.querySelector('.quick-view-close');
    
    if (quickViewButtons.length === 0 || !quickViewModal || !quickViewClose) return;
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productId = productCard.getAttribute('data-product-id');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            
            // Populate quick view modal
            quickViewModal.querySelector('.quick-view-title').textContent = productName;
            quickViewModal.querySelector('.quick-view-price').textContent = productPrice;
            quickViewModal.querySelector('.quick-view-image img').src = productImage;
            
            // Set product ID for add to cart functionality
            quickViewModal.setAttribute('data-product-id', productId);
            
            // Check stock availability
            updateQuickViewAvailability(productId);
            
            // Show modal
            quickViewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close quick view modal
    quickViewClose.addEventListener('click', function() {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside
    quickViewModal.addEventListener('click', function(e) {
        if (e.target === this) {
            quickViewModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Initialize quick view add to cart
    initQuickViewAddToCart();
}

// Update quick view availability based on inventory
function updateQuickViewAvailability(productId) {
    const quickViewModal = document.querySelector('.quick-view-modal');
    if (!quickViewModal) return;
    
    const sizeSelect = quickViewModal.querySelector('#quick-view-size');
    const frameSelect = quickViewModal.querySelector('#quick-view-frame');
    const availabilityElement = quickViewModal.querySelector('.quick-view-availability');
    const addToCartBtn = quickViewModal.querySelector('.quick-view-add-to-cart');
    
    if (!sizeSelect || !frameSelect || !availabilityElement || !addToCartBtn) return;
    
    // Update availability based on selected options
    function updateAvailability() {
        const selectedSize = sizeSelect.value;
        const selectedFrame = frameSelect.value;
        
        // Check stock availability
        const stockLevel = window.inventorySystem.getStockLevel(productId, selectedSize, selectedFrame);
        
        if (stockLevel > 0) {
            // In stock
            if (stockLevel <= 5) { // Low stock threshold
                availabilityElement.innerHTML = `<span class="stock-status in-stock low-stock">Sınırlı Stok (${stockLevel})</span>`;
            } else {
                availabilityElement.innerHTML = '<span class="stock-status in-stock">Stokta</span>';
            }
            
            addToCartBtn.disabled = false;
            addToCartBtn.textContent = 'Sepete Ekle';
        } else {
            // Out of stock
            availabilityElement.innerHTML = '<span class="stock-status out-of-stock">Stokta Yok</span>';
            addToCartBtn.disabled = true;
            addToCartBtn.textContent = 'Stokta Yok';
        }
    }
    
    // Add event listeners
    sizeSelect.addEventListener('change', updateAvailability);
    frameSelect.addEventListener('change', updateAvailability);
    
    // Initial update
    updateAvailability();
}

// Initialize quick view add to cart
function initQuickViewAddToCart() {
    const quickViewModal = document.querySelector('.quick-view-modal');
    const addToCartBtn = quickViewModal.querySelector('.quick-view-add-to-cart');
    
    if (!quickViewModal || !addToCartBtn) return;
    
    addToCartBtn.addEventListener('click', function() {
        const productId = quickViewModal.getAttribute('data-product-id');
        const productName = quickViewModal.querySelector('.quick-view-title').textContent;
        const productPrice = quickViewModal.querySelector('.quick-view-price').textContent;
        const productImage = quickViewModal.querySelector('.quick-view-image img').src;
        const selectedSize = quickViewModal.querySelector('#quick-view-size').value;
        const selectedFrame = quickViewModal.querySelector('#quick-view-frame').value;
        const quantity = parseInt(quickViewModal.querySelector('.quick-view-quantity').value || 1);
        
        // Check stock availability
        if (!window.inventorySystem.isInStock(productId, selectedSize, selectedFrame, quantity)) {
            showMessage('Üzgünüz, seçtiğiniz ürün stokta yok veya yeterli miktarda bulunmuyor.', 'error');
            return;
        }
        
        // Create cart item
        const cartItem = {
            id: productId,
            name: productName,
            price: parseFloat(productPrice.replace(' TL', '').replace(',', '.')),
            image: productImage,
            size: selectedSize,
            frame: selectedFrame,
            quantity: quantity
        };
        
        // Add to cart
        addToCart(cartItem);
        
        // Update inventory
        window.inventorySystem.updateInventoryOnAddToCart(productId, selectedSize, selectedFrame, quantity);
        
        // Show success message
        showMessage('Ürün sepete eklendi!', 'success');
        
        // Update cart count
        updateCartCount();
        
        // Close modal
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Update product availability on the category page
        updateProductAvailability();
    });
}

// Initialize mobile filter toggle
function initMobileFilterToggle() {
    const filterToggle = document.querySelector('.filter-toggle');
    const filterSidebar = document.querySelector('.filter-sidebar');
    const filterClose = document.querySelector('.filter-close');
    
    if (!filterToggle || !filterSidebar || !filterClose) return;
    
    filterToggle.addEventListener('click', function() {
        filterSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    filterClose.addEventListener('click', function() {
        filterSidebar.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Initialize product hover effects
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

// Update product availability based on inventory
function updateProductAvailability() {
    const productCards = document.querySelectorAll('.product-card');
    
    if (productCards.length === 0) return;
    
    // Get inventory data
    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};
    
    // Update each product card
    productCards.forEach(card => {
        const productId = card.getAttribute('data-product-id');
        if (!productId) return;
        
        const product = inventory[productId];
        if (!product) return;
        
        // Check if any variant is in stock
        let hasStock = false;
        let totalStock = 0;
        
        for (const variantKey in product.variants) {
            const variant = product.variants[variantKey];
            totalStock += variant.stock;
            if (variant.stock > 0) {
                hasStock = true;
            }
        }
        
        // Update add to cart button
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            if (hasStock) {
                addToCartBtn.disabled = false;
                addToCartBtn.textContent = 'Sepete Ekle';
            } else {
                addToCartBtn.disabled = true;
                addToCartBtn.textContent = 'Stokta Yok';
            }
        }
        
        // Add stock badge if exists
        let stockBadge = card.querySelector('.stock-badge');
        
        if (!stockBadge) {
            stockBadge = document.createElement('div');
            stockBadge.className = 'stock-badge';
            card.querySelector('.product-image').appendChild(stockBadge);
        }
        
        if (totalStock === 0) {
            stockBadge.textContent = 'Stokta Yok';
            stockBadge.classList.add('out-of-stock');
            stockBadge.classList.remove('low-stock');
        } else if (totalStock <= 5) { // Arbitrary low stock threshold for category view
            stockBadge.textContent = 'Sınırlı Stok';
            stockBadge.classList.add('low-stock');
            stockBadge.classList.remove('out-of-stock');
        } else {
            stockBadge.textContent = 'Stokta';
            stockBadge.classList.remove('low-stock', 'out-of-stock');
        }
    });
}

// Add to cart function
function addToCart(item) {
    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => 
        cartItem.id === item.id && 
        cartItem.size === item.size && 
        cartItem.frame === item.frame
    );
    
    if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        // Add new item to cart
        cart.push(item);
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show message function
function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 300);
    }, 3000);
}

// Update cart count function
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
        element.classList.add('updated');
        
        setTimeout(() => {
            element.classList.remove('updated');
        }, 1000);
    });
}