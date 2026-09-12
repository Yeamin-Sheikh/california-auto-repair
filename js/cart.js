/**
 * Shopping Cart & Checkout Engine
 * Computes Los Angeles County Sales Tax (9.5%), Promo discounts, and order state.
 */
export class CartManager {
  constructor(storageKey = 'uae_cart_state') {
    this.storageKey = storageKey;
    this.taxRate = 0.095; // 9.5% Los Angeles County Tax Rate
    this.activePromo = null;
    this.promoCodes = {
      'CALIF15': { discountPercent: 15, label: '15% California Welcome Discount' },
      'SAVE10': { discountPercent: 10, label: '10% Parts Discount' }
    };
    this.items = this.loadCart();
  }

  loadCart() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {
      console.warn('Could not persist cart to storage', e);
    }
  }

  addItem(product, quantity = 1) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        title: product.title,
        price: Number(product.price),
        sku: product.sku || product.id,
        icon: product.icon || 'icon-wrench',
        quantity: quantity
      });
    }
    this.saveCart();
    return this.items;
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    return this.items;
  }

  updateQuantity(productId, delta) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(productId);
    } else {
      this.saveCart();
    }
  }

  clearCart() {
    this.items = [];
    this.activePromo = null;
    this.saveCart();
  }

  applyPromo(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (this.promoCodes[cleanCode]) {
      this.activePromo = {
        code: cleanCode,
        ...this.promoCodes[cleanCode]
      };
      return { success: true, promo: this.activePromo };
    }
    return { success: false, message: 'Invalid promo code. Try CALIF15' };
  }

  removePromo() {
    this.activePromo = null;
  }

  getTotals() {
    const rawSubtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subtotal = Math.round(rawSubtotal * 100) / 100;
    
    // Round discount to exact cents
    const discountAmount = this.activePromo 
      ? Math.round((subtotal * (this.activePromo.discountPercent / 100)) * 100) / 100 
      : 0;
      
    const taxableSubtotal = Math.max(0, Math.round((subtotal - discountAmount) * 100) / 100);
    const tax = Math.round((taxableSubtotal * this.taxRate) * 100) / 100;
    const total = Math.round((taxableSubtotal + tax) * 100) / 100;

    return {
      itemCount: this.items.reduce((cnt, item) => cnt + item.quantity, 0),
      subtotal,
      discountAmount,
      tax,
      total,
      activePromo: this.activePromo
    };
  }
}
