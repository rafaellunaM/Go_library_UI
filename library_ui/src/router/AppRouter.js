import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import AddBook from '../components/AddBook';
import BooksList from '../components/BookList';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<BooksList />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
