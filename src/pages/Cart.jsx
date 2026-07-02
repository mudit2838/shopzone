import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="state-container" id="cart-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your Cart is Empty</h2>
        <p style={{ maxWidth: '400px', margin: '0 auto 24px', color: 'var(--text-secondary)' }}>
          Explore our premium catalog and find something special to fill your cart.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 style={{ marginBottom: '24px' }}>Your Shopping Cart</h2>

      <div className="cart-list" id="cart-items-list">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id} id={`cart-item-${item.id}`}>
            <div className="cart-item-img-wrapper">
              <img src={item.thumbnail} alt={item.title} className="cart-item-img" />
            </div>

            <div className="cart-item-info">
              <h4 className="cart-item-title">{item.title}</h4>
              <p className="cart-item-price">${item.price.toFixed(2)} each</p>
            </div>

            <div className="cart-item-controls">
              <button
                className="qty-btn"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: '600' }} className="cart-item-qty">
                {item.quantity}
              </span>
              <button
                className="qty-btn"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div style={{ minWidth: '100px', textAlign: 'right', fontWeight: '700' }} className="cart-item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              className="qty-btn"
              onClick={() => removeFromCart(item.id)}
              style={{ color: 'var(--error)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
              aria-label="Remove item"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary" id="cart-summary">
        <div className="cart-summary-row">
          <span>Subtotal</span>
          <span className="cart-summary-total">${totalPrice.toFixed(2)}</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Shipping and taxes calculated at checkout.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/shop" style={{ color: 'var(--text-muted)' }}>
            ← Continue Shopping
          </Link>
          <Link to="/checkout" className="btn btn-primary" id="checkout-cta-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
