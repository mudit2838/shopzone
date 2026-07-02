import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const location = useLocation();


  const from = location.state?.from?.pathname || '/checkout';

  const handleLogin = () => {
    login();
  };


  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="auth-card" id="login-card">
      <h2 className="auth-card-title">Customer Login</h2>
      <p className="auth-card-text">
        Accessing the checkout process requires authentication. Please log in as a Guest to continue.
      </p>

      <button
        onClick={handleLogin}
        className="btn btn-primary"
        style={{ width: '100%' }}
        id="guest-login-btn"
      >
        Login as Guest
      </button>
    </div>
  );
}
