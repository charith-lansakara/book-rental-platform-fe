import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = (data) => {
    if (data.password !== data.password_confirmation) {
      toast.error('Passwords do not match.');
      return;
    }

    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        toast.success('Account created successfully! You can now log in.');
        navigate('/login');
      })
      .catch((err) => {
        if (err.errors) {
          const errorMessages = Object.values(err.errors).flat().join(' ');
          toast.error(errorMessages);
        } else {
          toast.error(err.message || 'Something went wrong.');
        }
      });
  };

  useEffect(() => {
    document.title = 'Register | Book Rental System';
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '500px' }}>
        <div className="text-center mb-4">
          <FaUserPlus size={60} className="text-success mb-2" />
          <h3>Create Your Account</h3>
          <p className="text-muted">Join the Book Rental community today!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label className="form-label">
              Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>

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
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Password must contain uppercase, lowercase, number, and special character',
                  },
                })}
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

          <div className="mb-3">
            <label className="form-label">
              Confirm Password <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                type={showConfirm ? 'text' : 'password'}
                className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                {...register('password_confirmation', { required: 'Please confirm your password' })}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowConfirm(!showConfirm)}
                tabIndex={-1}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password_confirmation && (
              <div className="invalid-feedback d-block">{errors.password_confirmation.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label">Role</label>
            <input
              type="text"
              className="form-control"
              value="user"
              disabled
              {...register('role')}
            />
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
