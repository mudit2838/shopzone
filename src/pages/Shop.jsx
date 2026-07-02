import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch('https://dummyjson.com/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setProducts(data.products || []);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Something went wrong while fetching products.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="state-container" id="shop-loading">
        <div className="loading-spinner"></div>
        <p>Curating our premium collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-container" id="shop-error">
        <div className="error-icon">⚠️</div>
        <h3>Unable to Load Products</h3>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <h2>Explore Products</h2>
      {products.length === 0 ? (
        <div className="state-container" id="shop-empty">
          <div className="empty-icon">📦</div>
          <h3>No Products Found</h3>
          <p>We couldn't find any products in our store right now.</p>
        </div>
      ) : (
        <div className="products-grid" id="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
