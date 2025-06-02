document.addEventListener('DOMContentLoaded', function() {
    // Initialize checkout page
    initCheckoutPage();
});

function initCheckoutPage() {
    // Initialize checkout steps
    initCheckoutSteps();
    
    // Load cart items
    loadCartItems();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize payment methods
    initPaymentMethods();
    
    // Initialize installment options
    initInstallmentOptions();
    
    // Initialize order summary toggle for mobile
    initOrderSummaryToggle();
    
    // Check stock availability for all items
    checkStockAvailability();
}

// Initialize checkout steps
function initCheckoutSteps() {
    const stepButtons = document.querySelectorAll('.checkout-step-btn');
    const stepContents = document.querySelectorAll('.checkout-step-content');
    const nextButtons = document.querySelectorAll('.next-step-btn');
    const prevButtons = document.querySelectorAll('.prev-step-btn');
    
    if (stepButtons.length === 0 || stepContents.length === 0) return;
    
    // Function to go to a specific step
    function goToStep(stepIndex) {
        // Hide all step contents
        stepContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from all step buttons
        stepButtons.forEach(button => {
            button.classList.remove('active');
            button.classList.remove('completed');
        });
        
        // Mark previous steps as completed
        for (let i = 0; i < stepIndex; i++) {
            stepButtons[i].classList.add('completed');
        }
        
        // Show current step content and mark button as active
        stepContents[stepIndex].classList.add('active');
        stepButtons[stepIndex].classList.add('active');
        
        // Scroll to top of the step
        window.scrollTo({
            top: stepContents[stepIndex].offsetTop - 100,
            behavior: 'smooth'
        });
    }
    
    // Add click event to step buttons
    stepButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Only allow clicking on completed steps or the next available step
            if (this.classList.contains('completed') || this.classList.contains('active')) {
                goToStep(index);
            }
        });
    });
    
    // Add click event to next buttons
    nextButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Validate current step before proceeding
            if (validateStep(index)) {
                goToStep(index + 1);
            }
        });
    });
    
    // Add click event to previous buttons
    prevButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            goToStep(index);
        });
    });
    
    // Validate step before proceeding
    function validateStep(stepIndex) {
        switch (stepIndex) {
            case 0: // Cart step
                // Check if cart has items
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                if (cart.length === 0) {
                    showMessage('Sepetinizde ürün bulunmamaktadır.', 'error');
                    return false;
                }
                
                // Check stock availability
                if (!checkStockAvailability()) {
                    return false;
                }
                
                return true;
                
            case 1: // Delivery step
                // Validate delivery form
                return validateDeliveryForm();
                
            case 2: // Payment step
                // Validate payment form
                return validatePaymentForm();
                
            default:
                return true;
        }
    }
}

