const BASE_URL = 'http://localhost:4000';

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function putAccessToken(token) {
  return localStorage.setItem('accessToken', token);
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function putRefreshToken(token) {
  return localStorage.setItem('refreshToken', token);
}

export function removeTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export async function registerUser({ username, email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
    return {
      status: 'gagal',
      message: 'Sistem kami mengalami error'
    }
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { status: 'gagal', message: 'Gagal terhubung ke server' };
  }
}