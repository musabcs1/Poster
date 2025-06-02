document.addEventListener('DOMContentLoaded', function() {
    // Initialize product page
    initProductPage();
});

function initProductPage() {
    // Initialize product gallery
    initProductGallery();
    
    // Initialize product tabs
    initProductTabs();
    
    // Initialize quantity selector
    initQuantitySelector();
    
    // Initialize product options
    initProductOptions();
    
    // Initialize add to cart functionality
    initAddToCart();
    
    // Initialize product image tilt effect
    initProductTilt();
}

// Initialize product gallery with lightbox
function initProductGallery() {
    const mainImage = document.querySelector('.product-main-image img');
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    const lightbox = document.querySelector('.product-lightbox');
    const lightboxImage = document.querySelector('.lightbox-image img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (!mainImage || thumbnails.length === 0) return;
    
    // Change main image when thumbnail is clicked
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-image');
            mainImage.src = imgSrc;
            
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
        });
    });
    
    // Open lightbox when main image is clicked
    if (mainImage && lightbox && lightboxImage) {
        mainImage.addEventListener('click', function() {
            lightboxImage.src = this.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close lightbox when close button is clicked
    if (lightboxClose) {
        lightboxClose.addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close lightbox when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Initialize product tabs
function initProductTabs() {
    const tabLinks = document.querySelectorAll('.product-tab-link');
    const tabContents = document.querySelectorAll('.product-tab-content');
    
    if (tabLinks.length === 0 || tabContents.length === 0) return;
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabLinks.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current tab and content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Initialize quantity selector
function initQuantitySelector() {
    const quantityInput = document.querySelector('.quantity-input');
    const quantityPlus = document.querySelector('.quantity-plus');
    const quantityMinus = document.querySelector('.quantity-minus');
    
    if (!quantityInput || !quantityPlus || !quantityMinus) return;
    
    // Get product ID and selected options
    const productContainer = document.querySelector('.product-detail');
    if (!productContainer) return;
    
    const productId = productContainer.getAttribute('data-product-id');
    if (!productId) return;
    
    // Get selected size and frame options
    const sizeSelect = document.querySelector('#product-size');
    const frameSelect = document.querySelector('#product-frame');
    
    if (!sizeSelect || !frameSelect) return;
    
    // Increase quantity
    quantityPlus.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        const selectedSize = sizeSelect.value;
        const selectedFrame = frameSelect.value;
        
        // Check available stock before increasing
        const maxStock = window.inventorySystem.getStockLevel(productId, selectedSize, selectedFrame);
        
        if (value < maxStock) {
            value++;
            quantityInput.value = value;
            
            // Update add to cart button text if needed
            updateAddToCartButton(value, maxStock);
        } else {
            // Show max stock reached message
            showStockMessage('Maksimum stok miktarına ulaştınız!');
        }
    });
    
    // Decrease quantity
    quantityMinus.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            value--;
            quantityInput.value = value;
            
            // Update add to cart button
            const maxStock = window.inventorySystem.getStockLevel(productId, sizeSelect.value, frameSelect.value);
            updateAddToCartButton(value, maxStock);
        }
    });
    
    // Validate input
    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        const selectedSize = sizeSelect.value;
        const selectedFrame = frameSelect.value;
        
        // Check available stock
        const maxStock = window.inventorySystem.getStockLevel(productId, selectedSize, selectedFrame);
        
        if (isNaN(value) || value < 1) {
            value = 1;
        } else if (value > maxStock) {
            value = maxStock;
            showStockMessage('Maksimum stok miktarına ulaştınız!');
        }
        
        this.value = value;
        
        // Update add to cart button
        updateAddToCartButton(value, maxStock);
    });
    
    // Update add to cart button based on quantity and stock
    function updateAddToCartButton(quantity, maxStock) {
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        if (!addToCartBtn) return;
        
        if (quantity > maxStock) {
            addToCartBtn.disabled = true;
            addToCartBtn.textContent = 'Stok Yetersiz';
        } else {
            addToCartBtn.disabled = false;
            addToCartBtn.textContent = 'Sepete Ekle';
        }
    }
    
    // Show stock message
    function showStockMessage(message) {
        let stockMessage = document.querySelector('.stock-message');
        
        if (!stockMessage) {
            stockMessage = document.createElement('div');
            stockMessage.className = 'stock-message';
            const quantityWrapper = document.querySelector('.quantity-wrapper');
            if (quantityWrapper) {
                quantityWrapper.appendChild(stockMessage);
            }
        }
        
        stockMessage.textContent = message;
        stockMessage.classList.add('show');
        
        setTimeout(() => {
            stockMessage.classList.remove('show');
        }, 3000);
    }
}

