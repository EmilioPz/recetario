import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import BuscarRecetas from './pages/BuscarRecetas';
import AgregarRecetas from './pages/AgregarRecetas';
import DetalleReceta from './pages/DetalleReceta';
import Login from './pages/Login';

function PrivateRoute({ children }) {
  const isAuth = localStorage.getItem('isAuthenticated');
  return isAuth ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/buscar"
          element={
            <PrivateRoute>
              <BuscarRecetas />
            </PrivateRoute>
          }
        />
        <Route
          path="/agregar"
          element={
            <PrivateRoute>
              <AgregarRecetas />
            </PrivateRoute>
          }
        />
        <Route
          path="/receta/:id"
          element={
            <PrivateRoute>
              <DetalleReceta />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}