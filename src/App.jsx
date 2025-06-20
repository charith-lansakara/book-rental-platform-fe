import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import LoadingOverlay from './components/LoadingOverlay';

function App() {
  const { loading } = useSelector((state) => state.books);

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Book List</Link> | <Link to="/add-book">Add New Book</Link>
        </nav>

        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>

        {loading && <LoadingOverlay />}

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
