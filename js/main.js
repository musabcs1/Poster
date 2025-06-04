// Ürün Verileri (Gerçek bir API yerine örnek veri)
const products = [
    {
        id: 1,
        title: "Yüzüklerin Efendisi film posteri",
        category: "Film",
        price: 149.90,
        rating: 4.5,
        reviewCount: 24,
        image: "images/poster1.svg",
        images: [
            "images/poster1.svg",
            "images/poster2.svg",
            "images/poster3.svg"
        ],
        description: "Quentin Tarantino'nun kült filmi Pulp Fiction'ın yüksek kaliteli posteri. Evinizin duvarlarına film tutkunuzu yansıtın.",
        sizes: ["30x40", "50x70", "70x100"],
        frames: ["Çerçevesiz", "Siyah", "Beyaz", "Ahşap"],
        stock: 15,
        isNew: true,
        isBestseller: false,
        isOnSale: false
    },
    {
        id: 2,
        title: "Sokrates Felsefe Posteri",
        category: "Felsefe",
        price: 129.90,
        rating: 5,
        reviewCount: 42,
        image: "images/poster2.svg",
        images: [
            "images/poster2.svg",
            "images/poster3.svg",
            "images/poster4.svg"
        ],
        description: "Antik Yunan filozofu Sokrates'in portresi ve ünlü sözleriyle tasarlanmış poster. Felsefe tutkunları için ideal.",
        sizes: ["30x40", "50x70", "70x100"],
        frames: ["Çerçevesiz", "Siyah", "Beyaz", "Ahşap"],
        stock: 20,
        isNew: false,
        isBestseller: true,
        isOnSale: false
    },
    {
        id: 3,
        title: "Osmanlı İmparatorluğu Haritası",
        category: "Tarih",
        price: 179.90,
        rating: 4,
        reviewCount: 18,
        image: "images/poster3.svg",
        images: [
            "images/poster3.svg",
            "images/poster4.svg",
            "images/poster1.svg" // Changed from poster5.svg to an existing image
        ],
        description: "Osmanlı İmparatorluğu'nun en geniş sınırlarını gösteren detaylı ve estetik harita posteri. Tarih tutkunları için mükemmel bir seçim.",
        sizes: ["30x40", "50x70", "70x100"],
        frames: ["Çerçevesiz", "Siyah", "Beyaz", "Ahşap"],
        stock: 8,
        isNew: false,
        isBestseller: false,
        isOnSale: false
    },
    {
        id: 4,
        title: "Kobe Bryant Basketbol Posteri",
        category: "Spor",
        price: 159.90,
        oldPrice: 199.90,
        rating: 4.5,
        reviewCount: 36,
        image: "images/poster4.svg",
        images: [
            "images/poster4.svg",
            "images/poster1.svg", // Changed from poster5.svg to an existing image
            "images/poster2.svg"  // Changed from poster6.svg to an existing image
        ],
        description: "Efsanevi basketbolcu Kobe Bryant'ın unutulmaz smaç anını ölümsüzleştiren poster. Spor tutkunları için ideal bir duvar dekorasyonu.",
        sizes: ["30x40", "50x70", "70x100"],
        frames: ["Çerçevesiz", "Siyah", "Beyaz", "Ahşap"],
        stock: 12,
        isNew: false,
        isBestseller: false,
        isOnSale: true
    },
    {
        id: 5,
        title: "Nietzsche - Güç İstenci",
        category: "Felsefe",
        price: 139.90,
        rating: 4.8,
        reviewCount: 29,
        image: "images/favorite1.png",
        images: [
            "images/favorite1.png",
            "images/poster1.svg",
            "images/poster2.svg"
        ],
        description: "Friedrich Nietzsche'nin ünlü eseri 'Güç İstenci'nden alıntılar ve filozofun portresiyle tasarlanmış özel poster.",
        sizes: ["30x40", "50x70", "70x100"],
        frames: ["Çerçevesiz", "Siyah", "Beyaz", "Ahşap"],
        stock: 10,
        isNew: false,
        isBestseller: false,
        isOnSale: false
    },
    {
        id: 6,
        title: "Fatih Sultan Mehmet Portresi",
        category: "Tarih",
        price: 189.90,
        rating: 5,
        reviewCount: 47,
        image: "images/favorite2.png",
        images: [
            "images/favorite2.png",
            "images/poster3.svg",
            "images/poster4.svg"
        ],
        description: "Fatih Sultan Mehmet'in tarihi portresinin modern bir yorumu. Yüksek kaliteli baskı ile evinize tarih ve estetik katın.",
        sizes: ["30x40", "50x70", "70x100"],
        frames: ["Çerçevesiz", "Siyah", "Beyaz", "Ahşap"],
        stock: 18,
        isNew: true,
        isBestseller: true,
        isOnSale: false
    },
    {
        id: 7,
        title: "The Godfather",
        category: "Film",
        price: 169.90,
        rating: 4.9,
        reviewCount: 53,
        image: "images/favorite3.png",
        images: [
            "images/favorite3.png",
            "images/poster1.svg", // Changed from poster5.svg to an existing image
            "images/poster2.svg"  // Changed from poster6.svg to an existing image
        ],
        description: "Sinema tarihinin en ikonik filmlerinden The Godfather'ın minimalist tasarımlı posteri. Film tutkunları için mükemmel bir seçim.",
        sizes: ["30x40", "50x70", "70x100"],
        frames: ["Çerçevesiz", "Siyah", "Beyaz", "Ahşap"],
        stock: 14,
        isNew: false,
        isBestseller: true,
        isOnSale: false
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Değişkenler
    const searchToggle = document.querySelector('.search-toggle');
    const searchForm = document.querySelector('.search-form');
    const searchClose = document.querySelector('.search-close');
    const cartToggle = document.querySelector('.cart-toggle');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartClose = document.querySelector('.cart-close');
    const favoritesToggle = document.querySelector('.favorites-toggle');
    const favoritesSidebar = document.querySelector('.favorites-sidebar');
    const favoritesClose = document.querySelector('.favorites-close');
    const overlay = document.querySelector('.overlay');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const quickViewModal = document.querySelector('.quick-view-modal');
    const quickViewClose = document.querySelector('.quick-view-close');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const addToFavoritesBtns = document.querySelectorAll('.add-to-favorites');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Sepet ve Favoriler için localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Sayfa yüklendiğinde favorileri render et
    renderFavorites();
    
    // Sayfa yüklendiğinde sepet ve favorileri güncelle
    updateCartCount();
    updateFavoritesCount();
    
    // Karanlık Mod İşlevselliği
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Sayfa yüklendiğinde karanlık mod durumunu kontrol et
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // Karanlık mod düğmesi tıklama olayı
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Simgeyi güncelle
            if (document.body.classList.contains('dark-mode')) {
                this.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('darkMode', 'true');
            } else {
                this.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('darkMode', 'false');
            }
        });
    }
    
    // Arama Formu Göster/Gizle
    if (searchToggle) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchForm.classList.add('active');
        });
    }
    
    if (searchClose) {
        searchClose.addEventListener('click', function(e) {
            e.preventDefault();
            searchForm.classList.remove('active');
        });
    }
    
    // Sepet Kenar Çubuğu Göster/Gizle
    if (cartToggle) {
        cartToggle.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            renderCart();
        });
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Favoriler Kenar Çubuğu Göster/Gizle
    if (favoritesToggle) {
        favoritesToggle.addEventListener('click', function(e) {
            e.preventDefault();
            favoritesSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (favoritesClose) {
        favoritesClose.addEventListener('click', function(e) {
            e.preventDefault();
            favoritesSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Overlay Tıklama
    if (overlay) {
        overlay.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
            favoritesSidebar.classList.remove('active');
            quickViewModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Mobil Menü Göster/Gizle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Hızlı Görünüm Modal
    if (quickViewBtns.length > 0) {
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-id');
                openQuickViewModal(productId);
            });
        });
    }
    
    if (quickViewClose) {
        quickViewClose.addEventListener('click', function(e) {
            e.preventDefault();
            quickViewModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Sepete Ekle
    if (addToCartBtns.length > 0) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-id');
                addToCart(productId);
            });
        });
    }
    
    // Favorilere Ekle
    if (addToFavoritesBtns.length > 0) {
        addToFavoritesBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-id');
                toggleFavorite(productId);
                updateFavoriteButton(this, productId);
            });
        });
    }
    
    // Sayfa yüklendiğinde favori butonlarını güncelle
    updateAllFavoriteButtons();
    
    // Ürün Verileri (Gerçek bir API yerine örnek veri)
    const products = [
        {
            id: 1,
            title: "Yüzüklerin Efendisi film posteri",
            category: "Film",
            price: 149.90,
            rating: 4.5,
            reviewCount: 24,
            image: "images/poster1.svg",
            images: [
                "images/poster1.svg",
                "images/poster2.svg",
                "images/poster3.svg"
            ],
            description: "Quentin Tarantino'nun kült filmi Pulp Fiction'ın yüksek kaliteli posteri. Evinizin duvarlarına film tutkunuzu yansıtın.",
            sizes: ["30x40", "50x70", "70x100"],
            frames: ["Çerçevesiz", "Siyah", "Beyaz", "Ahşap"],
            stock: 15,
            isNew: true,
            isBestseller: false,
            isOnSale: false
        },
        {
            id: 2,
            title: "Sokrates Felsefe Posteri",
            category: "Felsefe",
            price: 129.90,
            rating: 5,
            reviewCount: 42,
            image: "images/poster2.svg",
            images: [
                "images/poster2.svg",
                "images/poster3.svg",
                "images/poster4.svg"
            ],
            description: "Antik Yunan filozofu Sokrates'in portresi ve ünlü sözleriyle tasarlanmış poster. Felsefe tutkunları için ideal.",
            sizes: ["30x40", "50x70", "70x100"],
            frames: ["Çerçevesiz", "Siyah", "Beyaz", "Ahşap"],
            stock: 20,
            isNew: false,
            isBestseller: true,
            isOnSale: false
        },
        {
            id: 3,
            title: "Osmanlı İmparatorluğu Haritası",
            category: "Tarih",
            price: 179.90,
            rating: 4,
            reviewCount: 18,
            image: "images/poster3.svg",
            images: [
                "images/poster3.svg",
                "images/poster4.svg",
                "images/poster5.svg"
            ],
            description: "Osmanlı İmparatorluğu'nun en geniş sınırlarını gösteren detaylı ve estetik harita posteri. Tarih tutkunları için mükemmel bir seçim.",
            sizes: ["30x40", "50x70", "70x100"],
            frames: ["Çerçevesiz", "Siyah", "Beyaz", "Ahşap"],
            stock: 8,
            isNew: false,
            isBestseller: false,
            isOnSale: false
        },
        {
            id: 4,
            title: "Kobe Bryant Basketbol Posteri",
            category: "Spor",
            price: 159.90,
            oldPrice: 199.90,
            rating: 4.5,
            reviewCount: 36,
            image: "images/poster4.svg",
            images: [
                "images/poster4.svg",
                "images/poster5.svg",
                "images/poster6.svg"
            ],
            description: "Efsanevi basketbolcu Kobe Bryant'ın unutulmaz smaç anını ölümsüzleştiren poster. Spor tutkunları için ideal bir duvar dekorasyonu.",
            sizes: ["30x40", "50x70", "70x100"],
            frames: ["Çerçevesiz", "Siyah", "Beyaz", "Ahşap"],
            stock: 12,
            isNew: false,
            isBestseller: false,
            isOnSale: true
        },
        {
            id: 5,
            title: "Nietzsche - Güç İstenci",
            category: "Felsefe",
            price: 139.90,
            rating: 4.8,
            reviewCount: 29,
            image: "images/favorite1.png",
            images: [
                "images/favorite1.png",
                "images/poster1.svg",
                "images/poster2.svg"
            ],
            description: "Friedrich Nietzsche'nin ünlü eseri 'Güç İstenci'nden alıntılar ve filozofun portresiyle tasarlanmış özel poster.",
            sizes: ["30x40", "50x70", "70x100"],
            frames: ["Çerçevesiz", "Siyah", "Beyaz", "Ahşap"],
            stock: 10,
            isNew: false,
            isBestseller: false,
            isOnSale: false
        },
        {
            id: 6,
            title: "Fatih Sultan Mehmet Portresi",
            category: "Tarih",
            price: 189.90,
            rating: 5,
            reviewCount: 47,
            image: "images/favorite2.png",
            images: [
                "images/favorite2.png",
                "images/poster3.svg",
                "images/poster4.svg"
            ],
            description: "Fatih Sultan Mehmet'in tarihi portresinin modern bir yorumu. Yüksek kaliteli baskı ile evinize tarih ve estetik katın.",
            sizes: ["30x40", "50x70", "70x100"],
            frames: ["Çerçevesiz", "Siyah", "Beyaz", "Ahşap"],
            stock: 18,
            isNew: true,
            isBestseller: true,
            isOnSale: false
        },
        {
            id: 7,
            title: "The Godfather",
            category: "Film",
            price: 169.90,
            rating: 4.9,
            reviewCount: 53,
            image: "images/favorite3.png",
            images: [
                "images/favorite3.png",
                "images/poster5.svg",
                "images/poster6.svg"
            ],
            description: "Sinema tarihinin en ikonik filmlerinden The Godfather'ın minimalist tasarımlı posteri. Film tutkunları için mükemmel bir seçim.",
            sizes: ["30x40", "50x70", "70x100"],
            frames: ["Çerçevesiz", "Siyah", "Beyaz", "Ahşap"],
            stock: 14,
            isNew: false,
            isBestseller: true,
            isOnSale: false
        }
    ];
    
    // Fonksiyonlar
    
    // Ürün Detaylarını Getir
    function getProductById(id) {
        return products.find(product => product.id === parseInt(id));
    }
    
    // Hızlı Görünüm Modalını Aç
    function openQuickViewModal(productId) {
        const product = getProductById(productId);
        
        if (!product) return;
        
        const quickViewBody = document.querySelector('.quick-view-body');
        
        // Modal içeriğini oluştur
        let html = `
            <div class="quick-view-product">
                <div class="quick-view-gallery">
                    <div class="quick-view-main-image">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="quick-view-thumbnails">
        `;
        
        // Küçük resimler
        product.images.forEach((img, index) => {
            html += `
                <div class="quick-view-thumbnail ${index === 0 ? 'active' : ''}" data-image="${img}">
                    <img src="${img}" alt="${product.title} ${index + 1}">
                </div>
            `;
        });
        
        html += `
                    </div>
                </div>
                <div class="quick-view-info">
                    <h2>${product.title}</h2>
                    <div class="quick-view-category">${product.category}</div>
                    <div class="quick-view-rating">
        `;
        
        // Yıldızlar
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(product.rating)) {
                html += `<i class="fas fa-star"></i>`;
            } else if (i - 0.5 <= product.rating) {
                html += `<i class="fas fa-star-half-alt"></i>`;
            } else {
                html += `<i class="far fa-star"></i>`;
            }
        }
        
        html += `
                        <span>(${product.reviewCount})</span>
                    </div>
                    <div class="quick-view-price">
        `;
        
        // Fiyat
        if (product.oldPrice) {
            html += `<span class="old-price">₺${product.oldPrice.toFixed(2)}</span>`;
        }
        
        html += `
                        <span class="price">₺${product.price.toFixed(2)}</span>
                    </div>
                    <div class="quick-view-description">
                        <p>${product.description}</p>
                    </div>
                    <div class="quick-view-options">
                        <label class="option-label">Boyut:</label>
                        <div class="option-values size-options">
        `;
        
        // Boyut seçenekleri
        product.sizes.forEach((size, index) => {
            html += `
                <div class="option-value size-option ${index === 0 ? 'active' : ''}" data-size="${size}">${size} cm</div>
            `;
        });
        
        html += `
                        </div>
                        <label class="option-label">Çerçeve:</label>
                        <div class="option-values frame-options">
        `;
        
        // Çerçeve seçenekleri
        product.frames.forEach((frame, index) => {
            html += `
                <div class="option-value frame-option ${index === 0 ? 'active' : ''}" data-frame="${frame}">${frame}</div>
            `;
        });
        
        html += `
                        </div>
                    </div>
                    <div class="quick-view-quantity">
                        <label class="option-label">Adet:</label>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease">-</button>
                            <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}">
                            <button class="quantity-btn increase">+</button>
                        </div>
                    </div>
                    <div class="quick-view-actions">
                        <button class="btn btn-primary add-to-cart-modal" data-id="${product.id}">Sepete Ekle</button>
                        <button class="btn btn-outline add-to-favorites-modal ${favorites.includes(parseInt(product.id)) ? 'active' : ''}" data-id="${product.id}">
                            <i class="${favorites.includes(parseInt(product.id)) ? 'fas' : 'far'} fa-heart"></i> Favorilere Ekle
                        </button>
                    </div>
                    <div class="product-meta">
                        <div class="meta-item">
                            <span class="meta-label">Stok Durumu:</span>
                            <span class="meta-value ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">                                
                                ${product.stock > 0 ? 'Stokta (' + product.stock + ')' : 'Stokta Yok'}
                            </span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Kargo:</span>
                            <span class="meta-value">Ücretsiz Kargo (₺250 ve üzeri siparişlerde)</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        quickViewBody.innerHTML = html;
        
        // Modal'ı göster
        quickViewModal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Küçük resimlere tıklama olayı
        const thumbnails = quickViewBody.querySelectorAll('.quick-view-thumbnail');
        const mainImage = quickViewBody.querySelector('.quick-view-main-image img');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const imageUrl = this.getAttribute('data-image');
                mainImage.src = imageUrl;
                
                // Aktif thumbnail'i güncelle
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Boyut seçeneklerine tıklama olayı
        const sizeOptions = quickViewBody.querySelectorAll('.size-option');
        
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                sizeOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Çerçeve seçeneklerine tıklama olayı
        const frameOptions = quickViewBody.querySelectorAll('.frame-option');
        
        frameOptions.forEach(option => {
            option.addEventListener('click', function() {
                frameOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Miktar artırma/azaltma butonları
        const decreaseBtn = quickViewBody.querySelector('.decrease');
        const increaseBtn = quickViewBody.querySelector('.increase');
        const quantityInput = quickViewBody.querySelector('.quantity-input');
        
        decreaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value < product.stock) {
                quantityInput.value = value + 1;
            }
        });
        
        // Sepete ekle butonu
        const addToCartModalBtn = quickViewBody.querySelector('.add-to-cart-modal');
        
        addToCartModalBtn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const quantity = parseInt(quantityInput.value);
            const selectedSize = quickViewBody.querySelector('.size-option.active').getAttribute('data-size');
            const selectedFrame = quickViewBody.querySelector('.frame-option.active').getAttribute('data-frame');
            
            addToCart(productId, quantity, selectedSize, selectedFrame);
        });
        
        // Favorilere ekle butonu
        const addToFavoritesModalBtn = quickViewBody.querySelector('.add-to-favorites-modal');
        
        addToFavoritesModalBtn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            toggleFavorite(productId);
            updateFavoriteButton(this, productId);
        });
    }
    
    // Sepete Ürün Ekle
    function addToCart(productId, quantity = 1, size = null, frame = null) {
        const product = getProductById(productId);
        
        if (!product) return;
        
        // Seçilen boyut ve çerçeve yoksa varsayılanları kullan
        const selectedSize = size || product.sizes[0];
        const selectedFrame = frame || product.frames[0];
        
        // Sepette aynı ürün ve seçeneklerle var mı kontrol et
        const existingItemIndex = cart.findIndex(item => 
            item.id === parseInt(productId) && 
            item.size === selectedSize && 
            item.frame === selectedFrame
        );
        
        if (existingItemIndex !== -1) {
            // Varsa miktarını artır
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Yoksa yeni ekle
            cart.push({
                id: parseInt(productId),
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: quantity,
                size: selectedSize,
                frame: selectedFrame
            });
        }
        
        // LocalStorage'a kaydet
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Sepet sayısını güncelle
        updateCartCount();
        
        // Sepet kenar çubuğunu göster
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Sepeti render et
        renderCart();
        
        // Bildirim göster
        showNotification(`${product.title} sepete eklendi!`);
    }
    
    // Favorilere Ekle/Çıkar
function toggleFavorite(productId) {
    const id = parseInt(productId);
    const index = favorites.indexOf(id);
    
    if (index === -1) {
        // Favorilerde yoksa ekle
        favorites.push(id);
        showNotification('Ürün favorilere eklendi!');
    } else {
        // Favorilerde varsa çıkar
        favorites.splice(index, 1);
        showNotification('Ürün favorilerden çıkarıldı!');
    }
    
    // LocalStorage'a kaydet
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Favori sayısını güncelle
    updateFavoritesCount();
    
    // Favorileri yeniden render et
    renderFavorites();
}
    
    // Favori Butonunu Güncelle
    function updateFavoriteButton(button, productId) {
        const id = parseInt(productId);
        const isFavorite = favorites.includes(id);
        
        if (button.classList.contains('add-to-favorites-modal')) {
            // Modal içindeki buton
            const icon = button.querySelector('i');
            
            if (isFavorite) {
                button.classList.add('active');
                icon.className = 'fas fa-heart';
            } else {
                button.classList.remove('active');
                icon.className = 'far fa-heart';
            }
        } else {
            // Ürün kartındaki buton
            if (isFavorite) {
                button.innerHTML = '<i class="fas fa-heart"></i>';
                button.classList.add('active');
            } else {
                button.innerHTML = '<i class="far fa-heart"></i>';
                button.classList.remove('active');
            }
        }
    }
    
    // Tüm Favori Butonlarını Güncelle
    function updateAllFavoriteButtons() {
        const allFavoriteButtons = document.querySelectorAll('.add-to-favorites');
        
        allFavoriteButtons.forEach(button => {
            const productId = button.getAttribute('data-id');
            updateFavoriteButton(button, productId);
        });
    }
    
    // Sepet Sayısını Güncelle
    function updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-toggle .count');
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }
    
    // Favori Sayısını Güncelle
function updateFavoritesCount() {
    const favoritesCountElements = document.querySelectorAll('.favorites-toggle .count');
    
    favoritesCountElements.forEach(element => {
        element.textContent = favorites.length;
    });
}

// Favorileri Render Et
function renderFavorites() {
    const favoritesBody = document.querySelector('.favorites-body');
    if (!favoritesBody) return;
    
    if (favorites.length === 0) {
        favoritesBody.innerHTML = `
            <div class="favorites-empty">
                <i class="fas fa-heart"></i>
                <p>Favoriler listeniz boş.</p>
                <a href="index.html" class="btn btn-primary">Ürünleri Keşfedin</a>
            </div>
        `;
        return;
    }
    
    let favoritesHTML = '';
    
    favorites.forEach(id => {
        const product = getProductById(id);
        if (!product) return;
        
        favoritesHTML += `
            <div class="favorites-item" data-id="${product.id}">
                <div class="favorites-item-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="favorites-item-info">
                    <h4 class="favorites-item-title">${product.title}</h4>
                    <div class="favorites-item-price">₺${product.price.toFixed(2)}</div>
                    <div class="favorites-item-category">${product.category}</div>
                    <div class="favorites-item-actions">
                        <a href="#" class="btn btn-sm btn-primary quick-view" data-id="${product.id}">İncele</a>
                        <a href="#" class="btn btn-sm btn-outline-primary add-to-cart" data-id="${product.id}">Sepete Ekle</a>
                    </div>
                </div>
                <div class="favorites-item-remove" data-id="${product.id}">
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>
        `;
    });
    
    favoritesBody.innerHTML = favoritesHTML;
    
    // Favorilerden kaldırma işlevi
    const removeButtons = favoritesBody.querySelectorAll('.favorites-item-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            toggleFavorite(id);
            renderFavorites();
        });
    });
    
    // Favorilerdeki ürünleri inceleme işlevi
    const quickViewButtons = favoritesBody.querySelectorAll('.quick-view');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('data-id');
            openQuickViewModal(id);
        });
    });
    
    // Favorilerdeki ürünleri sepete ekleme işlevi
    const addToCartButtons = favoritesBody.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('data-id');
            addToCart(id);
        });
    });
}
    
    // Sepeti Render Et
    function renderCart() {
        const cartItems = document.querySelector('.cart-items');
        const cartEmpty = document.querySelector('.cart-empty');
        const cartTotal = document.querySelector('.total-amount');
        
        if (cart.length === 0) {
            // Sepet boşsa
            cartItems.style.display = 'none';
            cartEmpty.style.display = 'block';
            cartTotal.textContent = '₺0.00';
            return;
        }
        
        // Sepet dolu
        cartItems.style.display = 'block';
        cartEmpty.style.display = 'none';
        
        // Sepet öğelerini oluştur
        let html = '';
        let totalPrice = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            
            html += `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">₺${item.price.toFixed(2)}</div>
                        <div class="cart-item-options">
                            <span>Boyut: ${item.size} cm</span> | 
                            <span>Çerçeve: ${item.frame}</span>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-index="${index}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                            <button class="quantity-btn increase" data-index="${index}">+</button>
                        </div>
                    </div>
                    <div class="cart-item-remove" data-index="${index}">
                        <i class="fas fa-trash-alt"></i>
                    </div>
                </div>
            `;
        });
        
        cartItems.innerHTML = html;
        cartTotal.textContent = `₺${totalPrice.toFixed(2)}`;
        
        // Miktar değiştirme butonları
        const decreaseBtns = cartItems.querySelectorAll('.decrease');
        const increaseBtns = cartItems.querySelectorAll('.increase');
        const quantityInputs = cartItems.querySelectorAll('.quantity-input');
        const removeButtons = cartItems.querySelectorAll('.cart-item-remove');
        
        decreaseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    updateCartCount();
                }
            });
        });
        
        increaseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart[index].quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                updateCartCount();
            });
        });
        
        quantityInputs.forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const value = parseInt(this.value);
                
                if (value > 0) {
                    cart[index].quantity = value;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    updateCartCount();
                } else {
                    this.value = 1;
                }
            });
        });
        
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                updateCartCount();
                showNotification('Ürün sepetten kaldırıldı!');
            });
        });
    }
    
    // Bildirim Göster
    function showNotification(message) {
        // Eğer zaten bir bildirim varsa kaldır
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Yeni bildirim oluştur
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Bildirim stilini ekle (eğer CSS'de tanımlanmadıysa)
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#28a745';
        notification.style.color = '#fff';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        notification.style.zIndex = '9999';
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        notification.style.transition = 'all 0.3s ease';
        
        // Bildirim içeriği stilini ekle
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.display = 'flex';
        notificationContent.style.alignItems = 'center';
        
        const icon = notification.querySelector('i');
        icon.style.marginRight = '10px';
        icon.style.fontSize = '1.2rem';
        
        // Animasyon ile göster
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // 3 saniye sonra kaldır
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // URL parametrelerini al
    function getUrlParams() {
        const params = {};
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        
        for (const [key, value] of urlParams.entries()) {
            params[key] = value;
        }
        
        return params;
    }
    
    // Kategori sayfası için ürünleri filtrele ve göster
    function initCategoryPage() {
        const params = getUrlParams();
        const categoryContainer = document.querySelector('.category-container');
        
        if (!categoryContainer) return;
        
        let filteredProducts = [...products];
        
        // Kategori filtresi
        if (params.category) {
            const category = decodeURIComponent(params.category);
            filteredProducts = filteredProducts.filter(product => 
                product.category.toLowerCase() === category.toLowerCase()
            );
            
            // Kategori başlığını güncelle
            const categoryTitle = document.querySelector('.category-title');
            if (categoryTitle) {
                categoryTitle.textContent = category + ' Posterleri';
            }
        }
        
        // Ürünleri göster
        renderProducts(filteredProducts);
        
        // Filtre ve sıralama olaylarını ekle
        initFilters(filteredProducts);
    }
    
    // Ürünleri render et
    function renderProducts(products) {
        const productGrid = document.querySelector('.product-grid');
        
        if (!productGrid) return;
        
        let html = '';
        
        products.forEach(product => {
            html += `
                <div class="product-card">
                    ${product.isNew ? '<div class="product-badge">Yeni</div>' : ''}
                    ${product.isBestseller ? '<div class="product-badge bestseller">Çok Satan</div>' : ''}
                    ${product.isOnSale ? '<div class="product-badge sale">İndirim</div>' : ''}
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.title}">
                        <div class="product-actions">
                            <a href="#" class="add-to-favorites" data-id="${product.id}"><i class="far fa-heart"></i></a>
                            <a href="#" class="quick-view" data-id="${product.id}"><i class="fas fa-eye"></i></a>
                            <a href="#" class="add-to-cart" data-id="${product.id}"><i class="fas fa-shopping-cart"></i></a>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3><a href="product.html?id=${product.id}">${product.title}</a></h3>
                        <div class="product-category">${product.category}</div>
                        <div class="product-rating">
            `;
            
            // Yıldızlar
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(product.rating)) {
                    html += `<i class="fas fa-star"></i>`;
                } else if (i - 0.5 <= product.rating) {
                    html += `<i class="fas fa-star-half-alt"></i>`;
                } else {
                    html += `<i class="far fa-star"></i>`;
                }
            }
            
            html += `
                            <span>(${product.reviewCount})</span>
                        </div>
                        <div class="product-price">
            `;
            
            // Fiyat
            if (product.oldPrice) {
                html += `<span class="old-price">₺${product.oldPrice.toFixed(2)}</span>`;
            }
            
            html += `
                            <span class="price">₺${product.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        productGrid.innerHTML = html;
        
        // Ürün etkileşimlerini ekle
        const quickViewBtns = document.querySelectorAll('.quick-view');
        const addToCartBtns = document.querySelectorAll('.add-to-cart');
        const addToFavoritesBtns = document.querySelectorAll('.add-to-favorites');
        
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-id');
                openQuickViewModal(productId);
            });
        });
        
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-id');
                addToCart(productId);
            });
        });
        
        addToFavoritesBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-id');
                toggleFavorite(productId);
                updateFavoriteButton(this, productId);
            });
        });
        
        // Favori butonlarını güncelle
        updateAllFavoriteButtons();
    }
    
    // Filtre ve sıralama işlevlerini başlat
    function initFilters(products) {
        const sortSelect = document.querySelector('.sort-select');
        const viewButtons = document.querySelectorAll('.view-button');
        const priceRange = document.querySelector('.price-range');
        const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
        
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                const value = this.value;
                let sortedProducts = [...products];
                
                switch (value) {
                    case 'featured':
                        // Öne çıkanlar (varsayılan sıralama)
                        break;
                    case 'price-low':
                        sortedProducts.sort((a, b) => a.price - b.price);
                        break;
                    case 'price-high':
                        sortedProducts.sort((a, b) => b.price - a.price);
                        break;
                    case 'newest':
                        sortedProducts.sort((a, b) => b.isNew - a.isNew);
                        break;
                    case 'bestseller':
                        sortedProducts.sort((a, b) => b.isBestseller - a.isBestseller);
                        break;
                }
                
                renderProducts(sortedProducts);
            });
        }
        
        if (viewButtons.length > 0) {
            viewButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const view = this.getAttribute('data-view');
                    const productGrid = document.querySelector('.product-grid');
                    
                    // Aktif buton sınıfını güncelle
                    viewButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Grid görünümünü değiştir
                    if (productGrid) {
                        productGrid.className = 'product-grid ' + view;
                    }
                });
            });
        }
        
        // Diğer filtre işlevleri burada eklenebilir
    }
    
    function getUrlParameter(name) {
        name = name.replace(/[[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(window.location.href);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Ürün detay sayfasını başlat
    function initProductPage() {
        const productId = getUrlParameter('id');
        if (productId) {
            const product = getProductById(productId);
            if (product) {
                renderProductDetails(product);
            } else {
                console.error('Product not found for ID:', productId);
                // Ürün bulunamazsa kullanıcıyı bilgilendir veya ana sayfaya yönlendir
            }
        } else {
            console.error('Product ID not found in URL.');
            // Ürün ID'si yoksa kullanıcıyı bilgilendir veya ana sayfaya yönlendir
        }
    }
    
    // Ürün detaylarını render et
    function renderProductDetails(product) {
        const productDetailContainer = document.querySelector('.product-detail-container');
        if (!productDetailContainer) return;

        let html = `
            <div class="product-gallery">
                <div class="main-image-container ${product.images.length > 1 ? 'zoomable' : ''}">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="thumbnail-gallery">
        `;

        product.images.forEach((img, index) => {
            html += `
                    <div class="thumbnail-item ${index === 0 ? 'active' : ''}" data-image="${img}">
                        <img src="${img}" alt="${product.title} ${index + 1}">
                    </div>
            `;
        });

        html += `
                </div>
            </div>
            <div class="product-info">
                <div class="category">${product.category}</div>
                <h1 class="product-title">${product.title}</h1>
                <div class="product-rating">
        `;

        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(product.rating)) {
                html += `<i class="fas fa-star"></i>`;
            } else if (i - 0.5 <= product.rating) {
                html += `<i class="fas fa-star-half-alt"></i>`;
            } else {
                html += `<i class="far fa-star"></i>`;
            }
        }

        html += `
                    <span>(${product.reviewCount} Yorum)</span>
                </div>
                <div class="price">
        `;

        if (product.oldPrice) {
            html += `<span class="old-price">₺${product.oldPrice.toFixed(2)}</span>`;
        }

        html += `
                    <span>₺${product.price.toFixed(2)}</span>
                </div>
                <div class="description">
                    <p>${product.description}</p>
                </div>
                <div class="product-options">
        `;

        if (product.sizes && product.sizes.length > 0) {
            html += `
                    <div class="option-group">
                        <label>Boyut Seçin:</label>
                        <div class="option-values size-options">
            `;
            product.sizes.forEach((size, index) => {
                html += `<div class="option-value ${index === 0 ? 'active' : ''}" data-value="${size}">${size} cm</div>`;
            });
            html += `
                        </div>
                    </div>
            `;
        }

        if (product.frames && product.frames.length > 0) {
            html += `
                    <div class="option-group">
                        <label>Çerçeve Seçin:</label>
                        <div class="option-values frame-options">
            `;
            product.frames.forEach((frame, index) => {
                html += `<div class="option-value ${index === 0 ? 'active' : ''}" data-value="${frame}">${frame}</div>`;
            });
            html += `
                        </div>
                    </div>
            `;
        }

        html += `
                    <div class="quantity-selector">
                        <button class="quantity-btn decrease"><i class="fas fa-minus"></i></button>
                        <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}">
                        <button class="quantity-btn increase"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart-product-page" data-id="${product.id}">Sepete Ekle</button>
                    <button class="btn btn-outline add-to-favorites-product-page ${favorites.includes(parseInt(product.id)) ? 'active' : ''}" data-id="${product.id}">
                        <i class="${favorites.includes(parseInt(product.id)) ? 'fas' : 'far'} fa-heart"></i> Favorilere Ekle
                    </button>
                </div>
                <div class="product-meta">
                    <p><span class="meta-label">Stok Durumu:</span> <span class="meta-value ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">${product.stock > 0 ? 'Stokta (' + product.stock + ')' : 'Stokta Yok'}</span></p>
                    <p><span class="meta-label">Kargo:</span> <span class="meta-value">Ücretsiz Kargo (₺250 ve üzeri siparişlerde)</span></p>
                </div>
            </div>
        `;

        productDetailContainer.innerHTML = html;

        // Ürün galerisi işlevselliği
        const mainImageContainer = productDetailContainer.querySelector('.main-image-container');
        const mainImage = mainImageContainer.querySelector('img');
        const thumbnails = productDetailContainer.querySelectorAll('.thumbnail-item');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const imageUrl = this.getAttribute('data-image');
                mainImage.src = imageUrl;
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                mainImageContainer.classList.remove('zoomed'); // Zoom'u sıfırla
            });
        });

        // Resim zoom işlevselliği
        if (mainImageContainer.classList.contains('zoomable')) {
            mainImageContainer.addEventListener('click', function() {
                this.classList.toggle('zoomed');
            });
        }

        // Boyut ve Çerçeve seçenekleri
        const sizeOptions = productDetailContainer.querySelectorAll('.size-options .option-value');
        const frameOptions = productDetailContainer.querySelectorAll('.frame-options .option-value');

        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                sizeOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            });
        });

        frameOptions.forEach(option => {
            option.addEventListener('click', function() {
                frameOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Miktar seçici
        const quantityInput = productDetailContainer.querySelector('.quantity-input');
        const decreaseBtn = productDetailContainer.querySelector('.quantity-btn.decrease');
        const increaseBtn = productDetailContainer.querySelector('.quantity-btn.increase');

        decreaseBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });

        increaseBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value < product.stock) {
                quantityInput.value = value + 1;
            }
        });

        // Sepete Ekle butonu
        const addToCartProductPageBtn = productDetailContainer.querySelector('.add-to-cart-product-page');
        addToCartProductPageBtn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const quantity = parseInt(quantityInput.value);
            const selectedSize = productDetailContainer.querySelector('.size-options .option-value.active')?.getAttribute('data-value');
            const selectedFrame = productDetailContainer.querySelector('.frame-options .option-value.active')?.getAttribute('data-value');
            addToCart(productId, quantity, selectedSize, selectedFrame);
        });

        // Favorilere Ekle butonu
        const addToFavoritesProductPageBtn = productDetailContainer.querySelector('.add-to-favorites-product-page');
        addToFavoritesProductPageBtn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            toggleFavorite(productId);
            updateFavoriteButton(this, productId);
        });

        // Tab işlevselliği
        const tabNavItems = document.querySelectorAll('.tab-nav-item');
        const tabContentItems = document.querySelectorAll('.tab-content-item');

        tabNavItems.forEach(item => {
            item.addEventListener('click', function() {
                tabNavItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');

                const target = this.getAttribute('data-tab-target');
                tabContentItems.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === target) {
                        content.classList.add('active');
                    }
                });
            });
        });

        // İlk tab'ı varsayılan olarak aktif yap
        if (tabNavItems.length > 0) {
            tabNavItems[0].click();
        }

        // Yorum gönderme formu
        const reviewForm = document.querySelector('.add-review-form');
        if (reviewForm) {
            reviewForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Yorum gönderme mantığı buraya eklenecek
                showNotification('Yorumunuz gönderildi!');
                this.reset();
            });
        }

        // Yıldız derecelendirme
        const ratingStars = document.querySelectorAll('.add-review-form .rating-input i');
        ratingStars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                ratingStars.forEach(s => {
                    if (parseInt(s.getAttribute('data-rating')) <= rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });
    }

    // Sayfa yüklendiğinde ilgili sayfanın başlatma fonksiyonunu çağır
    const currentPath = window.location.pathname;

    if (currentPath.includes('category.html')) {
        initCategoryPage();
    } else if (currentPath.includes('product.html')) {
        initProductPage();
    }

    // Sayfa yüklendiğinde tüm favori butonlarını güncelle
    updateAllFavoriteButtons();
});