// Main JavaScript for PosterSanatı

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeaderScroll();
    initSearchOverlay();
    initMobileMenu();
    initCartSidebar();
    initLightbox();
    initScrollAnimations();
    initParallaxEffect();
    initProductInteractions();
    initSmoothScrolling();
});

// Header scroll behavior
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background when scrolled
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Search overlay functionality
function initSearchOverlay() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchClose = document.querySelector('.search-close');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchInput = document.querySelector('.search-form input');
    
    if (searchToggle && searchClose && searchOverlay) {
        searchToggle.addEventListener('click', function() {
            searchOverlay.classList.add('active');
            setTimeout(() => {
                searchInput.focus();
            }, 300);
        });
        
        searchClose.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
        });
        
        // Close search on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.overlay');
    
    if (mobileMenuToggle && mobileNav && overlay) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close mobile menu when clicking on overlay
        overlay.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
}

// Cart sidebar functionality
function initCartSidebar() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartClose = document.querySelector('.cart-close');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.overlay');
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    
    if (cartIcon && cartClose && cartSidebar && overlay) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.classList.add('no-scroll');
        });
        
        cartClose.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        // Close cart when clicking on overlay
        overlay.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        // Add to cart functionality
        addToCartButtons.forEach(button => {
            if (!button.disabled) {
                button.addEventListener('click', function() {
                    const productCard = this.closest('.product-card') || this.closest('.favorite-card');
                    if (productCard) {
                        const productName = productCard.querySelector('h3').textContent;
                        const productPrice = productCard.querySelector('.product-price, .favorite-price').textContent;
                        const productImage = productCard.querySelector('img').src;
                        
                        addToCart(productName, productPrice, productImage);
                        updateCartCount();
                        
                        // Show notification
                        showNotification(`${productName} sepete eklendi!`);
                        
                        // Animate cart icon
                        const cartCount = document.querySelector('.cart-count');
                        cartCount.classList.remove('cart-count-animation');
                        void cartCount.offsetWidth; // Trigger reflow
                        cartCount.classList.add('cart-count-animation');
                    }
                });
            }
        });
    }
}

// Add product to cart
function addToCart(name, price, image) {
    const cartItems = document.querySelector('.cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    
    if (emptyCartMessage) {
        emptyCartMessage.style.display = 'none';
    }
    
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${image}" alt="${name}">
        </div>
        <div class="cart-item-content">
            <h4>${name}</h4>
            <div class="cart-item-price">${price}</div>
            <div class="cart-item-quantity">
                <button class="quantity-decrease">-</button>
                <input type="number" value="1" min="1" max="10">
                <button class="quantity-increase">+</button>
            </div>
        </div>
        <button class="cart-item-remove"><i class="fas fa-times"></i></button>
    `;
    
    cartItems.appendChild(cartItem);
    
    // Update cart total
    updateCartTotal();
    
    // Add event listeners for quantity buttons
    const quantityDecrease = cartItem.querySelector('.quantity-decrease');
    const quantityIncrease = cartItem.querySelector('.quantity-increase');
    const quantityInput = cartItem.querySelector('input');
    const removeButton = cartItem.querySelector('.cart-item-remove');
    
    quantityDecrease.addEventListener('click', function() {
        if (quantityInput.value > 1) {
            quantityInput.value--;
            updateCartTotal();
        }
    });
    
    quantityIncrease.addEventListener('click', function() {
        if (quantityInput.value < 10) {
            quantityInput.value++;
            updateCartTotal();
        }
    });
    
    quantityInput.addEventListener('change', function() {
        updateCartTotal();
    });
    
    removeButton.addEventListener('click', function() {
        cartItem.remove();
        updateCartTotal();
        updateCartCount();
        
        // Show empty cart message if no items
        if (document.querySelectorAll('.cart-item').length === 0 && emptyCartMessage) {
            emptyCartMessage.style.display = 'block';
        }
    });
}

// Update cart total
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    const totalAmount = document.querySelector('.total-amount');
    let total = 0;
    
    cartItems.forEach(item => {
        const price = item.querySelector('.cart-item-price').textContent;
        const quantity = parseInt(item.querySelector('input').value);
        const priceValue = parseFloat(price.replace('₺', '').replace(',', '.'));
        
        total += priceValue * quantity;
    });
    
    if (totalAmount) {
        totalAmount.textContent = `₺${total.toFixed(2)}`;
    }
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelectorAll('.cart-item');
    
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
}

// Show notification
function showNotification(message) {
    // Check if notification container exists, if not create it
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.classList.add('notification-container');
        document.body.appendChild(notificationContainer);
    }
    
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Animate notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Lightbox functionality
function initLightbox() {
    const zoomButtons = document.querySelectorAll('.btn-zoom');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-content img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (zoomButtons.length && lightbox && lightboxImage && lightboxClose) {
        zoomButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card') || this.closest('.favorite-card');
                const productImage = productCard.querySelector('img').src;
                const productName = productCard.querySelector('h3').textContent;
                
                lightboxImage.src = productImage;
                lightboxImage.alt = productName;
                lightbox.classList.add('active');
                document.body.classList.add('no-scroll');
            });
        });
        
        lightboxClose.addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
        
        // Close lightbox on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        const windowHeight = window.innerHeight;
        const windowTop = window.pageYOffset;
        const windowBottom = windowTop + windowHeight;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + windowTop;
            const elementBottom = elementTop + element.offsetHeight;
            
            // Check if element is in viewport
            if (elementBottom > windowTop && elementTop < windowBottom) {
                element.classList.add('visible');
            }
        });
    }
    
    // Check elements on load
    checkScroll();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkScroll);
}

// Parallax effect
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const offset = element.offsetTop;
            const translate = (scrollTop - offset) * speed;
            
            element.style.transform = `translateY(${translate}px)`;
        });
    });
}

// Product interactions
function initProductInteractions() {
    const productCards = document.querySelectorAll('.product-card, .favorite-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                const mobileNav = document.querySelector('.mobile-nav');
                const overlay = document.querySelector('.overlay');
                
                if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });
}

// Add CSS class for styling based on scroll position
document.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value) {
            // In a real application, you would send this to a server
            showNotification('Bültenimize başarıyla abone oldunuz!');
            emailInput.value = '';
        }
    });
}

// Search form submission
const searchForm = document.querySelector('.search-form');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchInput = this.querySelector('input');
        
        if (searchInput.value) {
            // In a real application, you would redirect to search results page
            showNotification(`"${searchInput.value}" için arama sonuçları gösteriliyor...`);
            // Close search overlay
            document.querySelector('.search-overlay').classList.remove('active');
        }
    });
}

// Tilt effect for product cards
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const rotateX = (0.5 - yPercent) * 10;
            const rotateY = (xPercent - 0.5) * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// Initialize tilt effect
initTiltEffect();