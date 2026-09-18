import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        {/* Catch-all redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