// Load cart items
function loadCartItems() {
    const cartItemsContainer = document.querySelector('.checkout-items');
    const orderSummaryContainer = document.querySelector('.order-summary-items');
    const subtotalElement = document.querySelector('.subtotal-value');
    const shippingElement = document.querySelector('.shipping-value');
    const totalElement = document.querySelector('.total-value');
    
    if (!cartItemsContainer || !orderSummaryContainer || !subtotalElement || !shippingElement || !totalElement) return;
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        // Show empty cart message
        cartItemsContainer.innerHTML = '<div class="empty-cart">Sepetinizde ürün bulunmamaktadır.</div>';
        orderSummaryContainer.innerHTML = '<div class="empty-cart">Sepetinizde ürün bulunmamaktadır.</div>';
        subtotalElement.textContent = '0.00 TL';
        shippingElement.textContent = '0.00 TL';
        totalElement.textContent = '0.00 TL';
        return;
    }
    
    // Calculate totals
    let subtotal = 0;
    const shipping = cart.length > 0 ? 29.90 : 0;
    
    // Clear containers
    cartItemsContainer.innerHTML = '';
    orderSummaryContainer.innerHTML = '';
    
    // Add each item to the containers
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        // Create cart item element
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'checkout-item';
        cartItemElement.innerHTML = `
            <div class="checkout-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="checkout-item-details">
                <h4 class="checkout-item-title">${item.name}</h4>
                <div class="checkout-item-meta">
                    <span class="checkout-item-size">Boyut: ${formatSize(item.size)}</span>
                    <span class="checkout-item-frame">Çerçeve: ${formatFrame(item.frame)}</span>
                </div>
                <div class="checkout-item-price-qty">
                    <span class="checkout-item-price">${item.price.toFixed(2)} TL</span>
                    <div class="checkout-item-quantity">
                        <button class="quantity-minus" data-index="${index}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}" data-product-id="${item.id}" data-size="${item.size}" data-frame="${item.frame}">
                        <button class="quantity-plus" data-index="${index}">+</button>
                    </div>
                </div>
            </div>
            <div class="checkout-item-total">
                <span>${itemTotal.toFixed(2)} TL</span>
            </div>
            <button class="remove-item-btn" data-index="${index}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Create order summary item element
        const summaryItemElement = document.createElement('div');
        summaryItemElement.className = 'order-summary-item';
        summaryItemElement.innerHTML = `
            <div class="order-summary-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="order-summary-item-details">
                <h4 class="order-summary-item-title">${item.name}</h4>
                <div class="order-summary-item-meta">
                    <span>Boyut: ${formatSize(item.size)}</span>
                    <span>Çerçeve: ${formatFrame(item.frame)}</span>
                    <span>Adet: ${item.quantity}</span>
                </div>
            </div>
            <div class="order-summary-item-price">
                ${itemTotal.toFixed(2)} TL
            </div>
        `;
        
        // Add to containers
        cartItemsContainer.appendChild(cartItemElement);
        orderSummaryContainer.appendChild(summaryItemElement);
    });
    
    // Update totals
    const total = subtotal + shipping;
    subtotalElement.textContent = subtotal.toFixed(2) + ' TL';
    shippingElement.textContent = shipping.toFixed(2) + ' TL';
    totalElement.textContent = total.toFixed(2) + ' TL';
    
    // Add event listeners to quantity buttons and remove buttons
    initCartItemEvents();
}

// Initialize cart item events
function initCartItemEvents() {
    const quantityMinusButtons = document.querySelectorAll('.quantity-minus');
    const quantityPlusButtons = document.querySelectorAll('.quantity-plus');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    
    // Decrease quantity
    quantityMinusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
            let value = parseInt(input.value);
            
            if (value > 1) {
                value--;
                input.value = value;
                updateCartItemQuantity(index, value);
            }
        });
    });
    
    // Increase quantity
    quantityPlusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
            let value = parseInt(input.value);
            
            // Get product details for stock check
            const productId = input.getAttribute('data-product-id');
            const size = input.getAttribute('data-size');
            const frame = input.getAttribute('data-frame');
            
            // Check stock availability
            const maxStock = window.inventorySystem.getStockLevel(productId, size, frame);
            
            if (value < maxStock) {
                value++;
                input.value = value;
                updateCartItemQuantity(index, value);
            } else {
                showMessage('Maksimum stok miktarına ulaştınız!', 'error');
            }
        });
    });
    
    // Input change
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const index = parseInt(this.getAttribute('data-index'));
            let value = parseInt(this.value);
            
            // Get product details for stock check
            const productId = this.getAttribute('data-product-id');
            const size = this.getAttribute('data-size');
            const frame = this.getAttribute('data-frame');
            
            // Check stock availability
            const maxStock = window.inventorySystem.getStockLevel(productId, size, frame);
            
            if (isNaN(value) || value < 1) {
                value = 1;
            } else if (value > maxStock) {
                value = maxStock;
                showMessage('Maksimum stok miktarına ulaştınız!', 'error');
            }
            
            this.value = value;
            updateCartItemQuantity(index, value);
        });
    });
    
    // Remove item
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeCartItem(index);
        });
    });
}

// Update cart item quantity
function updateCartItemQuantity(index, quantity) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (index >= 0 && index < cart.length) {
        // Get the item being updated
        const item = cart[index];
        const oldQuantity = item.quantity;
        
        // Update quantity
        cart[index].quantity = quantity;
        
        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Restore inventory for removed quantity and update for new quantity
        if (oldQuantity > quantity) {
            // Restore inventory for removed quantity
            window.inventorySystem.restoreInventoryOnRemoveFromCart(
                item.id, item.size, item.frame, oldQuantity - quantity
            );
        } else if (quantity > oldQuantity) {
            // Update inventory for added quantity
            window.inventorySystem.updateInventoryOnAddToCart(
                item.id, item.size, item.frame, quantity - oldQuantity
            );
        }
        
        // Reload cart items to update display
        loadCartItems();
    }
}

// Remove cart item
function removeCartItem(index) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (index >= 0 && index < cart.length) {
        // Get the item being removed
        const item = cart[index];
        
        // Restore inventory
        window.inventorySystem.restoreInventoryOnRemoveFromCart(
            item.id, item.size, item.frame, item.quantity
        );
        
        // Remove item from cart
        cart.splice(index, 1);
        
        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Reload cart items to update display
        loadCartItems();
        
        // Update cart count
        updateCartCount();
    }
}

// Check stock availability for all items
function checkStockAvailability() {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let allItemsInStock = true;
    
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        
        // Check if item is in stock
        if (!window.inventorySystem.isInStock(item.id, item.size, item.frame, item.quantity)) {
            // Item is not in stock or not enough quantity
            allItemsInStock = false;
            
            // Show error message
            showMessage(`"${item.name}" ürünü stokta yok veya yeterli miktarda bulunmuyor.`, 'error');
            
            // Highlight the item
            const itemElement = document.querySelector(`.checkout-item:nth-child(${i + 1})`);
            if (itemElement) {
                itemElement.classList.add('out-of-stock');
            }
        }
    }
    
    return allItemsInStock;
}

// Initialize form validation
function initFormValidation() {
    // Add event listeners to form inputs
    const formInputs = document.querySelectorAll('.checkout-form input, .checkout-form select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
}

// Validate individual input
function validateInput(input) {
    const value = input.value.trim();
    const type = input.getAttribute('data-type');
    const required = input.hasAttribute('required');
    
    // Clear previous error
    const errorElement = input.parentElement.querySelector('.input-error');
    if (errorElement) {
        errorElement.remove();
    }
    
    // Check if required field is empty
    if (required && value === '') {
        showInputError(input, 'Bu alan zorunludur.');
        return false;
    }
    
    // Validate based on type
    switch (type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value !== '' && !emailRegex.test(value)) {
                showInputError(input, 'Geçerli bir e-posta adresi giriniz.');
                return false;
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[0-9]{10}$/;
            if (value !== '' && !phoneRegex.test(value)) {
                showInputError(input, 'Geçerli bir telefon numarası giriniz (10 haneli).');
                return false;
            }
            break;
            
        case 'number':
            if (value !== '' && isNaN(value)) {
                showInputError(input, 'Geçerli bir sayı giriniz.');
                return false;
            }
            break;
            
        case 'creditcard':
            const ccRegex = /^[0-9]{16}$/;
            if (value !== '' && !ccRegex.test(value)) {
                showInputError(input, 'Geçerli bir kredi kartı numarası giriniz (16 haneli).');
                return false;
            }
            break;
            
        case 'expiry':
            const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
            if (value !== '' && !expiryRegex.test(value)) {
                showInputError(input, 'Geçerli bir son kullanma tarihi giriniz (AA/YY).');
                return false;
            }
            break;
            
        case 'cvv':
            const cvvRegex = /^[0-9]{3,4}$/;
            if (value !== '' && !cvvRegex.test(value)) {
                showInputError(input, 'Geçerli bir CVV kodu giriniz (3 veya 4 haneli).');
                return false;
            }
            break;
    }
    
    return true;
}

// Show input error
function showInputError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'input-error';
    errorElement.textContent = message;
    
    input.parentElement.appendChild(errorElement);
    input.classList.add('error');
}

// Validate delivery form
function validateDeliveryForm() {
    const deliveryForm = document.querySelector('#delivery-form');
    if (!deliveryForm) return true;
    
    const inputs = deliveryForm.querySelectorAll('input, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate payment form
function validatePaymentForm() {
    const paymentForm = document.querySelector('#payment-form');
    if (!paymentForm) return true;
    
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!paymentMethod) {
        showMessage('Lütfen bir ödeme yöntemi seçiniz.', 'error');
        return false;
    }
    
    // Validate based on payment method
    if (paymentMethod.value === 'credit-card') {
        const ccInputs = document.querySelectorAll('#credit-card-form input');
        let isValid = true;
        
        ccInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    } else if (paymentMethod.value === 'bank-transfer') {
        const bankSelect = document.querySelector('#bank-select');
        if (!bankSelect || bankSelect.value === '') {
            showMessage('Lütfen bir banka seçiniz.', 'error');
            return false;
        }
        
        return true;
    }
    
    return true;
}

// Initialize payment methods
function initPaymentMethods() {
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const paymentForms = document.querySelectorAll('.payment-method-form');
    
    if (paymentMethods.length === 0 || paymentForms.length === 0) return;
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Hide all payment forms
            paymentForms.forEach(form => {
                form.classList.remove('active');
            });
            
            // Show selected payment form
            const selectedForm = document.querySelector(`#${this.value}-form`);
            if (selectedForm) {
                selectedForm.classList.add('active');
            }
        });
    });
    
    // Format credit card inputs
    initCreditCardFormatting();
}

