import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error(`Failed to fetch product details: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setProduct(data);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Something went wrong while fetching product details.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="state-container" id="product-loading">
        <div className="loading-spinner"></div>
        <p>Fetching premium details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-container" id="product-error">
        <div className="error-icon">🔍</div>
        <h3>Product Not Found</h3>
        <p>{error}</p>
        <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
          <Link to="/shop" className="btn btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="product-detail-page">
      <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--text-muted)' }}>
        ← Back to Shop
      </Link>

      <div className="product-detail-container" id="product-detail-container">
        <div className="product-detail-gallery">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-detail-image"
          />
        </div>

        <div className="product-detail-info">
          <span className="product-detail-category">{product.category}</span>
          <h1 className="product-detail-title">{product.title}</h1>
          <div className="product-detail-price">${product.price.toFixed(2)}</div>
          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-actions">
            <button
              className="btn btn-primary"
              id="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-secondary">
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
