import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import BuscarRecetas from './pages/BuscarRecetas';
import AgregarRecetas from './pages/AgregarRecetas';
import DetalleReceta from './pages/DetalleReceta';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscar" element={<BuscarRecetas />} />
        <Route path="/agregar" element={<AgregarRecetas />} />
        <Route path="/receta/:id" element={<DetalleReceta />} />
      </Routes>
    </Router>
  );
}