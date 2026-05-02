import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/admin/Dashboard';
import User from './pages/admin/user/User';
import UpdateUser from './pages/admin/user/UpdateUser';
import CreateUser from './pages/admin/user/CreateUser';
import MasterObjectType from './pages/admin/master-object-types/MasterObjectType';
import CreateMasterObjectType from './pages/admin/master-object-types/CreateMasterObjectType';
import UpdateMasterObjectType from './pages/admin/master-object-types/UpdateMasterObjectType';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/users' element={<User />} />
      <Route path='/dashboard/users/create' element={<CreateUser />} />
      <Route path='/dashboard/users/:id' element={<UpdateUser />} />
      <Route path='/dashboard/master-object-types' element={<MasterObjectType />} />
      <Route path='/dashboard/master-object-types/create' element={<CreateMasterObjectType />} />
      <Route path='/dashboard/master-object-types/update/:id' element={<UpdateMasterObjectType />} />
    </Routes>
  );
}

export default App;