import { getAccessToken } from "./auth";

const BASE_URL = 'http://localhost:4000';

export async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

export async function getUsers() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();
    if (responseJson.status == 'berhasil') {
      return responseJson;
    }
  } catch (error) {
    console.log("error ambil data user:", error);
  }
}

export async function deleteUser(userId) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();
    console.log(responseJson);
    if (responseJson.status == 'berhasil') {
      return responseJson;
    }
  } catch (error) {
    console.log("error hapus data user:", error);
  }
}

export async function getUserById(userId) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();
    if (responseJson.status == 'berhasil') {
      return responseJson;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserById(userId, { username, email, role }) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, role })
    });

    const responseJson = await response.json();
    if (responseJson.status == 'berhasil') {
      return responseJson;
    }
  } catch (error) {
    console.log(error);
  }
}