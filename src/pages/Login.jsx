import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => {
        toast.success('Login successful!');
        navigate('/');
      })
      .catch((err) => {
        toast.error(err.message || 'Invalid credentials');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <FaUserCircle size={60} className="text-primary mb-2" />
          <h3>Welcome Back!</h3>
          <p className="text-muted">Login to your Book Rental account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-4 mb-0">
          Not registered?{' '}
          <Link to="/register" className="text-decoration-none fw-semibold text-primary">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
