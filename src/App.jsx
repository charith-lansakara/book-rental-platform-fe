import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import LoadingOverlay from './components/LoadingOverlay';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';

function App() {
  const { loading } = useSelector((state) => state.books);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/books"
            element={
              <PrivateRoute>
                <BookList />
              </PrivateRoute>
            }
          />

          <Route
            path="/add-book"
            element={
              <PrivateRoute>
                <AddBook />
              </PrivateRoute>
            }
          />

          <Route
            path="/books/:id"
            element={
              <PrivateRoute>
                <BookDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="*"
            element={
              <PrivateRoute>
                <ErrorPage />
              </PrivateRoute>
            }
          />

          {/* Test Error pages */}
          {/* <Route path="/unauthorized" element={<ErrorPage code={401} />} />
          <Route path="/forbidden" element={<ErrorPage code={403} />} />
          <Route path="/server-error" element={<ErrorPage code={500} />} /> */}
        </Routes>

        {loading && <LoadingOverlay />}
        <ToastContainer />
      </Layout>
    </Router>
  );
}

export default App;
