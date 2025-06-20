import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage({ code = 404, message = 'Page not found.' }) {
  return (
    <div className="text-center mt-5">
      <h1 className="display-1">{code}</h1>
      <p className="lead">{message}</p>
      <Link to="/" className="btn btn-primary mt-3">Go to Home</Link>
    </div>
  );
}

export default ErrorPage;
