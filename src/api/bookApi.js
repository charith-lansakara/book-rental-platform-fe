import axiosClient from './axiosClient';

export const getBookSummary = () => {
  return axiosClient.get('/books/summary');
};
