import assert from 'node:assert';
import { CartManager } from '../js/cart.js';
import { calculateEstimate } from '../js/estimator.js';
import { productsData, servicesData } from '../js/products.js';

console.log('--- Running California Auto Repair Tests ---');

// Mock localStorage for Node environment
global.localStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

// Test 1: Data integrity
assert.strictEqual(servicesData.length, 6, 'Should have 6 services');
assert.strictEqual(productsData.length, 6, 'Should have 6 products');
console.log('✓ Data catalogs loaded correctly');

// Test 2: Cart calculations & LA County 9.5% tax
const cart = new CartManager('test_cart_suite');
cart.clearCart();

const p1 = productsData[0]; // Brembo pads: 84.99
const p2 = productsData[1]; // Mobil 1 kit: 54.50

cart.addItem(p1, 2);
cart.addItem(p2, 1);

let totals = cart.getTotals();
// 2 * 84.99 + 54.50 = 169.98 + 54.50 = 224.48
assert.strictEqual(totals.subtotal, 224.48, 'Subtotal should be 224.48');
assert.strictEqual(totals.itemCount, 3, 'Item count should be 3');

// 9.5% tax on 224.48 = 21.3256 -> 21.33
assert.strictEqual(totals.tax, 21.33, 'LA County 9.5% tax should be 21.33');
assert.strictEqual(totals.total, 245.81, 'Total should be 245.81');
console.log('✓ Cart subtotal and California tax calculations accurate');

// Test 3: Promo code CALIF15 (15% off)
const promoRes = cart.applyPromo('CALIF15');
assert.strictEqual(promoRes.success, true, 'CALIF15 promo should succeed');

totals = cart.getTotals();
// Discount: 15% of 224.48 = 33.672 -> 33.67
assert.strictEqual(totals.discountAmount, 33.67, 'Discount should be 33.67');
// Taxable subtotal: 224.48 - 33.67 = 190.81
// Tax: 190.81 * 0.095 = 18.12695 -> 18.13
assert.strictEqual(totals.tax, 18.13, 'Discounted tax should be 18.13');
assert.strictEqual(totals.total, 208.94, 'Final discounted total should be 208.94');
console.log('✓ Promo code CALIF15 discount applied correctly');

// Test 4: Quantity adjustments
cart.updateQuantity(p1.id, -1); // Brembo goes from 2 to 1
assert.strictEqual(cart.getTotals().itemCount, 2, 'Item count should decrease to 2');

cart.removeItem(p2.id);
assert.strictEqual(cart.getTotals().itemCount, 1, 'Item count should decrease to 1 after removing p2');
console.log('✓ Cart item manipulation verified');

// Test 5: Estimator algorithm
const estimateStandard = calculateEstimate({ system: 'brakes', mileage: 30000, vehicleType: 'standard' });
assert.strictEqual(estimateStandard.min, 220);
assert.strictEqual(estimateStandard.max, 480);

const estimateLuxuryHighMileage = calculateEstimate({ system: 'brakes', mileage: 120000, vehicleType: 'luxury' });
// Multiplier: 1.35 * 1.2 = 1.62
// min: round(220 * 1.62) = round(356.4) = 356
// max: round(480 * 1.62) = round(777.6) = 778
assert.strictEqual(estimateLuxuryHighMileage.min, 356);
assert.strictEqual(estimateLuxuryHighMileage.max, 778);
console.log('✓ Cost estimator multipliers verified');

console.log('\nAll California Auto Repair tests passed successfully! (5/5)');
