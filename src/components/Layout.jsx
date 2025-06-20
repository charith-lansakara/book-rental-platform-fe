import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, fetchMe } from '../features/auth/authSlice';

function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => navigate('/login'));
  };

  useEffect(() => {
    if (isLoggedIn && !user) {
      dispatch(fetchMe());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="bg-primary text-white py-3 px-4 d-flex align-items-center justify-content-between shadow-sm">
        <div className="d-flex align-items-center">
          <img src="/logo.png" alt="Logo" height="60" className="me-3 rounded-circle" />
          <h4 className="mb-0 fw-bold">Book Rental System</h4>
        </div>

        {isLoggedIn && (
          <nav className="d-flex align-items-center">
            <Link to="/" className="btn btn-outline-light me-3">Dashboard</Link>
            <span className="me-3">Hi, <strong>{user?.name}</strong> ({user?.role})</span>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to logout?')) handleLogout();
              }}
              className="btn btn-danger"
            >
              Logout
            </button>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="container flex-grow-1 my-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-light text-center p-3 border-top mt-auto">
        <small>&copy; {new Date().getFullYear()} Book Rental System. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default Layout;
