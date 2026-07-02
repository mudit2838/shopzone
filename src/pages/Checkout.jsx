import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', city: '', zip: '' });
  const [paymentInfo, setPaymentInfo] = useState({ card: '', expiry: '', cvc: '' });
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const randomOrderId = 'SZ-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomOrderId);
    setOrderComplete(true);
    clearCart(); 
  };

  if (orderComplete) {
    return (
      <div className="state-container" id="checkout-success">
        <div className="empty-icon" style={{ color: 'var(--success)' }}>🎉</div>
        <h2>Order Confirmed!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <p style={{ fontWeight: '600', marginBottom: '24px' }}>
          Order ID: <span style={{ color: 'var(--primary)' }}>{orderId}</span>
        </p>
        <Link to="/shop" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="state-container" id="checkout-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your Cart is Empty</h2>
        <p style={{ maxWidth: '450px', margin: '0 auto 24px', color: 'var(--text-secondary)' }}>
          You cannot checkout with an empty cart. Please add some products to your cart first.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page" id="checkout-container">
      <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Secure Checkout</h2>

      <div className="product-detail-container" style={{ alignItems: 'flex-start' }}>

        <form onSubmit={handlePlaceOrder} id="checkout-form">
          <h3 style={{ marginBottom: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
            Shipping Details
          </h3>
          <div className="form-group">
            <label htmlFor="shipping-name" className="form-label">Full Name</label>
            <input
              type="text"
              id="shipping-name"
              name="name"
              className="form-input"
              value={shippingInfo.name}
              onChange={handleShippingChange}
              placeholder="abcd"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="shipping-address" className="form-label">Address</label>
            <input
              type="text"
              id="shipping-address"
              name="address"
              className="form-input"
              value={shippingInfo.address}
              onChange={handleShippingChange}
              placeholder="123 delhi"
              required
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label htmlFor="shipping-city" className="form-label">City</label>
              <input
                type="text"
                id="shipping-city"
                name="city"
                className="form-input"
                value={shippingInfo.city}
                onChange={handleShippingChange}
                placeholder="delhi"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="shipping-zip" className="form-label">ZIP Code</label>
              <input
                type="text"
                id="shipping-zip"
                name="zip"
                className="form-input"
                value={shippingInfo.zip}
                onChange={handleShippingChange}
                placeholder="110045"
                required
              />
            </div>
          </div>

          <h3 style={{ margin: '24px 0 16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
            Payment Method
          </h3>
          <div className="form-group">
            <label htmlFor="payment-card" className="form-label">Credit Card Number</label>
            <input
              type="text"
              id="payment-card"
              name="card"
              className="form-input"
              value={paymentInfo.card}
              onChange={handlePaymentChange}
              placeholder="4111 2222 3333 4444"
              maxLength="19"
              required
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label htmlFor="payment-expiry" className="form-label">Expiration Date</label>
              <input
                type="text"
                id="payment-expiry"
                name="expiry"
                className="form-input"
                value={paymentInfo.expiry}
                onChange={handlePaymentChange}
                placeholder="MM/YY"
                maxLength="5"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="payment-cvc" className="form-label">CVC / CVV</label>
              <input
                type="password"
                id="payment-cvc"
                name="cvc"
                className="form-input"
                value={paymentInfo.cvc}
                onChange={handlePaymentChange}
                placeholder="•••"
                maxLength="4"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} id="order-submit-btn">
            Place Secure Order (${(totalPrice + 9.99).toFixed(2)})
          </button>
        </form>


        <div className="cart-summary" style={{ width: '100%', textAlign: 'left' }} id="checkout-summary-box">
          <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
            Order Summary
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {item.title} <strong style={{ color: 'var(--text-primary)' }}>× {item.quantity}</strong>
                </span>
                <span style={{ fontWeight: '600' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', margin: '8px 0', color: 'var(--text-muted)' }}>
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', margin: '8px 0', color: 'var(--text-muted)' }}>
            <span>Shipping</span>
            <span>$9.99</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-light)', fontWeight: '800' }}>
            <span>Grand Total</span>
            <span style={{ color: 'var(--primary)' }}>${(totalPrice + 9.99).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
