import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBookById,
  rentBook,
  returnBook,
  clearSelectedBook,
} from '../features/books/bookSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaBook, FaCheck, FaUndo } from 'react-icons/fa';


function BookDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedBook, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBookById(id));
    return () => dispatch(clearSelectedBook());
  }, [dispatch, id]);

  const handleRent = () => {
    dispatch(rentBook(id))
      .unwrap()
      .then(() => {
        toast.success('Book rented successfully!');
        navigate('/');
      })
      .catch((error) => toast.error(error.message));
  };

  const handleReturn = () => {
    dispatch(returnBook(id))
      .unwrap()
      .then(() => {
        toast.success('Book returned successfully!');
        navigate('/');
      })
      .catch((error) => toast.error(error.message));
  };

  useEffect(() => {
      document.title = 'Book Detail | Book Rental System'; 
    }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading book details...</p>
      </div>
    );
  }

  if (error) return <div className="alert alert-danger">Error: {error.message}</div>;
  if (!selectedBook) return <div className="alert alert-warning">No book found.</div>;

  

  return (
    <div className="container py-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <div className="text-center mb-4">
          <FaBook size={50} className="text-primary mb-2" />
          <h2 className="text-primary">{selectedBook.title}</h2>
          <span
            className={`badge ${
              selectedBook.is_available ? 'bg-success' : 'bg-danger'
            } fs-6 mt-2`}
          >
            {selectedBook.is_available ? 'Available' : 'Rented'}
          </span>
        </div>

        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item">
            <strong>Author:</strong> {selectedBook.author}
          </li>
          <li className="list-group-item">
            <strong>Published Date:</strong> {selectedBook.published_date}
          </li>
        </ul>

        {/* Buttons Row */}
        <div className="row g-2">
          <div className="col-6 d-grid">
            <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
              <FaArrowLeft className="me-2" />
              Back
            </button>
          </div>
          <div className="col-6 d-grid">
            {selectedBook.is_available ? (
              <button className="btn btn-primary" onClick={handleRent}>
                <FaCheck className="me-2" />
                Rent this Book
              </button>
            ) : (
              <button className="btn btn-success" onClick={handleReturn}>
                <FaUndo className="me-2" />
                Return this Book
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
