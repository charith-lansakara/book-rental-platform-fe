import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

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

  useEffect(() => {
    document.title = 'Login | Book Rental System';
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <FaUserCircle size={60} className="text-primary mb-2" />
          <h3>Welcome Back!</h3>
          <p className="text-muted">Login to your Book Rental account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label className="form-label">
              Email address <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                {...register('password', { required: 'Password is required' })}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <div className="invalid-feedback d-block">{errors.password.message}</div>}
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
