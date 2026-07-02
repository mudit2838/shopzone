import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="hero-section">
      <div className="hero-glow"></div>
      <h1>ShopZone</h1>
      <p className="hero-subtitle">
        Welcome to the ultimate shopping destination. Discover handpicked, high-quality products, curated just for you.
      </p>
      <Link to="/shop" className="btn btn-primary" id="home-cta-btn">
        Explore Products
      </Link>
    </div>
  );
}
