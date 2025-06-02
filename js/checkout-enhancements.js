/**
 * Checkout Enhancements
 * Additional functionality for the checkout process
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize city-district relationship
    initCityDistrictRelationship();
    
    // Initialize form field validation with better feedback
    initEnhancedFormValidation();
    
    // Initialize order review functionality
    initOrderReview();
    
    // Initialize coupon code functionality
    initCouponCode();
    
    // Initialize IBAN copy functionality
    initIbanCopy();
    
    // Initialize CVV tooltip
    initCvvTooltip();
});

/**
 * Initialize city-district relationship
 * Populates the district dropdown based on the selected city
 */
function initCityDistrictRelationship() {
    const citySelect = document.getElementById('city');
    const districtSelect = document.getElementById('district');
    
    if (!citySelect || !districtSelect) return;
    
    // City-district data
    const cityDistricts = {
        'istanbul': ['Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler', 'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü', 'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt', 'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane', 'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer', 'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli', 'Tuzla', 'Ümraniye', 'Üsküdar', 'Zeytinburnu'],
        'ankara': ['Akyurt', 'Altındağ', 'Ayaş', 'Bala', 'Beypazarı', 'Çamlıdere', 'Çankaya', 'Çubuk', 'Elmadağ', 'Etimesgut', 'Evren', 'Gölbaşı', 'Güdül', 'Haymana', 'Kahramankazan', 'Kalecik', 'Keçiören', 'Kızılcahamam', 'Mamak', 'Nallıhan', 'Polatlı', 'Pursaklar', 'Sincan', 'Şereflikoçhisar', 'Yenimahalle'],
        'izmir': ['Aliağa', 'Balçova', 'Bayındır', 'Bayraklı', 'Bergama', 'Beydağ', 'Bornova', 'Buca', 'Çeşme', 'Çiğli', 'Dikili', 'Foça', 'Gaziemir', 'Güzelbahçe', 'Karabağlar', 'Karaburun', 'Karşıyaka', 'Kemalpaşa', 'Kınık', 'Kiraz', 'Konak', 'Menderes', 'Menemen', 'Narlıdere', 'Ödemiş', 'Seferihisar', 'Selçuk', 'Tire', 'Torbalı', 'Urla'],
        'bursa': ['Büyükorhan', 'Gemlik', 'Gürsu', 'Harmancık', 'İnegöl', 'İznik', 'Karacabey', 'Keles', 'Kestel', 'Mudanya', 'Mustafakemalpaşa', 'Nilüfer', 'Orhaneli', 'Orhangazi', 'Osmangazi', 'Yenişehir', 'Yıldırım'],
        'antalya': ['Akseki', 'Aksu', 'Alanya', 'Demre', 'Döşemealtı', 'Elmalı', 'Finike', 'Gazipaşa', 'Gündoğmuş', 'İbradı', 'Kaş', 'Kemer', 'Kepez', 'Konyaaltı', 'Korkuteli', 'Kumluca', 'Manavgat', 'Muratpaşa', 'Serik']
    };
    
    // Update districts when city changes
    citySelect.addEventListener('change', function() {
        const selectedCity = this.value;
        
        // Clear current options
        districtSelect.innerHTML = '';
        
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Seçiniz';
        districtSelect.appendChild(defaultOption);
        
        // If a city is selected, populate districts
        if (selectedCity && cityDistricts[selectedCity]) {
            cityDistricts[selectedCity].forEach(district => {
                const option = document.createElement('option');
                option.value = district.toLowerCase();
                option.textContent = district;
                districtSelect.appendChild(option);
            });
            
            // Enable district select
            districtSelect.disabled = false;
        } else {
            // Disable district select if no city selected
            districtSelect.disabled = true;
            defaultOption.textContent = 'Önce şehir seçiniz';
        }
    });
}

/**
 * Initialize enhanced form validation
 * Provides better feedback for form fields
 */