// Initialize credit card input formatting
function initCreditCardFormatting() {
    const ccNumber = document.querySelector('#cc-number');
    const ccExpiry = document.querySelector('#cc-expiry');
    const ccCvv = document.querySelector('#cc-cvv');
    
    if (ccNumber) {
        ccNumber.addEventListener('input', function() {
            // Format credit card number with spaces
            let value = this.value.replace(/\D/g, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            this.value = formattedValue;
        });
    }
    
    if (ccExpiry) {
        ccExpiry.addEventListener('input', function() {
            // Format expiry date as MM/YY
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 2) {
                this.value = value.substring(0, 2) + '/' + value.substring(2, 4);
            } else {
                this.value = value;
            }
        });
    }
}

// Initialize installment options
function initInstallmentOptions() {
    const ccNumber = document.querySelector('#cc-number');
    const installmentOptions = document.querySelector('.installment-options');
    
    if (!ccNumber || !installmentOptions) return;
    
    ccNumber.addEventListener('input', function() {
        // Show installment options when card number is entered
        if (this.value.replace(/\D/g, '').length >= 6) {
            installmentOptions.classList.add('active');
        } else {
            installmentOptions.classList.remove('active');
        }
    });
    
    // Add event listeners to installment options
    const installmentRadios = document.querySelectorAll('input[name="installment"]');
    const totalElement = document.querySelector('.total-value');
    const installmentTotalElement = document.querySelector('.installment-total-value');
    
    if (installmentRadios.length > 0 && totalElement && installmentTotalElement) {
        installmentRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const installmentCount = parseInt(this.value);
                const totalAmount = parseFloat(totalElement.textContent.replace(' TL', '').replace(',', '.'));
                
                if (installmentCount === 1) {
                    // Single payment
                    installmentTotalElement.textContent = totalAmount.toFixed(2) + ' TL';
                } else {
                    // Calculate installment amount
                    const installmentAmount = totalAmount / installmentCount;
                    installmentTotalElement.textContent = `${installmentCount} x ${installmentAmount.toFixed(2)} TL = ${totalAmount.toFixed(2)} TL`;
                }
            });
        });
    }
}

