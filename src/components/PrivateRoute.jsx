import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';

function PrivateRoute({ children, allowedRoles }) {
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <ErrorPage code={403} />;
  }

  return children;
}

export default PrivateRoute;