function initEnhancedFormValidation() {
    const formFields = document.querySelectorAll('input, select, textarea');
    
    formFields.forEach(field => {
        // Add blur event for validation when user leaves a field
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Remove error class when user starts typing
        field.addEventListener('input', function() {
            this.classList.remove('error');
            
            // Remove error message if exists
            const errorMessage = this.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.remove();
            }
        });
    });
    
    // Add special validation for email field
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                showFieldError(this, 'Lütfen geçerli bir e-posta adresi giriniz.');
            }
        });
    }
    
    // Add special validation for phone field
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('input', function() {
            // Format phone number as user types
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length > 10) value = value.substr(0, 10);
                
                // Format as 5XX XXX XX XX
                if (value.length > 3) value = value.substr(0, 3) + ' ' + value.substr(3);
                if (value.length > 7) value = value.substr(0, 7) + ' ' + value.substr(7);
                if (value.length > 10) value = value.substr(0, 10) + ' ' + value.substr(10);
            }
            this.value = value;
        });
        
        phoneField.addEventListener('blur', function() {
            if (this.value && this.value.replace(/\D/g, '').length !== 10) {
                showFieldError(this, 'Telefon numarası 10 haneli olmalıdır.');
            }
        });
    }
}

/**
 * Validate a single form field
 * @param {HTMLElement} field - The field to validate
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field) {
    // Skip if field doesn't have required attribute
    if (!field.hasAttribute('required')) return true;
    
    // Check if field is empty
    if (!field.value.trim()) {
        showFieldError(field, 'Bu alan zorunludur.');
        return false;
    }
    
    // Additional validation based on field type
    if (field.type === 'email' && !isValidEmail(field.value)) {
        showFieldError(field, 'Lütfen geçerli bir e-posta adresi giriniz.');
        return false;
    }
    
    if (field.id === 'phone' && field.value.replace(/\D/g, '').length !== 10) {
        showFieldError(field, 'Telefon numarası 10 haneli olmalıdır.');
        return false;
    }
    
    return true;
}

/**
 * Show error message for a field
 * @param {HTMLElement} field - The field with error
 * @param {string} message - The error message
 */
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Check if error message already exists
    let errorMessage = field.nextElementSibling;
    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
        // Create new error message
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        field.parentNode.insertBefore(errorMessage, field.nextSibling);
    }
    
    errorMessage.textContent = message;
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Initialize order review functionality
 * Updates the review section with form data
 */
function initOrderReview() {
    const nextButtons = document.querySelectorAll('.next-step');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextSection = this.getAttribute('data-next');
            
            if (nextSection === 'review-section') {
                updateOrderReview();
            }
        });
    });
    
    // Initialize edit buttons
    const editButtons = document.querySelectorAll('.edit-section');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionToEdit = this.getAttribute('data-section');
            showSection(sectionToEdit);
        });
    });
}

/**
 * Update the order review section with form data
 */
function updateOrderReview() {
    // Update delivery info
    document.getElementById('review-fullname').textContent = document.getElementById('fullname').value;
    document.getElementById('review-email').textContent = document.getElementById('email').value;
    document.getElementById('review-phone').textContent = document.getElementById('phone').value;
    document.getElementById('review-address').textContent = document.getElementById('address').value;
    
    const city = document.getElementById('city');
    const district = document.getElementById('district');
    document.getElementById('review-city-district').textContent = 
        `${city.options[city.selectedIndex].text}, ${district.options[district.selectedIndex].text}`;
    
    document.getElementById('review-postal-code').textContent = document.getElementById('postal-code').value;
    
    // Update payment info
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    const reviewPaymentMethod = document.getElementById('review-payment-method');
    const reviewCardInfo = document.getElementById('review-card-info');
    const reviewBankInfo = document.getElementById('review-bank-info');
    
    if (paymentMethod.value === 'credit-card') {
        reviewPaymentMethod.textContent = 'Kredi Kartı';
        reviewCardInfo.classList.remove('hidden');
        reviewBankInfo.classList.add('hidden');
        
        document.getElementById('review-card-holder').textContent = document.getElementById('card-holder').value;
        
        // Mask card number for security
        const cardNumber = document.getElementById('card-number').value;
        const lastFour = cardNumber.replace(/\s/g, '').slice(-4);
        document.getElementById('review-card-number').textContent = `**** **** **** ${lastFour}`;
        
        // Get installment info
        const installment = document.querySelector('input[name="installment"]:checked');
        const installmentLabel = installment.nextElementSibling.textContent;
        const installmentAmount = installment.parentElement.querySelector('.installment-amount').textContent;
        document.getElementById('review-installment').textContent = `${installmentLabel} (${installmentAmount})`;
    } else {
        reviewPaymentMethod.textContent = 'Havale / EFT';
        reviewCardInfo.classList.add('hidden');
        reviewBankInfo.classList.remove('hidden');
    }
}

