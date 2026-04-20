import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const response = await registerUser({ username, email, password });

    if (response.status === 'berhasil') {
      setSuccessMsg('Akun berhasil dibuat! Mengalihkan ke halaman login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setErrorMsg(response.message || 'Gagal mendaftar, periksa kembali data Anda.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      
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
          
          {/* popup */}
          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-sm text-red-700 font-medium">{errorMsg}</p>
            </div>
          )}
          {successMsg && (
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-md">
              <p className="text-sm text-emerald-700 font-medium">{successMsg}</p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={handleUsernameChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all duration-200"
                placeholder="Rifskii"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all duration-200"
                placeholder="puturifki56@gmail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Mendaftarkan...' : 'Create Account'}
          </button>
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