import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { loginUser, putAccessToken, putRefreshToken } from '../api/auth';
import { loginUser, putAccessToken, putRefreshToken } from '../../api/auth';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const response = await loginUser({
      email,
      password
    });

    if (response.status === 'berhasil') {
      putAccessToken(response.data.accessToken);
      putRefreshToken(response.data.refreshToken);
      navigate('/dashboard');
    } else {
      setErrorMsg(response.message || 'Login gagal, periksa kredensial Anda.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* left */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight">GeoLayer<span className="text-blue-300">API</span></h1>
          <p className="mt-4 text-lg text-indigo-100 max-w-md">
            Sistem pemetaan objek. Kelola titik lokasi, fasilitasi integrasi.
          </p>
        </div>
        <div className="relative z-10 text-sm text-indigo-200">
          &copy; {new Date().getFullYear()} GeoLayer System. All rights reserved.
        </div>
      </div>

      {/* Right */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Selamat Datang Kembali</h2>
            <p className="mt-2 text-sm text-gray-500">Silakan masukkan detail akun Anda untuk melanjutkan.</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <p className="text-sm text-red-700 font-medium">{errorMsg}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-none sm:text-sm transition-all duration-200"
                  placeholder="admin@gis.com"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-none sm:text-sm transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 rounded-xl shadow-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Memproses...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Belum punya akun?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 ]">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;