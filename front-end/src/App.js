import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Products from './pages/product/Products';
import Register from './pages/register/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer">
        <Route path="products" element={ <Products /> } />
      </Route>
    </Routes>
  );
}

export default App;
