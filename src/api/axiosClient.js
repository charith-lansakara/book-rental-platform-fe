import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Test Error pages
// axiosClient.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response) {
//       const status = error.response.status;
//       if (status === 401) window.location.href = '/unauthorized';
//       if (status === 403) window.location.href = '/forbidden';
//       if (status === 500) window.location.href = '/server-error';
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosClient;
