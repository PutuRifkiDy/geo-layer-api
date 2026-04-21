import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth';
import { Button, Input, message, Space } from 'antd';

function Register() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const error = (message) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  }
  const success = (message) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await registerUser({ username, email, password });

    if (response.status === 'berhasil') {
      success('Akun berhasil dibuat! Mengalihkan ke halaman login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      error(response.message || 'Gagal mendaftar, periksa kembali data Anda.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {contextHolder}
      {/* card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 space-y-8">

        {/* logo */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            GeoLayer<span className="text-indigo-600">API</span>
          </h1>
          <h2 className="mt-4 text-xl font-bold text-gray-800">Buat Akun Baru</h2>
          <p className="mt-2 text-sm text-gray-500">Masukkan data diri untuk bergabung.</p>
        </div>

        {/* form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Username</label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={handleUsernameChange}
                className='px-2 py-2'
                placeholder='Masukkan username'
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
              <Input
                id="email"
                type="text"
                required
                value={email}
                onChange={handleEmailChange}
                placeholder='Masukkan email anda'
                className='px-2 py-2'
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
                placeholder='Masukkan password'
                className='px-2 py-2'
              />
            </div>
          </div>

          <Button
            htmlType='submit'
            type="primary"
            className='w-full px-2 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-600'>
            {isLoading ? 'Memproses...' : 'Sign In'}
          </Button>
        </form>

        {/* register */}
        <p className="text-center text-sm text-gray-600">
          Sudah memiliki akun?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;