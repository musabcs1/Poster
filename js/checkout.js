document.addEventListener('DOMContentLoaded', function() {
    // Initialize checkout steps
    initCheckoutSteps();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize payment methods
    initPaymentMethods();
    
    // Initialize installment options
    initInstallmentOptions();
    
    // Initialize order summary
    initOrderSummary();
    
    // Initialize cart items display
    loadCartItems();
    
    // Update cart count
    updateCartCount();
});

// Initialize Checkout Steps
function initCheckoutSteps() {
    const steps = document.querySelectorAll('.checkout-step');
    const stepContents = document.querySelectorAll('.step-content');
    const nextButtons = document.querySelectorAll('.btn-next-step');
    const prevButtons = document.querySelectorAll('.btn-prev-step');
    
    // Set initial active step
    if (steps.length > 0 && stepContents.length > 0) {
        steps[0].classList.add('active');
        stepContents[0].classList.add('active');
    }
    
    // Next step buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const currentStep = this.closest('.step-content');
            const currentStepIndex = Array.from(stepContents).indexOf(currentStep);
            
            // Validate current step before proceeding
            if (validateStep(currentStepIndex)) {
                // Move to next step
                if (currentStepIndex < stepContents.length - 1) {
                    // Update step indicators
                    steps[currentStepIndex].classList.remove('active');
                    steps[currentStepIndex].classList.add('completed');
                    steps[currentStepIndex + 1].classList.add('active');
                    
                    // Update step content
                    stepContents[currentStepIndex].classList.remove('active');
                    stepContents[currentStepIndex + 1].classList.add('active');
                    
                    // Scroll to top
                    window.scrollTo({
                        top: document.querySelector('.checkout-container').offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Previous step buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const currentStep = this.closest('.step-content');
            const currentStepIndex = Array.from(stepContents).indexOf(currentStep);
            
            // Move to previous step
            if (currentStepIndex > 0) {
                // Update step indicators
                steps[currentStepIndex].classList.remove('active');
                steps[currentStepIndex - 1].classList.remove('completed');
                steps[currentStepIndex - 1].classList.add('active');
                
                // Update step content
                stepContents[currentStepIndex].classList.remove('active');
                stepContents[currentStepIndex - 1].classList.add('active');
                
                // Scroll to top
                window.scrollTo({
                    top: document.querySelector('.checkout-container').offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Step indicators click
    steps.forEach((step, index) => {
        step.addEventListener('click', function() {
            // Only allow clicking on completed steps or the active step
            if (this.classList.contains('completed') || this.classList.contains('active')) {
                // Update step indicators
                steps.forEach((s, i) => {
                    s.classList.remove('active');
                    if (i < index) {
                        s.classList.add('completed');
                    } else {
                        s.classList.remove('completed');
                    }
                });
                this.classList.add('active');
                
                // Update step content
                stepContents.forEach(content => content.classList.remove('active'));
                stepContents[index].classList.add('active');
                
                // Scroll to top
                window.scrollTo({
                    top: document.querySelector('.checkout-container').offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Validate current step
function validateStep(stepIndex) {
    switch (stepIndex) {
        case 0: // Cart step
            // Check if cart has items
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                showError('Sepetinizde ürün bulunmamaktadır.');
                return false;
            }
            return true;
            
        case 1: // Delivery step
            return validateDeliveryForm();
            
        case 2: // Payment step
            return validatePaymentForm();
            
        default:
            return true;
    }
}

// Validate delivery form
function validateDeliveryForm() {
    const form = document.querySelector('#delivery-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Check all required fields
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            
            // Add error message if not exists
            let errorMessage = field.nextElementSibling;
            if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Bu alan zorunludur.';
                field.parentNode.insertBefore(errorMessage, field.nextSibling);
            }
        } else {
            field.classList.remove('error');
            
            // Remove error message if exists
            const errorMessage = field.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.remove();
            }
        }
    });
    
    // Validate email format
    const emailField = form.querySelector('#email');
    if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
            isValid = false;
            emailField.classList.add('error');
            
            // Add error message if not exists
            let errorMessage = emailField.nextElementSibling;
            if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Geçerli bir e-posta adresi giriniz.';
                emailField.parentNode.insertBefore(errorMessage, emailField.nextSibling);
            } else {
                errorMessage.textContent = 'Geçerli bir e-posta adresi giriniz.';
            }
        }
    }
    
    // Validate phone format
    const phoneField = form.querySelector('#phone');
    if (phoneField && phoneField.value.trim()) {
        const phoneRegex = /^(\+90|0)?\s*5[0-9]{2}\s*[0-9]{3}\s*[0-9]{2}\s*[0-9]{2}$/;
        if (!phoneRegex.test(phoneField.value.trim())) {
            isValid = false;
            phoneField.classList.add('error');
            
            // Add error message if not exists
            let errorMessage = phoneField.nextElementSibling;
            if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Geçerli bir telefon numarası giriniz (5XX XXX XX XX).';
                phoneField.parentNode.insertBefore(errorMessage, phoneField.nextSibling);
            } else {
                errorMessage.textContent = 'Geçerli bir telefon numarası giriniz (5XX XXX XX XX).';
            }
        }
    }
    
    if (!isValid) {
        showError('Lütfen tüm zorunlu alanları doldurunuz.');
    }
    
    return isValid;
}

// Validate payment form
function validatePaymentForm() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    
    if (!paymentMethod) {
        showError('Lütfen bir ödeme yöntemi seçiniz.');
        return false;
    }
    
    if (paymentMethod.value === 'credit-card') {
        return validateCreditCardForm();
    } else if (paymentMethod.value === 'bank-transfer') {
        return true; // No validation needed for bank transfer
    }
    
    return true;
}

// Validate credit card form
function validateCreditCardForm() {
    const form = document.querySelector('#credit-card-form');
    const cardNumber = form.querySelector('#card-number');
    const cardName = form.querySelector('#card-name');
    const cardExpiry = form.querySelector('#card-expiry');
    const cardCvv = form.querySelector('#card-cvv');
    let isValid = true;
    
    // Validate card number
    if (!cardNumber.value.trim() || cardNumber.value.replace(/\s/g, '').length !== 16) {
        isValid = false;
        cardNumber.classList.add('error');
        
        // Add error message
        let errorMessage = cardNumber.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Geçerli bir kart numarası giriniz.';
            cardNumber.parentNode.insertBefore(errorMessage, cardNumber.nextSibling);
        }
    } else {
        cardNumber.classList.remove('error');
        
        // Remove error message if exists
        const errorMessage = cardNumber.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
    }
    
    // Validate card name
    if (!cardName.value.trim()) {
        isValid = false;
        cardName.classList.add('error');
        
        // Add error message
        let errorMessage = cardName.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Kart üzerindeki ismi giriniz.';
            cardName.parentNode.insertBefore(errorMessage, cardName.nextSibling);
        }
    } else {
        cardName.classList.remove('error');
        
        // Remove error message if exists
        const errorMessage = cardName.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
    }
    
    // Validate card expiry
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!cardExpiry.value.trim() || !expiryRegex.test(cardExpiry.value.trim())) {
        isValid = false;
        cardExpiry.classList.add('error');
        
        // Add error message
        let errorMessage = cardExpiry.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Geçerli bir son kullanma tarihi giriniz (AA/YY).';
            cardExpiry.parentNode.insertBefore(errorMessage, cardExpiry.nextSibling);
        }
    } else {
        cardExpiry.classList.remove('error');
        
        // Remove error message if exists
        const errorMessage = cardExpiry.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
    }
    
    // Validate CVV
    if (!cardCvv.value.trim() || cardCvv.value.length !== 3) {
        isValid = false;
        cardCvv.classList.add('error');
        
        // Add error message
        let errorMessage = cardCvv.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Geçerli bir CVV kodu giriniz.';
            cardCvv.parentNode.insertBefore(errorMessage, cardCvv.nextSibling);
        }
    } else {
        cardCvv.classList.remove('error');
        
        // Remove error message if exists
        const errorMessage = cardCvv.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
    }
    
    // Check terms and conditions
    const termsCheckbox = document.querySelector('#terms-checkbox');
    if (!termsCheckbox.checked) {
        isValid = false;
        termsCheckbox.classList.add('error');
        
        // Add error message
        let errorMessage = termsCheckbox.parentNode.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Şartları ve koşulları kabul etmelisiniz.';
            termsCheckbox.parentNode.parentNode.insertBefore(errorMessage, termsCheckbox.parentNode.nextSibling);
        }
    } else {
        termsCheckbox.classList.remove('error');
        
        // Remove error message if exists
        const errorMessage = termsCheckbox.parentNode.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
    }
    
    if (!isValid) {
        showError('Lütfen tüm kart bilgilerini doğru şekilde giriniz.');
    }
    
    return isValid;
}

