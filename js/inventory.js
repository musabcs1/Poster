document.addEventListener('DOMContentLoaded', function() {
    // Initialize inventory system
    initInventorySystem();
});

// Initialize Inventory System
function initInventorySystem() {
    // Load inventory data
    loadInventoryData();
    
    // Update product availability on product pages
    updateProductAvailability();
    
    // Add event listeners for admin panel if exists
    initAdminPanel();
    
    // Check for low stock items and show notifications
    checkLowStockItems();
    
    // Update cart buttons based on stock
    updateAddToCartButtons();
}

// Load inventory data from localStorage or server
function loadInventoryData() {
    // Check if inventory data exists in localStorage
    let inventory = JSON.parse(localStorage.getItem('inventory'));
    
    // If no inventory data exists, create default inventory
    if (!inventory) {
        inventory = createDefaultInventory();
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }
    
    return inventory;
}

// Create default inventory with sample products
function createDefaultInventory() {
    const inventory = {
        // Sample products with stock information
        'poster1': {
            id: 'poster1',
            name: 'Sinema Tarihi Posteri',
            variants: {
                'small-without-frame': { stock: 15, sku: 'P1-S-NF', lowStockThreshold: 5 },
                'small-with-frame': { stock: 10, sku: 'P1-S-F', lowStockThreshold: 3 },
                'medium-without-frame': { stock: 20, sku: 'P1-M-NF', lowStockThreshold: 5 },
                'medium-with-frame': { stock: 8, sku: 'P1-M-F', lowStockThreshold: 3 },
                'large-without-frame': { stock: 12, sku: 'P1-L-NF', lowStockThreshold: 4 },
                'large-with-frame': { stock: 5, sku: 'P1-L-F', lowStockThreshold: 2 }
            }
        },
        'poster2': {
            id: 'poster2',
            name: 'Felsefe Akımları Posteri',
            variants: {
                'small-without-frame': { stock: 18, sku: 'P2-S-NF', lowStockThreshold: 5 },
                'small-with-frame': { stock: 12, sku: 'P2-S-F', lowStockThreshold: 3 },
                'medium-without-frame': { stock: 25, sku: 'P2-M-NF', lowStockThreshold: 5 },
                'medium-with-frame': { stock: 10, sku: 'P2-M-F', lowStockThreshold: 3 },
                'large-without-frame': { stock: 15, sku: 'P2-L-NF', lowStockThreshold: 4 },
                'large-with-frame': { stock: 7, sku: 'P2-L-F', lowStockThreshold: 2 }
            }
        },
        'poster3': {
            id: 'poster3',
            name: 'Dünya Tarihi Posteri',
            variants: {
                'small-without-frame': { stock: 20, sku: 'P3-S-NF', lowStockThreshold: 5 },
                'small-with-frame': { stock: 15, sku: 'P3-S-F', lowStockThreshold: 3 },
                'medium-without-frame': { stock: 30, sku: 'P3-M-NF', lowStockThreshold: 5 },
                'medium-with-frame': { stock: 12, sku: 'P3-M-F', lowStockThreshold: 3 },
                'large-without-frame': { stock: 18, sku: 'P3-L-NF', lowStockThreshold: 4 },
                'large-with-frame': { stock: 8, sku: 'P3-L-F', lowStockThreshold: 2 }
            }
        },
        'poster4': {
            id: 'poster4',
            name: 'Spor Tarihi Posteri',
            variants: {
                'small-without-frame': { stock: 22, sku: 'P4-S-NF', lowStockThreshold: 5 },
                'small-with-frame': { stock: 14, sku: 'P4-S-F', lowStockThreshold: 3 },
                'medium-without-frame': { stock: 28, sku: 'P4-M-NF', lowStockThreshold: 5 },
                'medium-with-frame': { stock: 11, sku: 'P4-M-F', lowStockThreshold: 3 },
                'large-without-frame': { stock: 16, sku: 'P4-L-NF', lowStockThreshold: 4 },
                'large-with-frame': { stock: 6, sku: 'P4-L-F', lowStockThreshold: 2 }
            }
        }
    };
    
    return inventory;
}

