import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function ErrorPage({ code = 404, message }) {
  // Define default messages for known error codes
  const errorMessages = {
    401: 'Unauthorized access. Please login first.',
    403: 'Access denied. You don’t have permission to view this page.',
    404: 'Oops! The page you’re looking for could not be found.',
    500: 'Something went wrong on our server. Please try again later.',
    503: 'Service temporarily unavailable. Please check back soon.',
  };

  // Define image paths for specific error codes
  const errorImages = {
    401: '/error/401.png',
    403: '/error/403.png',
    404: '/error/404.png',
    500: '/error/500.png',
    503: '/error/503.png',
  };

  // Use a custom message or fallback to defaults
  const displayMessage = message || errorMessages[code] || 'An unexpected error occurred.';
  const errorImage = errorImages[code] || '/images/default-error.png';

  useEffect(() => {
        document.title = 'Error | Book Rental App'; 
      }, []);

  return (
    <div className="text-center mt-5">
      <img
        src={errorImage}
        alt={`Error ${code}`}
        style={{ maxWidth: '300px' }}
        className="mb-4"
      />
      <h1 className="display-1">{code}</h1>
      <p className="lead mb-4">{displayMessage}</p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
}

export default ErrorPage;