// Initialize Form Validation
function initFormValidation() {
    // Add input event listeners to all form fields
    const formFields = document.querySelectorAll('input, select, textarea');
    
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            // Remove error class and message when user starts typing
            this.classList.remove('error');
            
            const errorMessage = this.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.remove();
            }
        });
    });
    
    // Format credit card number with spaces
    const cardNumberField = document.querySelector('#card-number');
    if (cardNumberField) {
        cardNumberField.addEventListener('input', function(e) {
            // Remove non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Limit to 16 digits
            if (value.length > 16) {
                value = value.slice(0, 16);
            }
            
            // Add spaces after every 4 digits
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
    
    // Format expiry date (MM/YY)
    const expiryField = document.querySelector('#card-expiry');
    if (expiryField) {
        expiryField.addEventListener('input', function(e) {
            // Remove non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Limit to 4 digits
            if (value.length > 4) {
                value = value.slice(0, 4);
            }
            
            // Format as MM/YY
            if (value.length > 2) {
                this.value = value.slice(0, 2) + '/' + value.slice(2);
            } else {
                this.value = value;
            }
            
            // Validate month (01-12)
            if (value.length >= 2) {
                const month = parseInt(value.slice(0, 2));
                if (month < 1 || month > 12) {
                    this.classList.add('error');
                    
                    // Add error message
                    let errorMessage = this.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'Geçerli bir ay giriniz (01-12).';
                        this.parentNode.insertBefore(errorMessage, this.nextSibling);
                    }
                } else {
                    this.classList.remove('error');
                    
                    // Remove error message if exists
                    const errorMessage = this.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                }
            }
        });
    }
    
    // Limit CVV to 3 digits
    const cvvField = document.querySelector('#card-cvv');
    if (cvvField) {
        cvvField.addEventListener('input', function(e) {
            // Remove non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Limit to 3 digits
            if (value.length > 3) {
                value = value.slice(0, 3);
            }
            
            this.value = value;
        });
    }
    
    // Format phone number
    const phoneField = document.querySelector('#phone');
    if (phoneField) {
        phoneField.addEventListener('input', function(e) {
            // Remove non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            
            // Format as 5XX XXX XX XX
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i === 3 || i === 6 || i === 8) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            this.value = formattedValue;
        });
    }
}

