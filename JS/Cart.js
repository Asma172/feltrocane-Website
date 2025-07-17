function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <a href="Purchase.html" class="empty-cart-button">Start Shopping</a>
            </div>
        `;
        document.getElementById('subtotal-amount').textContent = '$0.00';
        document.getElementById('total-amount').textContent = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item fade-in';
        cartItemElement.innerHTML = `
            <div class="product-info">
                <img src="${item.image}" alt="${item.name}" class="product-image">
                <div class="product-details">
                    <h3>${item.name}</h3>
                    <p>${item.category}</p>
                </div>
            </div>
            <div class="item-price">$${item.price.toFixed(2)}</div>
            <div class="quantity-selector">
                <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-id="${item.id}">
                <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
            </div>
            <div class="item-subtotal">$${itemTotal.toFixed(2)}</div>
            <button class="remove-btn" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
        `;

        cartItemsContainer.appendChild(cartItemElement);
    });

    addCartItemEventListeners();
    updateCartSummary(subtotal);
}

function removeFromCart(itemId) {
    const cartItemElement = document.querySelector(`.remove-btn[data-id="${itemId}"]`);
    if (cartItemElement) {
        const parentCartItem = cartItemElement.closest('.cart-item');
        if (parentCartItem) {
            parentCartItem.style.transition = 'all 0.3s ease';
            parentCartItem.style.opacity = '0';
            parentCartItem.style.transform = 'translateX(20px)';
        }

        setTimeout(() => {
            cart = cart.filter(item => item.id !== itemId);
            saveCart();
            renderCart();
            updateCartCount();
        }, 300);
    }
}