/**
 * Show a specific section of the checkout form
 * @param {string} sectionId - The ID of the section to show
 */
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.checkout-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show the requested section
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.classList.remove('hidden');
    }
}

/**
 * Initialize coupon code functionality
 */
function initCouponCode() {
    const couponButton = document.querySelector('.coupon-code button');
    const couponInput = document.querySelector('.coupon-code input');
    
    if (!couponButton || !couponInput) return;
    
    couponButton.addEventListener('click', function() {
        const couponCode = couponInput.value.trim();
        
        if (!couponCode) {
            showError('Lütfen bir indirim kodu giriniz.');
            return;
        }
        
        // Example coupon codes
        const validCoupons = {
            'WELCOME10': 10,
            'POSTER20': 20,
            'SUMMER15': 15
        };
        
        if (validCoupons[couponCode]) {
            applyCoupon(couponCode, validCoupons[couponCode]);
        } else {
            showError('Geçersiz indirim kodu.');
        }
    });
}

/**
 * Apply a coupon code to the order
 * @param {string} code - The coupon code
 * @param {number} discountPercent - The discount percentage
 */
function applyCoupon(code, discountPercent) {
    // Get subtotal
    const subtotalElement = document.querySelector('.total-row:first-child span:last-child');
    const subtotalText = subtotalElement.textContent;
    const subtotal = parseFloat(subtotalText.replace('₺', '').replace(',', '.'));
    
    // Calculate discount
    const discount = (subtotal * discountPercent) / 100;
    const discountFormatted = discount.toFixed(2).replace('.', ',');
    
    // Update discount row
    const discountRow = document.querySelector('.total-row.discount');
    discountRow.classList.remove('hidden');
    discountRow.querySelector('span:first-child').textContent = `İndirim (${code})`;
    discountRow.querySelector('span:last-child').textContent = `-₺${discountFormatted}`;
    
    // Update total
    const totalElement = document.querySelector('.total-row.grand-total span:last-child');
    const newTotal = subtotal - discount;
    totalElement.textContent = `₺${newTotal.toFixed(2).replace('.', ',')}`;
    
    // Show success message
    showSuccess(`"${code}" indirim kodu başarıyla uygulandı.`);
    
    // Disable coupon input and button
    document.querySelector('.coupon-code input').disabled = true;
    document.querySelector('.coupon-code button').disabled = true;
}

/**
 * Initialize IBAN copy functionality
 */
function initIbanCopy() {
    const copyButtons = document.querySelectorAll('.copy-iban button');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ibanElement = this.closest('.bank-account').querySelector('.bank-info p:last-child');
            const iban = ibanElement.textContent.split(':')[1].trim();
            
            // Copy to clipboard
            navigator.clipboard.writeText(iban).then(() => {
                // Change button text temporarily
                const originalText = this.textContent;
                this.textContent = 'Kopyalandı!';
                
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });
}

/**
 * Initialize CVV tooltip functionality
 */
function initCvvTooltip() {
    const cvvInfo = document.querySelector('.cvv-info');
    
    if (cvvInfo) {
        const icon = cvvInfo.querySelector('i');
        const tooltip = cvvInfo.querySelector('.cvv-tooltip');
        
        // Show tooltip on click (for mobile)
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            tooltip.style.opacity = tooltip.style.opacity === '1' ? '0' : '1';
            tooltip.style.visibility = tooltip.style.opacity === '1' ? 'visible' : 'hidden';
            
            // Hide tooltip after 3 seconds
            setTimeout(() => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            }, 3000);
        });
    }
}

/**
 * Show error message
 * @param {string} message - The error message
 */
function showError(message) {
    // Create error toast
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.innerHTML = `
        <div class="error-toast-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide and remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

/**
 * Show success message
 * @param {string} message - The success message
 */
function showSuccess(message) {
    // Create success toast
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.innerHTML = `
        <div class="success-toast-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide and remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}