// Update product availability on product pages
function updateProductAvailability() {
    // Check if we're on a product page
    const productContainer = document.querySelector('.product-detail');
    if (!productContainer) return;
    
    // Get product ID from the page
    const productId = productContainer.getAttribute('data-product-id');
    if (!productId) return;
    
    // Get inventory data
    const inventory = loadInventoryData();
    const product = inventory[productId];
    
    if (!product) return;
    
    // Get selected size and frame options
    const sizeSelect = document.querySelector('#product-size');
    const frameSelect = document.querySelector('#product-frame');
    
    if (!sizeSelect || !frameSelect) return;
    
    // Update availability based on selected options
    function updateAvailabilityDisplay() {
        const selectedSize = sizeSelect.value;
        const selectedFrame = frameSelect.value;
        const variantKey = `${selectedSize}-${selectedFrame}`;
        
        const variant = product.variants[variantKey];
        const availabilityElement = document.querySelector('.product-availability');
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        
        if (!availabilityElement || !addToCartBtn) return;
        
        if (variant && variant.stock > 0) {
            // In stock
            const stockLevel = variant.stock <= variant.lowStockThreshold ? 'low' : 'high';
            
            if (stockLevel === 'low') {
                availabilityElement.innerHTML = `<span class="stock-status in-stock low-stock">Sınırlı Stok (${variant.stock})</span>`;
                availabilityElement.classList.add('low-stock');
            } else {
                availabilityElement.innerHTML = '<span class="stock-status in-stock">Stokta</span>';
                availabilityElement.classList.remove('low-stock');
            }
            
            addToCartBtn.disabled = false;
            addToCartBtn.textContent = 'Sepete Ekle';
        } else {
            // Out of stock
            availabilityElement.innerHTML = '<span class="stock-status out-of-stock">Stokta Yok</span>';
            availabilityElement.classList.remove('low-stock');
            
            addToCartBtn.disabled = true;
            addToCartBtn.textContent = 'Stokta Yok';
        }
        
        // Update SKU display if exists
        const skuElement = document.querySelector('.product-sku');
        if (skuElement && variant) {
            skuElement.textContent = `SKU: ${variant.sku}`;
        }
    }
    
    // Add event listeners to update availability when options change
    sizeSelect.addEventListener('change', updateAvailabilityDisplay);
    frameSelect.addEventListener('change', updateAvailabilityDisplay);
    
    // Initial update
    updateAvailabilityDisplay();
}

// Update Add to Cart buttons based on stock
function updateAddToCartButtons() {
    // Check if we're on a category page with product cards
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length === 0) return;
    
    // Get inventory data
    const inventory = loadInventoryData();
    
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
        const stockBadge = card.querySelector('.stock-badge');
        if (stockBadge) {
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
        }
    });
}

// Check for low stock items and show notifications
function checkLowStockItems() {
    const inventory = loadInventoryData();
    const lowStockItems = [];
    
    // Check each product and variant for low stock
    for (const productId in inventory) {
        const product = inventory[productId];
        
        for (const variantKey in product.variants) {
            const variant = product.variants[variantKey];
            
            if (variant.stock > 0 && variant.stock <= variant.lowStockThreshold) {
                // This item is low on stock
                lowStockItems.push({
                    productId: productId,
                    productName: product.name,
                    variant: variantKey,
                    stock: variant.stock,
                    sku: variant.sku
                });
            }
        }
    }
    
    // Show notification for admin if there are low stock items
    if (lowStockItems.length > 0 && isAdminUser()) {
        showLowStockNotification(lowStockItems);
    }
    
    return lowStockItems;
}

// Check if current user is admin (placeholder function)
function isAdminUser() {
    // In a real application, this would check user roles
    // For demo purposes, we'll check for a URL parameter or localStorage flag
    return window.location.href.includes('admin=true') || localStorage.getItem('isAdmin') === 'true';
}

