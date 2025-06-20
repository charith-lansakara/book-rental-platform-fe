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
        <div>
          <label>Title:</label>
          <input type="text" {...register('title', { required: 'Title is required' })} />
          {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
        </div>

        <div>
          <label>Author:</label>
          <input type="text" {...register('author', { required: 'Author is required' })} />
          {errors.author && <p style={{ color: 'red' }}>{errors.author.message}</p>}
        </div>

        <div>
          <label>Published Date:</label>
          <input type="date" {...register('published_date', { required: 'Published date is required' })} />
          {errors.published_date && <p style={{ color: 'red' }}>{errors.published_date.message}</p>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
}

export default AddBook;
