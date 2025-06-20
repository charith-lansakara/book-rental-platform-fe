import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../features/books/bookSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function BookList() {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  // Filters
  const [author, setAuthor] = useState('');
  const [availability, setAvailability] = useState('');

  // Fetch all books on initial load
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Show error toast if error occurs
  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Failed to fetch books.');
    }
  }, [error]);

  // Filter handler
  const handleFilter = () => {
    let queryParams = '?';
    if (author) queryParams += `author=${author}&`;
    if (availability) queryParams += `availability=${availability}&`;

    dispatch(fetchBooks(queryParams));
  };

  // Clear filters
  const clearFilters = () => {
    setAuthor('');
    setAvailability('');
    dispatch(fetchBooks());
  };

  // Pagination handler
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

      {/* Filter form */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ marginRight: '10px' }}
        />

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="rented">Rented</option>
        </select>

        <button onClick={handleFilter}>Apply</button>
        <button onClick={clearFilters} style={{ marginLeft: '5px' }}>Clear</button>
      </div>

      {/* Book list */}
      {books?.data?.length > 0 ? (
        <div>
          {books.data.map((book) => (
            <div key={book.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <h4>{book.title}</h4>
              <p>Author: {book.author}</p>
              <p>Status: {book.is_available ? 'Available' : 'Rented'}</p>
              <Link to={`/books/${book.id}`}>View Details</Link>
            </div>
          ))}

          {/* Pagination */}
          <div style={{ marginTop: '20px' }}>
            {books.meta?.links?.map((link, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(link.url)}
                disabled={!link.url}
                style={{
                  marginRight: '5px',
                  padding: '5px 10px',
                  background: link.active ? '#007bff' : '#f0f0f0',
                  color: link.active ? '#fff' : '#000',
                  border: 'none',
                  cursor: link.url ? 'pointer' : 'not-allowed'
                }}
              >
                {link.label.replace(/&raquo;|&laquo;/g, '')}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
}

export default BookList;
