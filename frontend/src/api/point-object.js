import { fetchWithToken } from "./user";

const BASE_URL = 'http://localhost:4000';

export async function getPointObjects() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/points`, {
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

export async function deletePointObject(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/points/${id}`, {
      method: 'DELETE',
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

export async function createPointObject(data) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/points`, {
      method: 'POST',
      body: JSON.stringify(data),
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

export async function getPointObjectById(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/points/${id}`, {
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

export async function updatePointObject(id, data) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/points/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
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