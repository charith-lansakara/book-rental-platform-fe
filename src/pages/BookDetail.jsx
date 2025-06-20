import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookById, rentBook, returnBook, clearSelectedBook } from '../features/books/bookSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function BookDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedBook, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBookById(id));

    return () => {
      dispatch(clearSelectedBook());
    };
  }, [dispatch, id]);

  const handleRent = () => {
    dispatch(rentBook(id))
      .unwrap()
      .then(() => {
        toast.success('Book rented successfully!');
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to rent book.');
      });
  };

  const handleReturn = () => {
    dispatch(returnBook(id))
      .unwrap()
      .then(() => {
        toast.success('Book returned successfully!');
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to return book.');
      });
  };

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>Error: {error.message || 'Failed to load book.'}</p>;
  if (!selectedBook) return <p>No book found.</p>;

  return (
    <div>
      <h2>Book Detail</h2>
      <h3>{selectedBook.title}</h3>
      <p><strong>Author:</strong> {selectedBook.author}</p>
      <p><strong>Published Date:</strong> {selectedBook.published_date}</p>
      <p><strong>Status:</strong> {selectedBook.is_available ? 'Available' : 'Rented'}</p>

      {selectedBook.is_available ? (
        <button onClick={handleRent}>Rent this Book</button>
      ) : (
        <button onClick={handleReturn}>Return this Book</button>
      )}
    </div>
  );
}

export default BookDetail;