// Initialize order summary toggle for mobile
function initOrderSummaryToggle() {
    const summaryToggle = document.querySelector('.order-summary-toggle');
    const orderSummary = document.querySelector('.order-summary');
    
    if (!summaryToggle || !orderSummary) return;
    
    summaryToggle.addEventListener('click', function() {
        orderSummary.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

// Format size for display
function formatSize(size) {
    switch (size) {
        case 'small':
            return 'Küçük (30x40 cm)';
        case 'medium':
            return 'Orta (50x70 cm)';
        case 'large':
            return 'Büyük (70x100 cm)';
        default:
            return size;
    }
}

// Format frame for display
function formatFrame(frame) {
    switch (frame) {
        case 'with-frame':
            return 'Çerçeveli';
        case 'without-frame':
            return 'Çerçevesiz';
        default:
            return frame;
    }
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

// Place order function
document.querySelector('.place-order-btn').addEventListener('click', function() {
    // Validate all steps
    if (!validateDeliveryForm() || !validatePaymentForm()) {
        return;
    }
    
    // Check stock availability one last time
    if (!checkStockAvailability()) {
        return;
    }
    
    // Get cart items
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update inventory after successful checkout
    const orderItems = cart.map(item => ({
        id: item.id,
        size: item.size,
        frame: item.frame,
        quantity: item.quantity
    }));
    
    const inventoryUpdated = window.inventorySystem.updateInventoryAfterCheckout(orderItems);
    
    if (!inventoryUpdated) {
        showMessage('Sipariş işlemi sırasında stok problemi oluştu. Lütfen tekrar deneyiniz.', 'error');
        return;
    }
    
    // Show order confirmation
    const orderConfirmation = document.querySelector('.order-confirmation');
    if (orderConfirmation) {
        // Generate order number
        const orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
        const orderNumberElement = orderConfirmation.querySelector('.order-number');
        if (orderNumberElement) {
            orderNumberElement.textContent = orderNumber;
        }
        
        // Show confirmation
        orderConfirmation.classList.add('active');
        
        // Clear cart
        localStorage.removeItem('cart');
        
        // Update cart count
        updateCartCount();
    }
});

// Close order confirmation
document.querySelector('.continue-shopping-btn').addEventListener('click', function() {
    const orderConfirmation = document.querySelector('.order-confirmation');
    if (orderConfirmation) {
        orderConfirmation.classList.remove('active');
    }
    
    // Redirect to home page
    window.location.href = 'index.html';
});