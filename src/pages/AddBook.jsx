import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../features/books/bookSlice';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaListUl, FaPlus } from 'react-icons/fa';
import { useEffect } from 'react';

function AddBook() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.books);

  const onSubmit = (data) => {
    dispatch(addBook(data))
      .unwrap()
      .then(() => {
        toast.success('Book added successfully!');
        reset();
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to add book.');
      });
  };

  useEffect(() => {
      document.title = 'Add Book | Book Rental App';
    }, []);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
      <div className="card shadow p-4 w-100" style={{ maxWidth: '600px' }}>
        <h3 className="mb-4 text-center" style={{ color: '#0a1c4b' }}>Add New Book</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label className="form-label">
              Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">
              Author <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.author ? 'is-invalid' : ''}`}
              {...register('author', { required: 'Author is required' })}
            />
            {errors.author && <div className="invalid-feedback">{errors.author.message}</div>}
          </div>

          <div className="mb-4">
            <label className="form-label">
              Published Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className={`form-control ${errors.published_date ? 'is-invalid' : ''}`}
              {...register('published_date', { required: 'Published date is required' })}
            />
            {errors.published_date && <div className="invalid-feedback">{errors.published_date.message}</div>}
          </div>

          <div className="d-grid mb-3">
            <div className="row">
            <div className="col-6 d-grid">
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                <FaArrowLeft className="me-2" />
                Back
              </button>
            </div>
            <div className="col-6 d-grid">
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Adding...' : 'Add Book'}
              </button>
            </div>
          </div>
          </div>
        </form>

        
      </div>
    </div>
  );
}

export default AddBook;