// Show notification for low stock items
function showLowStockNotification(lowStockItems) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.inventory-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'inventory-notification';
        document.body.appendChild(notification);
    }
    
    // Create notification content
    notification.innerHTML = `
        <div class="notification-header">
            <h3>Düşük Stok Uyarısı</h3>
            <button class="close-notification"><i class="fas fa-times"></i></button>
        </div>
        <div class="notification-content">
            <p>${lowStockItems.length} ürün düşük stokta:</p>
            <ul class="low-stock-list">
                ${lowStockItems.map(item => `
                    <li>
                        <span class="product-name">${item.productName}</span>
                        <span class="variant-info">${formatVariantName(item.variant)}</span>
                        <span class="stock-count">Stok: ${item.stock}</span>
                        <span class="sku">${item.sku}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        <div class="notification-footer">
            <button class="view-inventory-btn">Stok Yönetimine Git</button>
        </div>
    `;
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 1000);
    
    // Add event listeners
    const closeBtn = notification.querySelector('.close-notification');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
        });
    }
    
    const viewInventoryBtn = notification.querySelector('.view-inventory-btn');
    if (viewInventoryBtn) {
        viewInventoryBtn.addEventListener('click', () => {
            // In a real app, this would navigate to the inventory management page
            window.location.href = 'admin-inventory.html';
        });
    }
}

// Format variant name for display
function formatVariantName(variantKey) {
    const parts = variantKey.split('-');
    
    if (parts.length < 2) return variantKey;
    
    const size = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    const frame = parts.slice(1).join('-');
    
    let frameText = '';
    if (frame === 'with-frame') {
        frameText = 'Çerçeveli';
    } else if (frame === 'without-frame') {
        frameText = 'Çerçevesiz';
    }
    
    return `${size} - ${frameText}`;
}

// Initialize admin panel if it exists
function initAdminPanel() {
    const adminPanel = document.querySelector('.admin-inventory-panel');
    if (!adminPanel) return;
    
    // Load inventory data
    const inventory = loadInventoryData();
    
    // Populate inventory table
    const inventoryTable = adminPanel.querySelector('.inventory-table tbody');
    if (inventoryTable) {
        inventoryTable.innerHTML = '';
        
        for (const productId in inventory) {
            const product = inventory[productId];
            
            for (const variantKey in product.variants) {
                const variant = product.variants[variantKey];
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${formatVariantName(variantKey)}</td>
                    <td>${variant.sku}</td>
                    <td>
                        <input type="number" class="stock-input" 
                            data-product-id="${productId}" 
                            data-variant="${variantKey}" 
                            value="${variant.stock}" min="0">
                    </td>
                    <td>
                        <input type="number" class="threshold-input" 
                            data-product-id="${productId}" 
                            data-variant="${variantKey}" 
                            value="${variant.lowStockThreshold}" min="1">
                    </td>
                    <td>
                        <span class="stock-status ${variant.stock <= variant.lowStockThreshold ? 'low-stock' : ''}">
                            ${variant.stock === 0 ? 'Stokta Yok' : variant.stock <= variant.lowStockThreshold ? 'Düşük Stok' : 'Stokta'}
                        </span>
                    </td>
                `;
                
                inventoryTable.appendChild(row);
            }
        }
        
        // Add event listeners to stock inputs
        const stockInputs = adminPanel.querySelectorAll('.stock-input, .threshold-input');
        stockInputs.forEach(input => {
            input.addEventListener('change', function() {
                const productId = this.getAttribute('data-product-id');
                const variantKey = this.getAttribute('data-variant');
                const isStockInput = this.classList.contains('stock-input');
                const value = parseInt(this.value);
                
                if (isNaN(value) || value < 0) {
                    this.value = isStockInput ? inventory[productId].variants[variantKey].stock : 
                                              inventory[productId].variants[variantKey].lowStockThreshold;
                    return;
                }
                
                // Update inventory data
                if (isStockInput) {
                    inventory[productId].variants[variantKey].stock = value;
                } else {
                    inventory[productId].variants[variantKey].lowStockThreshold = value;
                }
                
                // Save updated inventory
                localStorage.setItem('inventory', JSON.stringify(inventory));
                
                // Update status cell
                const row = this.closest('tr');
                const statusCell = row.querySelector('.stock-status');
                const stock = inventory[productId].variants[variantKey].stock;
                const threshold = inventory[productId].variants[variantKey].lowStockThreshold;
                
                statusCell.className = 'stock-status';
                if (stock === 0) {
                    statusCell.textContent = 'Stokta Yok';
                    statusCell.classList.add('out-of-stock');
                } else if (stock <= threshold) {
                    statusCell.textContent = 'Düşük Stok';
                    statusCell.classList.add('low-stock');
                } else {
                    statusCell.textContent = 'Stokta';
                }
            });
        });
    }
    
    // Add event listener to save button
    const saveButton = adminPanel.querySelector('.save-inventory-btn');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // Show success message
            const message = document.createElement('div');
            message.className = 'inventory-message success';
            message.textContent = 'Stok bilgileri başarıyla kaydedildi.';
            
            adminPanel.appendChild(message);
            
            setTimeout(() => {
                message.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                message.classList.remove('show');
                setTimeout(() => {
                    adminPanel.removeChild(message);
                }, 300);
            }, 3000);
        });
    }
}

