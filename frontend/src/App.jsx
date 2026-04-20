import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/user/Login';
import Register from './pages/user/Register';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default App;