import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        toast.success('Account created successfully! You can now log in.');
        navigate('/login');
      })
      .catch((err) => {
        toast.error(err.message || 'Registration failed.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center mb-4">
          <FaUserPlus size={60} className="text-success mb-2" />
          <h3>Create Your Account</h3>
          <p className="text-muted">Join the Book Rental community today!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label>Name</label>
            <input type="text" className="form-control" {...register('name', { required: 'Name is required' })} />
            {errors.name && <small className="text-danger">{errors.name.message}</small>}
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input type="email" className="form-control" {...register('email', { required: 'Email is required' })} />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" {...register('password', { required: 'Password is required' })} />
            {errors.password && <small className="text-danger">{errors.password.message}</small>}
          </div>

          <div className="mb-3">
            <label>Confirm Password</label>
            <input type="password" className="form-control" {...register('password_confirmation', { required: 'Please confirm your password' })} />
            {errors.password_confirmation && <small className="text-danger">{errors.password_confirmation.message}</small>}
          </div>

          <div className="mb-4">
            <label>Role</label>
            <input type="text" className="form-control" value="user" disabled {...register('role')} />
          </div>

          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4 mb-0">
          Already have an account?{' '}
          <Link to="/login" className="text-decoration-none fw-semibold text-primary">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
