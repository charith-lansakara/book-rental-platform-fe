import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaBook, FaPlus, FaUserCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { getBookSummary } from '../api/bookApi';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [summary, setSummary] = useState({ total: 0, available: 0, rented: 0 });

  useEffect(() => {
    document.title = 'Dashboard | Book Rental App';

    // Fetch summary stats
    getBookSummary()
      .then(res => setSummary(res.data))
      .catch(() => setSummary({ total: 0, available: 0, rented: 0 }));
  }, []);

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <FaUserCircle size={60} className="text-secondary mb-2" />
        <h1 className="fw-bold">Welcome, {user?.name}!</h1>
        <p className="text-muted lead">
          You are logged in as <span className="badge bg-info text-dark">{user?.role?.toUpperCase()}</span>
        </p>
      </div>

      {/* Summary Stat Cards */}
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
        <div className="col">
          <div className="card text-white bg-primary text-center shadow-sm">
            <div className="card-body">
              <FaBook size={50} className="mb-3" />
              <h5 className="card-title">Total Books</h5>
              <h2>{summary.total}</h2>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card text-white bg-success text-center shadow-sm">
            <div className="card-body">
              <FaCheckCircle size={50} className="mb-3" />
              <h5 className="card-title">Available Books</h5>
              <h2>{summary.available}</h2>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card text-white bg-danger text-center shadow-sm">
            <div className="card-body">
              <FaTimesCircle size={50} className="mb-3" />
              <h5 className="card-title">Rented Books</h5>
              <h2>{summary.rented}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="row justify-content-center g-4">
        {/* View Books */}
        <div className="col-md-4">
          <div className="card shadow h-100 border-0 hover-shadow">
            <div className="card-body text-center">
              <FaBook size={50} className="text-primary mb-3" />
              <h5 className="card-title mb-2">Browse Books</h5>
              <p className="text-muted">View and manage available books in the library.</p>
              <Link to="/books" className="btn btn-primary mt-2">View Books</Link>
            </div>
          </div>
        </div>

        {/* Add Book (Admin Only) */}
        {user?.role === 'admin' && (
          <div className="col-md-4">
            <div className="card shadow h-100 border-0 hover-shadow">
              <div className="card-body text-center">
                <FaPlus size={50} className="text-success mb-3" />
                <h5 className="card-title mb-2">Add New Book</h5>
                <p className="text-muted">Add a new book to the rental collection.</p>
                <Link to="/add-book" className="btn btn-success mt-2">Add Book</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
