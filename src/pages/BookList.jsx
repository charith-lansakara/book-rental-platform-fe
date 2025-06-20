import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../features/books/bookSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function BookList() {
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

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Failed to load books.</p>;

  return (
    <div>
      <h2>Book List</h2>

      <div className="mb-3">
        <input type="text" className="form-control d-inline w-auto me-2" placeholder="Search by author"
          value={author} onChange={(e) => setAuthor(e.target.value)} />

        <select className="form-select d-inline w-auto me-2" value={availability} onChange={(e) => setAvailability(e.target.value)}>
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="rented">Rented</option>
        </select>

        <button className="btn btn-primary me-2" onClick={handleFilter}>Apply</button>
        <button className="btn btn-secondary" onClick={clearFilters}>Clear</button>
      </div>

      {books?.data?.length > 0 ? (
        <div>
          {books.data.map((book) => (
            <div key={book.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">Status: <strong>{book.is_available ? 'Available' : 'Rented'}</strong></p>
                <Link to={`/books/${book.id}`} className="btn btn-outline-primary">View Details</Link>
              </div>
            </div>
          ))}

          <div className="mt-4">
            {books.meta?.links?.map((link, index) => (
              <button key={index} onClick={() => handlePageChange(link.url)} disabled={!link.url}
                className={`btn ${link.active ? 'btn-primary' : 'btn-outline-secondary'} me-2 mb-2`}>
                {link.label.replace(/&raquo;|&laquo;/g, '')}
              </button>
            ))}
          </div>
        </div>
      ) : (<p>No books available.</p>)}
    </div>
  );
}

export default BookList;