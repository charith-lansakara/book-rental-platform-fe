import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

// Get all books (with optional ?author=)
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (params = '', { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/books${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get single book by ID
export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add new book
export const addBook = createAsyncThunk(
  'books/addBook',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/books', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Rent a book
export const rentBook = createAsyncThunk(
  'books/rentBook',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/books/${id}/rent`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Return a book
export const returnBook = createAsyncThunk(
  'books/returnBook',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/books/${id}/return`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice definition
const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    selectedBook: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBook = action.payload.data; 
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.data.push(action.payload); 
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(rentBook.fulfilled, (state, action) => {
        state.books.data = state.books.data.map((book) =>
          book.id === action.payload.book.id ? action.payload.book : book
        );
      })

      .addCase(returnBook.fulfilled, (state, action) => {
        state.books.data = state.books.data.map((book) =>
          book.id === action.payload.book.id ? action.payload.book : book
        );
      });
  },
});

export const { clearSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;
