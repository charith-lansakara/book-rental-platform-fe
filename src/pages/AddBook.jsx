import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../features/books/bookSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Title</label>
          <input type="text" className="form-control" {...register('title', { required: 'Title is required' })} />
          {errors.title && <small className="text-danger">{errors.title.message}</small>}
        </div>

        <div className="mb-3">
          <label>Author</label>
          <input type="text" className="form-control" {...register('author', { required: 'Author is required' })} />
          {errors.author && <small className="text-danger">{errors.author.message}</small>}
        </div>

        <div className="mb-3">
          <label>Published Date</label>
          <input type="date" className="form-control" {...register('published_date', { required: 'Published date is required' })} />
          {errors.published_date && <small className="text-danger">{errors.published_date.message}</small>}
        </div>

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
}

export default AddBook;