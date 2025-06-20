import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';
import { FaBook, FaPlus, FaSignOutAlt } from 'react-icons/fa';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => navigate('/login'));
  };

  return (
    <div className="text-center">
      <h1 className="mb-4">Welcome, {user?.name}!</h1>
      <p className="lead">Logged in as <strong>{user?.role}</strong></p>

      <div className="row justify-content-center mt-5">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <FaBook size={40} className="text-primary mb-3" />
              <h5 className="card-title">Book List</h5>
              <Link to="/books" className="btn btn-primary mt-3">View Books</Link>
            </div>
          </div>
        </div>

        {user?.role === 'admin' && (
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <FaPlus size={40} className="text-warning mb-3" />
                <h5 className="card-title">Add Book</h5>
                <Link to="/add-book" className="btn btn-warning mt-3">Add New Book</Link>
              </div>
            </div>
          </div>
        )}

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <FaSignOutAlt size={40} className="text-danger mb-3" />
              <h5 className="card-title">Logout</h5>
              <button onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) handleLogout();
                }} className="btn btn-danger mt-3">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
