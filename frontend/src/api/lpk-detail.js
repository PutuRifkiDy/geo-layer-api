import { fetchWithToken } from "./user";

const BASE_URL = 'http://localhost:4000';

export async function getLpkDetails(pointObjectId) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/lpk-details/${pointObjectId}`, {
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

export async function deleteLpkDetail(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/lpk-details/${id}`, {
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

export async function createLpkDetail(data, pointObjectId) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/lpk-details/${pointObjectId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseJson = await response.json();
    if (responseJson.status == 'berhasil') {
      return responseJson;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getLpkDetailById(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/lpk-details/detail/${id}`, {
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

export async function updateLpkDetail(id, data) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/lpk-details/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const responseJson = await response.json();
    if (responseJson.status == 'berhasil') {
      return responseJson;
    }
  } catch (error) {
    console.log(error);
  }
}