import React, { useState } from 'react';
import { Input, Button, message, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, putAccessToken, putRefreshToken } from '../../api/auth';

function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const error = (message) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await loginUser({ email, password });

    if (response.status === 'berhasil') {
      putAccessToken(response.data.accessToken);
      putRefreshToken(response.data.refreshToken);
      navigate('/dashboard');
    } else {
      error(response.message || 'Login gagal, periksa kredensial Anda.');
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
          <h2 className="mt-4 text-xl font-bold text-gray-800">Selamat Datang Kembali</h2>
          <p className="mt-2 text-sm text-gray-500">Silakan masuk ke akun Anda.</p>
        </div>

        {/* form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
              <Input
                id="email"
                name="email"
                type="text"
                required
                value={email}
                onChange={handleEmailChange}
                placeholder="puturifki@gmail.com"
                className='px-4 py-2'
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className='px-4 py-2'
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
          Belum punya akun?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;