import { getAccessToken } from "./auth";

const BASE_URL = 'http://localhost:4000';

export async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    }
  });
}

export async function getObjectTypes() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/object-types`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseJson = await response.json();
    if (responseJson.status == 'berhasil') {
      return responseJson;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createObjectType(formData) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/object-types`, {
      method: 'POST',
      body: formData
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

export async function deleteObjectType(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/object-types/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
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

export async function getObjectTypeById(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/object-types/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseJson = await response.json();
    if (responseJson.status == 'berhasil') {
      return responseJson;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateObjectType(id, formData) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/object-types/${id}`, {
      method: 'PUT',
      body: formData
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