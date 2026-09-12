import { servicesData, productsData, reviewsData } from './products.js';
import { CartManager } from './cart.js';
import { BookingManager } from './booking.js';
import { calculateEstimate } from './estimator.js';

document.addEventListener('DOMContentLoaded', () => {
  const cart = new CartManager();
  const booking = new BookingManager();

  // Elements
  const servicesContainer = document.getElementById('services-grid');
  const productsContainer = document.getElementById('products-grid');
  const reviewsContainer = document.getElementById('reviews-grid');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartBadge = document.getElementById('cart-badge');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTax = document.getElementById('cart-tax');
  const cartTotal = document.getElementById('cart-total');
  const cartDiscountRow = document.getElementById('cart-discount-row');
  const cartDiscount = document.getElementById('cart-discount');
  const promoInput = document.getElementById('promo-input');
  const applyPromoBtn = document.getElementById('apply-promo-btn');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const bookingModal = document.getElementById('booking-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutForm = document.getElementById('checkout-form');
  const bookingForm = document.getElementById('booking-form');
  const estimatorForm = document.getElementById('estimator-form');

  // Theme Initializer
  const currentTheme = localStorage.getItem('uae_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('uae_theme', theme);
    });
  }

  // Toast Notification
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #1E293B;
      color: #F8FAFC;
      border: 1px solid #DC2626;
      border-radius: 8px;
      padding: 12px 20px;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.5);
      z-index: 9999;
      font-weight: 600;
      font-size: 0.9rem;
      animation: fadeIn 0.3s ease-in-out;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  // Render Services
  if (servicesContainer) {
    servicesContainer.innerHTML = servicesData.map(service => `
      <div class="service-card" data-id="${service.id}">
        <div class="service-icon-box">
          <svg class="icon" style="width:28px;height:28px;"><use href="#${service.icon}"></use></svg>
        </div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <div class="service-footer">
          <div>
            <span class="service-price">$${service.price.toFixed(2)}</span>
            <span class="service-duration">${service.duration}</span>
          </div>
          <button class="btn btn-secondary book-service-btn" data-service="${service.title}" data-price="${service.price}">
            Book Bay
          </button>
        </div>
      </div>
    `).join('');
  }

  // Render Products
  function renderProducts(items) {
    if (!productsContainer) return;
    productsContainer.innerHTML = items.map(product => `
      <div class="product-card" data-id="${product.id}">
        <div class="product-img-wrap">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
          <img src="assets/images/${product.image}" alt="${product.title}" class="product-card-img" loading="lazy">
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h4 class="product-title">${product.title}</h4>
          <p class="product-specs">${product.specs}</p>
          <div class="product-footer">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <button class="btn btn-primary add-cart-btn" data-id="${product.id}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }
  renderProducts(productsData);

  // Render Reviews
  if (reviewsContainer) {
    reviewsContainer.innerHTML = reviewsData.map(rev => `
      <div class="review-card">
        <div class="review-stars">
          ${Array(rev.rating).fill('<svg class="icon" style="width:18px;height:18px;"><use href="#icon-star"></use></svg>').join('')}
        </div>
        <p class="review-text">"${rev.text}"</p>
        <div class="reviewer">
          <div class="reviewer-avatar">${rev.name.charAt(0)}</div>
          <div class="reviewer-info">
            <h4>${rev.name}</h4>
            <span>${rev.location} &bull; ${rev.date}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Update Cart UI
  function updateCartUI() {
    const totals = cart.getTotals();
    if (cartBadge) cartBadge.textContent = totals.itemCount;
    if (cartSubtotal) cartSubtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (cartTax) cartTax.textContent = `$${totals.tax.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `$${totals.total.toFixed(2)}`;

    if (cartDiscountRow && cartDiscount) {
      if (totals.activePromo) {
        cartDiscountRow.style.display = 'flex';
        cartDiscount.textContent = `-$${totals.discountAmount.toFixed(2)} (${totals.activePromo.code})`;
      } else {
        cartDiscountRow.style.display = 'none';
      }
    }

    if (cartItemsList) {
      if (cart.items.length === 0) {
        cartItemsList.innerHTML = `<div style="text-align:center;color:#94A3B8;padding:2rem;">Your cart is empty.</div>`;
      } else {
        cartItemsList.innerHTML = cart.items.map(item => `
          <div class="cart-item" data-id="${item.id}">
            <img src="assets/images/${item.image || 'part-brembo.jpg'}" alt="${item.title}" style="width:42px;height:42px;object-fit:cover;border-radius:6px;border:1px solid #475569;">
            <div class="cart-item-info">
              <div class="cart-item-title">${item.title}</div>
              <div class="cart-item-price">$${item.price.toFixed(2)}</div>
              <div class="cart-qty-controls">
                <button class="qty-btn" data-action="dec" data-id="${item.id}">-</button>
                <span style="font-size:0.9rem;font-weight:600;">${item.quantity}</span>
                <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
              </div>
            </div>
            <button class="qty-btn" data-action="remove" data-id="${item.id}" title="Remove" style="color:#EF4444;">&times;</button>
          </div>
        `).join('');
      }
    }
  }
  updateCartUI();

  // Cart Drawer open/close
  const cartTrigger = document.getElementById('cart-trigger');
  const closeCartBtn = document.getElementById('close-cart-btn');

  function openCart() {
    cartDrawer?.classList.add('open');
    cartOverlay?.classList.add('open');
  }

  function closeCart() {
    cartDrawer?.classList.remove('open');
    cartOverlay?.classList.remove('open');
  }

  cartTrigger?.addEventListener('click', openCart);
  closeCartBtn?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  // Cart Item Events
  cartItemsList?.addEventListener('click', (e) => {
    const target = e.target;
    const btn = target.closest('button');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    const action = btn.getAttribute('data-action');

    if (action === 'inc') {
      cart.updateQuantity(id, 1);
    } else if (action === 'dec') {
      cart.updateQuantity(id, -1);
    } else if (action === 'remove') {
      cart.removeItem(id);
    }
    updateCartUI();
  });

  // Add To Cart Event
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-cart-btn');
    if (addBtn) {
      const prodId = addBtn.getAttribute('data-id');
      const prod = productsData.find(p => p.id === prodId);
      if (prod) {
        cart.addItem(prod, 1);
        updateCartUI();
        showToast(`Added ${prod.title} to cart!`);
        openCart();
      }
    }
  });

  // Promo Code
  applyPromoBtn?.addEventListener('click', () => {
    const code = promoInput?.value;
    const res = cart.applyPromo(code);
    if (res.success) {
      showToast(`Promo ${res.promo.code} applied! (${res.promo.discountPercent}% OFF)`);
      updateCartUI();
    } else {
      showToast(res.message, 'error');
    }
  });

  // Category Filtering
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-category');
      if (cat === 'all') {
        renderProducts(productsData);
      } else {
        renderProducts(productsData.filter(p => p.category === cat));
      }
    });
  });

  // Product Search
  const searchInput = document.getElementById('search-products');
  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    renderProducts(productsData.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.specs.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    ));
  });

  // Booking Service Triggers
  document.addEventListener('click', (e) => {
    const bookBtn = e.target.closest('.book-service-btn');
    if (bookBtn) {
      const srvTitle = bookBtn.getAttribute('data-service');
      const selectElem = document.getElementById('booking-service-select');
      if (selectElem) selectElem.value = srvTitle;
      modalOverlay?.classList.add('open');
      bookingModal?.classList.add('open');
    }
  });

  // Modal Closers
  document.querySelectorAll('.modal-close, #modal-overlay').forEach(el => {
    el.addEventListener('click', () => {
      modalOverlay?.classList.remove('open');
      bookingModal?.classList.remove('open');
      checkoutModal?.classList.remove('open');
    });
  });

  // Booking Form Submission
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(bookingForm);
    const bookingEntry = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      vehicle: `${formData.get('year')} ${formData.get('make')} ${formData.get('model')}`,
      service: formData.get('service'),
      date: formData.get('date'),
      timeSlot: formData.get('timeSlot')
    };

    const confirmed = booking.createBooking(bookingEntry);
    modalOverlay?.classList.remove('open');
    bookingModal?.classList.remove('open');
    showToast(`Appointment Confirmed! Confirmation code: ${confirmed.id}`);
  });

  // Cost Estimator
  estimatorForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const system = document.getElementById('est-system')?.value;
    const mileage = document.getElementById('est-mileage')?.value;
    const vType = document.getElementById('est-vtype')?.value;

    const res = calculateEstimate({ system, mileage, vehicleType: vType });
    const outputElem = document.getElementById('estimate-display');
    if (outputElem) {
      outputElem.innerHTML = `
        <div style="font-size:0.95rem;color:#94A3B8;">Estimated range for <strong>${res.systemName}</strong>:</div>
        <div class="estimate-amount">$${res.min} - $${res.max}</div>
        <div style="font-size:0.85rem;color:#10B981;">Includes OEM parts, labor & California environmental disposal</div>
      `;
    }
  });

  // Checkout Flow
  const proceedCheckoutBtn = document.getElementById('proceed-checkout-btn');
  proceedCheckoutBtn?.addEventListener('click', () => {
    if (cart.items.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }
    closeCart();
    modalOverlay?.classList.add('open');
    checkoutModal?.classList.add('open');
  });

  checkoutForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const orderNumber = 'UAE-ORD-' + Math.floor(10000 + Math.random() * 90000);
    cart.clearCart();
    updateCartUI();
    modalOverlay?.classList.remove('open');
    checkoutModal?.classList.remove('open');
    showToast(`Order Placed Successfully! Reference #${orderNumber}`);
  });

  // Right-Click Context Menu Implementation (User Rule Compliance)
  const contextMenu = document.getElementById('custom-context-menu');
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (!contextMenu) return;
    contextMenu.style.left = `${Math.min(e.clientX, window.innerWidth - 180)}px`;
    contextMenu.style.top = `${Math.min(e.clientY, window.innerHeight - 180)}px`;
    contextMenu.classList.add('open');
  });

  window.addEventListener('click', () => {
    contextMenu?.classList.remove('open');
  });

  contextMenu?.addEventListener('click', async (e) => {
    const item = e.target.closest('.context-menu-item');
    if (!item) return;
    const action = item.getAttribute('data-action');
    try {
      if (action === 'copy') {
        const sel = window.getSelection()?.toString();
        if (sel) await navigator.clipboard.writeText(sel);
      } else if (action === 'paste') {
        const text = await navigator.clipboard.readText();
        const active = document.activeElement;
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
          active.value += text;
        }
      } else if (action === 'cut') {
        const active = document.activeElement;
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
          await navigator.clipboard.writeText(active.value);
          active.value = '';
        }
      } else if (action === 'selectall') {
        const active = document.activeElement;
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
          active.select();
        } else {
          document.execCommand('selectAll');
        }
      }
    } catch {
      // Fallback
    }
    contextMenu.classList.remove('open');
  });
});
