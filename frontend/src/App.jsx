import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/admin/Dashboard';
import User from './pages/admin/user/User';
import UpdateUser from './pages/admin/user/UpdateUser';
import CreateUser from './pages/admin/user/CreateUser';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/users' element={<User />} />
      <Route path='/dashboard/users/create' element={<CreateUser />} />
      <Route path='/dashboard/users/:id' element={<UpdateUser />} />
    </Routes>
  );
}

export default App;