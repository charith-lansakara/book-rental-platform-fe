import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, fetchMe } from '../features/auth/authSlice';
import { FaSignOutAlt } from 'react-icons/fa';

function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(false);
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
    <div style={{ paddingTop: '90px', paddingBottom: '60px' }}>
      
      {/* Header - fixed top */}
      <header
        className="text-white py-3 px-4 d-flex align-items-center justify-content-between shadow-sm"
        style={{
          backgroundColor: '#0a1c4b',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1030,
        }}
      >
        <div className="d-flex align-items-center">
          <img src="/logo.png" alt="Logo" height="60" className="me-3 rounded-circle" />
          <h4 className="mb-0 fw-bold">Book Rental System</h4>
        </div>

        {isLoggedIn && (
          <nav className="d-flex align-items-center">
            <Link to="/" className="btn btn-outline-light me-3">Dashboard</Link>
            <span className="me-3">Hi, <strong>{user?.name}</strong> ({user?.role})</span>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-danger d-flex align-items-center"
            >
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="container my-4">
        {children}
      </main>

      {/* Footer - fixed bottom */}
      <footer
        className="text-center p-3 border-top"
        style={{
          backgroundColor: '#0a1c4b',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1020,
        }}
      >
        <small style={{ color: '#ffffff' }}>
          &copy; {new Date().getFullYear()} Book Rental System. All rights reserved.
        </small>
      </footer>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Logout</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to log out?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}


export default Layout;
