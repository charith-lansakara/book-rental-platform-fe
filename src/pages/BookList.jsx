import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../features/books/bookSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function BookList() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  const [author, setAuthor] = useState('');
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error.message || 'Failed to fetch books.');
  }, [error]);

  const handleFilter = () => {
    let queryParams = '?';
    if (author) queryParams += `author=${author}&`;
    if (availability) queryParams += `availability=${availability}&`;
    dispatch(fetchBooks(queryParams));
  };

  const clearFilters = () => {
    setAuthor('');
    setAvailability('');
    dispatch(fetchBooks());
  };

  const handlePageChange = (url) => {
    if (!url) return;
    const queryString = url.replace('http://127.0.0.1:8000/api/books', '');
    dispatch(fetchBooks(queryString));
  };

  useEffect(() => {
        document.title = 'Book List | Book Rental App'; 
      }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text" style={{ color: '#0a1c4b' }}>Book List</h2>
        {user?.role === 'admin' && (
        <Link to="/add-book" className="btn btn-success">+ Add New Book</Link>
        )}
      </div>

      {/* Filters */}
      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
          </select>
        </div>
        <div className="col-md-2 d-grid">
          <button className="btn btn-primary" onClick={handleFilter}>Apply</button>
        </div>
        <div className="col-md-2 d-grid">
          <button className="btn btn-secondary" onClick={clearFilters}>Clear</button>
        </div>
      </div>

      {/* Book List */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading books...</p>
        </div>
      ) : books?.data?.length > 0 ? (
        <div className="row">
          {books.data.map((book) => (
            <div key={book.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{book.title}</h5>
                  <p className="card-text">Author: <strong>{book.author}</strong></p>
                  <p className="card-text">
                    Status:{' '}
                    <span className={book.is_available ? 'text-success' : 'text-danger'}>
                      {book.is_available ? 'Available' : 'Rented'}
                    </span>
                  </p>
                  <Link to={`/books/${book.id}`} className="btn btn-outline-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning">No books available.</div>
      )}

      {/* Pagination */}
      {books?.meta?.links?.length > 0 && (
        <div className="d-flex flex-wrap gap-2 mt-4 justify-content-center">
          {books.meta.links.map((link, index) => (
            <button
              key={index}
              className={`btn ${link.active ? 'btn-primary' : 'btn-outline-secondary'} btn-sm`}
              disabled={!link.url}
              onClick={() => handlePageChange(link.url)}
              dangerouslySetInnerHTML={{ __html: link.label.replace(/&raquo;|&laquo;/g, '') }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