// Initialize Payment Methods
function initPaymentMethods() {
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const creditCardForm = document.querySelector('#credit-card-form');
    const bankTransferInfo = document.querySelector('#bank-transfer-info');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'credit-card') {
                creditCardForm.style.display = 'block';
                bankTransferInfo.style.display = 'none';
            } else if (this.value === 'bank-transfer') {
                creditCardForm.style.display = 'none';
                bankTransferInfo.style.display = 'block';
            }
        });
    });
    
    // Set default payment method
    const defaultMethod = document.querySelector('input[name="payment-method"]:checked');
    if (defaultMethod) {
        if (defaultMethod.value === 'credit-card') {
            creditCardForm.style.display = 'block';
            bankTransferInfo.style.display = 'none';
        } else if (defaultMethod.value === 'bank-transfer') {
            creditCardForm.style.display = 'none';
            bankTransferInfo.style.display = 'block';
        }
    } else {
        // Select first method by default
        const firstMethod = document.querySelector('input[name="payment-method"]');
        if (firstMethod) {
            firstMethod.checked = true;
            if (firstMethod.value === 'credit-card') {
                creditCardForm.style.display = 'block';
                bankTransferInfo.style.display = 'none';
            } else if (firstMethod.value === 'bank-transfer') {
                creditCardForm.style.display = 'none';
                bankTransferInfo.style.display = 'block';
            }
        }
    }
}