// Initialize product options (size, frame, etc.)
function initProductOptions() {
    const sizeSelect = document.querySelector('#product-size');
    const frameSelect = document.querySelector('#product-frame');
    const priceElement = document.querySelector('.product-price');
    const originalPrice = priceElement ? parseFloat(priceElement.getAttribute('data-base-price')) : 0;
    
    if (!sizeSelect || !frameSelect || !priceElement || !originalPrice) return;
    
    // Get product ID
    const productContainer = document.querySelector('.product-detail');
    if (!productContainer) return;
    
    const productId = productContainer.getAttribute('data-product-id');
    if (!productId) return;
    
    // Update price and availability when options change
    function updateProductDetails() {
        const selectedSize = sizeSelect.value;
        const selectedFrame = frameSelect.value;
        
        // Calculate new price based on options
        let newPrice = originalPrice;
        
        // Adjust price based on size
        if (selectedSize === 'medium') {
            newPrice *= 1.5;
        } else if (selectedSize === 'large') {
            newPrice *= 2;
        }
        
        // Adjust price based on frame
        if (selectedFrame === 'with-frame') {
            newPrice += 150; // Add frame cost
        }
        
        // Update price display
        priceElement.innerHTML = `${newPrice.toFixed(2)} TL`;
        
        // Check stock availability
        const quantityInput = document.querySelector('.quantity-input');
        const currentQuantity = quantityInput ? parseInt(quantityInput.value) : 1;
        const maxStock = window.inventorySystem.getStockLevel(productId, selectedSize, selectedFrame);
        
        // Update quantity if needed
        if (quantityInput && currentQuantity > maxStock) {
            quantityInput.value = maxStock > 0 ? maxStock : 1;
        }
        
        // Update add to cart button
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            if (maxStock > 0) {
                addToCartBtn.disabled = false;
                addToCartBtn.textContent = 'Sepete Ekle';
            } else {
                addToCartBtn.disabled = true;
                addToCartBtn.textContent = 'Stokta Yok';
            }
        }
    }
    
    // Add event listeners
    sizeSelect.addEventListener('change', updateProductDetails);
    frameSelect.addEventListener('change', updateProductDetails);
    
    // Initial update
    updateProductDetails();
}

// Initialize add to cart functionality
function initAddToCart() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    
    if (!addToCartBtn) return;
    
    addToCartBtn.addEventListener('click', function() {
        // Get product details
        const productContainer = document.querySelector('.product-detail');
        if (!productContainer) return;
        
        const productId = productContainer.getAttribute('data-product-id');
        const productName = document.querySelector('.product-title').textContent;
        const productPrice = document.querySelector('.product-price').textContent;
        const productImage = document.querySelector('.product-main-image img').src;
        
        // Get selected options
        const selectedSize = document.querySelector('#product-size').value;
        const selectedFrame = document.querySelector('#product-frame').value;
        const quantity = parseInt(document.querySelector('.quantity-input').value);
        
        // Check stock availability
        if (!window.inventorySystem.isInStock(productId, selectedSize, selectedFrame, quantity)) {
            showMessage('Üzgünüz, seçtiğiniz ürün stokta yok veya yeterli miktarda bulunmuyor.', 'error');
            return;
        }
        
        // Create cart item object
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
    });
    
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
}

// Initialize product image tilt effect
function initProductTilt() {
    const productImage = document.querySelector('.product-main-image');
    
    if (!productImage) return;
    
    productImage.addEventListener('mousemove', function(e) {
        const { left, top, width, height } = this.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        const tiltX = (y - 0.5) * 10; // Tilt up/down
        const tiltY = (x - 0.5) * -10; // Tilt left/right
        
        this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    productImage.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
}