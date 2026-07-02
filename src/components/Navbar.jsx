import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { totalItems } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" id="navbar-brand-logo" onClick={closeMenu}>
          Shop<span>Zone</span>
        </Link>

        {/* Hamburger Toggle Button for Mobile */}
        <button
          className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${menuOpen ? 'show' : ''}`} id="navbar-menu-links">
          <NavLink to="/" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`} onClick={closeMenu} end>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            Shop
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            Contact
          </NavLink>
          <NavLink to="/checkout" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            Checkout
          </NavLink>

          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className="navbar-link logout-btn"
              id="navbar-logout-btn"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              Login
            </NavLink>
          )}

          <NavLink to="/cart" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            <div className="cart-badge-container">
              <span className="cart-icon">🛒</span>
              <span className="cart-count" id="nav-cart-count">{totalItems}</span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