// Initialize Installment Options
function initInstallmentOptions() {
    const bankSelect = document.querySelector('#bank-select');
    const installmentOptions = document.querySelector('#installment-options');
    
    if (bankSelect && installmentOptions) {
        bankSelect.addEventListener('change', function() {
            const selectedBank = this.value;
            
            // Clear current options
            installmentOptions.innerHTML = '';
            
            if (selectedBank) {
                // Add installment options based on selected bank
                const options = getInstallmentOptions(selectedBank);
                
                options.forEach(option => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'installment-option';
                    
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = 'installment';
                    input.id = `installment-${option.value}`;
                    input.value = option.value;
                    
                    const label = document.createElement('label');
                    label.htmlFor = `installment-${option.value}`;
                    label.innerHTML = `${option.text} <span class="installment-amount">${option.amount}</span>`;
                    
                    optionElement.appendChild(input);
                    optionElement.appendChild(label);
                    installmentOptions.appendChild(optionElement);
                });
                
                // Select first option by default
                const firstOption = installmentOptions.querySelector('input[type="radio"]');
                if (firstOption) {
                    firstOption.checked = true;
                }
            }
        });
        
        // Trigger change event to load default options
        bankSelect.dispatchEvent(new Event('change'));
    }
}

// Get installment options based on selected bank
function getInstallmentOptions(bank) {
    // Calculate total amount
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = 0;
    
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('₺', '').replace(',', '.'));
        totalAmount += price * item.quantity;
    });
    
    // Default options for all banks
    const options = [
        {
            value: '1',
            text: 'Tek Çekim',
            amount: `₺${totalAmount.toFixed(2).replace('.', ',')}`
        }
    ];
    
    // Add bank-specific options
    switch (bank) {
        case 'garanti':
        case 'isbank':
        case 'akbank':
            // 3 installments
            options.push({
                value: '3',
                text: '3 Taksit',
                amount: `₺${(totalAmount / 3).toFixed(2).replace('.', ',')} x 3`
            });
            
            // 6 installments
            options.push({
                value: '6',
                text: '6 Taksit',
                amount: `₺${(totalAmount / 6).toFixed(2).replace('.', ',')} x 6`
            });
            
            // 9 installments
            options.push({
                value: '9',
                text: '9 Taksit',
                amount: `₺${(totalAmount / 9).toFixed(2).replace('.', ',')} x 9`
            });
            break;
            
        case 'yapikredi':
        case 'finansbank':
            // 3 installments
            options.push({
                value: '3',
                text: '3 Taksit',
                amount: `₺${(totalAmount / 3).toFixed(2).replace('.', ',')} x 3`
            });
            
            // 6 installments
            options.push({
                value: '6',
                text: '6 Taksit',
                amount: `₺${(totalAmount / 6).toFixed(2).replace('.', ',')} x 6`
            });
            break;
            
        case 'ziraat':
        case 'halkbank':
        case 'vakifbank':
            // 3 installments
            options.push({
                value: '3',
                text: '3 Taksit',
                amount: `₺${(totalAmount / 3).toFixed(2).replace('.', ',')} x 3`
            });
            
            // 6 installments
            options.push({
                value: '6',
                text: '6 Taksit',
                amount: `₺${(totalAmount / 6).toFixed(2).replace('.', ',')} x 6`
            });
            
            // 9 installments
            options.push({
                value: '9',
                text: '9 Taksit',
                amount: `₺${(totalAmount / 9).toFixed(2).replace('.', ',')} x 9`
            });
            
            // 12 installments
            options.push({
                value: '12',
                text: '12 Taksit',
                amount: `₺${(totalAmount / 12).toFixed(2).replace('.', ',')} x 12`
            });
            break;
    }
    
    return options;
}

