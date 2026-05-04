import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/admin/Dashboard';
import User from './pages/admin/user/User';
import UpdateUser from './pages/admin/user/UpdateUser';
import CreateUser from './pages/admin/user/CreateUser';
import MasterObjectType from './pages/admin/master-object-type/MasterObjectType';
import CreateMasterObjectType from './pages/admin/master-object-type/CreateMasterObjectType';
import UpdateMasterObjectType from './pages/admin/master-object-type/UpdateMasterObjectType';
import PointObject from './pages/admin/point-object/PointObject';
import CreatePointObject from './pages/admin/point-object/CreatePointObject';
import UpdatePointObject from './pages/admin/point-object/UpdatePointObject';
import LpkDetail from './pages/admin/lpk-detail/LpkDetail';
import CreateLpkDetail from './pages/admin/lpk-detail/CreateLpkDetail';
import UpdateLpkDetail from './pages/admin/lpk-detail/UpdateLpkDetail';

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
      <Route path='/dashboard/point-objects' element={<PointObject />} />
      <Route path='/dashboard/point-objects/create' element={<CreatePointObject />} />
      <Route path='/dashboard/point-objects/update/:id' element={<UpdatePointObject />} />
      <Route path='/dashboard/lpk-details/:pointObjectId' element={<LpkDetail />} />
      <Route path='/dashboard/lpk-details/create/:pointObjectId' element={<CreateLpkDetail />} />
      <Route path='/dashboard/lpk-details/update/:id' element={<UpdateLpkDetail />} />
    </Routes>
  );
}

export default App;