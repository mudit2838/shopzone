import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { id, title, price, thumbnail, category } = product;

  return (
    <article className="product-card" id={`product-card-${id}`}>
      <Link to={`/product/${id}`} className="product-card-image-wrapper">
        <img
          src={thumbnail}
          alt={title}
          className="product-card-image"
          loading="lazy"
        />
      </Link>
      <div className="product-card-info">
        <span className="product-card-category">{category}</span>
        <h3 className="product-card-title">
          <Link to={`/product/${id}`}>{title}</Link>
        </h3>
        <div className="product-card-footer">
          <span className="product-card-price">${price.toFixed(2)}</span>
          <Link to={`/product/${id}`} className="btn btn-primary product-card-btn">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