// Initialize Order Summary
function initOrderSummary() {
    // Update order summary
    updateOrderSummary();
    
    // Add event listener to place order button
    const placeOrderBtn = document.querySelector('#place-order-btn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate payment form
            if (validatePaymentForm()) {
                // Process order
                processOrder();
            }
        });
    }
}

// Update order summary
function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotalElement = document.querySelector('#order-subtotal');
    const shippingElement = document.querySelector('#order-shipping');
    const totalElement = document.querySelector('#order-total');
    
    // Calculate subtotal
    let subtotal = 0;
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('₺', '').replace(',', '.'));
        subtotal += price * item.quantity;
    });
    
    // Set shipping cost
    const shippingCost = subtotal > 500 ? 0 : 29.99;
    
    // Calculate total
    const total = subtotal + shippingCost;
    
    // Update elements
    if (subtotalElement) {
        subtotalElement.textContent = `₺${subtotal.toFixed(2).replace('.', ',')}`;
    }
    
    if (shippingElement) {
        if (shippingCost === 0) {
            shippingElement.textContent = 'Ücretsiz';
        } else {
            shippingElement.textContent = `₺${shippingCost.toFixed(2).replace('.', ',')}`;
        }
    }
    
    if (totalElement) {
        totalElement.textContent = `₺${total.toFixed(2).replace('.', ',')}`;
    }
}

// Load cart items
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    
    if (cartItemsContainer) {
        // Clear current items
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            // Show empty cart message
            cartItemsContainer.innerHTML = '<div class="empty-cart-message">Sepetiniz boş.</div>';
            
            // Disable next button
            const nextButton = document.querySelector('.cart-step .btn-next-step');
            if (nextButton) {
                nextButton.disabled = true;
            }
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
            
            // Enable next button
            const nextButton = document.querySelector('.cart-step .btn-next-step');
            if (nextButton) {
                nextButton.disabled = false;
            }
        }
    }
    
    // Update order summary
    updateOrderSummary();
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
        loadCartItems();
        updateCartCount();
    }
}

// Remove cart item
function removeCartItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const updatedCart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Update UI
    loadCartItems();
    updateCartCount();
}

// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        
        if (cartCount > 0) {
            cartCountElement.classList.add('has-items');
        } else {
            cartCountElement.classList.remove('has-items');
        }
    }
}

// Process order
function processOrder() {
    // Get order data
    const orderData = {
        customer: {
            firstName: document.querySelector('#first-name').value,
            lastName: document.querySelector('#last-name').value,
            email: document.querySelector('#email').value,
            phone: document.querySelector('#phone').value,
            address: document.querySelector('#address').value,
            city: document.querySelector('#city').value,
            district: document.querySelector('#district').value,
            zipCode: document.querySelector('#zip-code').value
        },
        payment: {
            method: document.querySelector('input[name="payment-method"]:checked').value
        },
        items: JSON.parse(localStorage.getItem('cart')) || [],
        orderDate: new Date().toISOString(),
        orderNumber: generateOrderNumber()
    };
    
    // Add payment details based on method
    if (orderData.payment.method === 'credit-card') {
        orderData.payment.details = {
            cardNumber: document.querySelector('#card-number').value,
            cardName: document.querySelector('#card-name').value,
            cardExpiry: document.querySelector('#card-expiry').value,
            bank: document.querySelector('#bank-select').value,
            installment: document.querySelector('input[name="installment"]:checked').value
        };
    }
    
    // Calculate order totals
    let subtotal = 0;
    orderData.items.forEach(item => {
        const price = parseFloat(item.price.replace('₺', '').replace(',', '.'));
        subtotal += price * item.quantity;
    });
    
    const shippingCost = subtotal > 500 ? 0 : 29.99;
    const total = subtotal + shippingCost;
    
    orderData.totals = {
        subtotal: subtotal.toFixed(2),
        shipping: shippingCost.toFixed(2),
        total: total.toFixed(2)
    };
    
    // Save order to localStorage (in a real app, this would be sent to a server)
    saveOrder(orderData);
    
    // Show confirmation
    showOrderConfirmation(orderData);
    
    // Clear cart
    localStorage.removeItem('cart');
    updateCartCount();
}