// Update inventory when item is added to cart
function updateInventoryOnAddToCart(productId, size, frame, quantity) {
    // Get inventory data
    const inventory = loadInventoryData();
    const product = inventory[productId];
    
    if (!product) return false;
    
    const variantKey = `${size}-${frame}`;
    const variant = product.variants[variantKey];
    
    if (!variant) return false;
    
    // Check if enough stock
    if (variant.stock < quantity) {
        return false;
    }
    
    // Update stock
    variant.stock -= quantity;
    
    // Save updated inventory
    localStorage.setItem('inventory', JSON.stringify(inventory));
    
    return true;
}

// Restore inventory when item is removed from cart
function restoreInventoryOnRemoveFromCart(productId, size, frame, quantity) {
    // Get inventory data
    const inventory = loadInventoryData();
    const product = inventory[productId];
    
    if (!product) return false;
    
    const variantKey = `${size}-${frame}`;
    const variant = product.variants[variantKey];
    
    if (!variant) return false;
    
    // Update stock
    variant.stock += quantity;
    
    // Save updated inventory
    localStorage.setItem('inventory', JSON.stringify(inventory));
    
    return true;
}

// Check if product variant is in stock
function isInStock(productId, size, frame, quantity = 1) {
    // Get inventory data
    const inventory = loadInventoryData();
    const product = inventory[productId];
    
    if (!product) return false;
    
    const variantKey = `${size}-${frame}`;
    const variant = product.variants[variantKey];
    
    if (!variant) return false;
    
    return variant.stock >= quantity;
}

// Get stock level for a product variant
function getStockLevel(productId, size, frame) {
    // Get inventory data
    const inventory = loadInventoryData();
    const product = inventory[productId];
    
    if (!product) return 0;
    
    const variantKey = `${size}-${frame}`;
    const variant = product.variants[variantKey];
    
    if (!variant) return 0;
    
    return variant.stock;
}

// Update inventory after checkout
function updateInventoryAfterCheckout(orderItems) {
    // Get inventory data
    const inventory = loadInventoryData();
    let allItemsInStock = true;
    
    // Check if all items are in stock first
    for (const item of orderItems) {
        const product = inventory[item.id];
        if (!product) {
            allItemsInStock = false;
            break;
        }
        
        const variantKey = `${item.size}-${item.frame}`;
        const variant = product.variants[variantKey];
        
        if (!variant || variant.stock < item.quantity) {
            allItemsInStock = false;
            break;
        }
    }
    
    // If all items are in stock, update inventory
    if (allItemsInStock) {
        for (const item of orderItems) {
            const product = inventory[item.id];
            const variantKey = `${item.size}-${item.frame}`;
            const variant = product.variants[variantKey];
            
            variant.stock -= item.quantity;
        }
        
        // Save updated inventory
        localStorage.setItem('inventory', JSON.stringify(inventory));
        return true;
    }
    
    return false;
}

// Export functions for use in other files
window.inventorySystem = {
    isInStock,
    getStockLevel,
    updateInventoryOnAddToCart,
    restoreInventoryOnRemoveFromCart,
    updateInventoryAfterCheckout
};