// Generate order number
function generateOrderNumber() {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    return `PS-${year}${month}${day}-${random}`;
}

// Save order to localStorage
function saveOrder(orderData) {
    // Get existing orders
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Add new order
    orders.push(orderData);
    
    // Save updated orders
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Show order confirmation
function showOrderConfirmation(orderData) {
    // Create confirmation modal
    const modal = document.createElement('div');
    modal.className = 'order-confirmation-modal';
    
    // Create modal content
    modal.innerHTML = `
        <div class="confirmation-content">
            <div class="confirmation-header">
                <i class="fas fa-check-circle"></i>
                <h2>Siparişiniz Alındı!</h2>
                <p>Sipariş numaranız: <strong>${orderData.orderNumber}</strong></p>
            </div>
            
            <div class="confirmation-details">
                <p>Siparişinizin bir özeti e-posta adresinize gönderildi: <strong>${orderData.customer.email}</strong></p>
                <p>Siparişiniz en kısa sürede hazırlanıp kargoya verilecektir.</p>
                
                <div class="confirmation-summary">
                    <h3>Sipariş Özeti</h3>
                    <div class="confirmation-items">
                        ${orderData.items.map(item => `
                            <div class="confirmation-item">
                                <span>${item.title} (${item.size}, ${item.frame})</span>
                                <span>${item.quantity} adet</span>
                                <span>${item.price}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="confirmation-totals">
                        <div class="total-row">
                            <span>Ara Toplam:</span>
                            <span>₺${parseFloat(orderData.totals.subtotal).toFixed(2).replace('.', ',')}</span>
                        </div>
                        <div class="total-row">
                            <span>Kargo:</span>
                            <span>${parseFloat(orderData.totals.shipping) === 0 ? 'Ücretsiz' : '₺' + parseFloat(orderData.totals.shipping).toFixed(2).replace('.', ',')}</span>
                        </div>
                        <div class="total-row grand-total">
                            <span>Toplam:</span>
                            <span>₺${parseFloat(orderData.totals.total).toFixed(2).replace('.', ',')}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="confirmation-actions">
                <a href="index.html" class="btn btn-primary">Alışverişe Devam Et</a>
            </div>
        </div>
    `;
    
    // Add modal to DOM
    document.body.appendChild(modal);
    
    // Add overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay active';
    document.body.appendChild(overlay);
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 100);
    
    // Add event listener to continue shopping button
    const continueButton = modal.querySelector('.btn-primary');
    continueButton.addEventListener('click', function() {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.removeChild(overlay);
            
            // Redirect to home page
            window.location.href = 'index.html';
        }, 300);
    });
}

// Show error message
function showError(message) {
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-toast';
    errorElement.innerHTML = `
        <div class="error-toast-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(errorElement);
    
    // Show message
    setTimeout(() => {
        errorElement.classList.add('show');
    }, 100);
    
    // Remove message after delay
    setTimeout(() => {
        errorElement.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(errorElement);
        }, 300);
    }, 5000);
}