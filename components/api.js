const BASE_URL = 'https://reward-shop-5465dcfe62ca.herokuapp.com';

export const getData = async route => {
  const response = await fetch(BASE_URL + route);
  const resData = await response.json();
  return resData;
};
export const getAdminData = async (route, token) => {
  const response = await fetch(BASE_URL + route, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const resData = await response.json();
  return resData;
};
export const postData = async (route, data, token) => {
  const response = await fetch(BASE_URL + route, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  const resData = await response.json();
  return resData;
};
export const auth = async (route, data) => {
  const response = await fetch(BASE_URL + route, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  });
  const resData = await response.json();
  return resData;
};

export const updateData = async (route, data, token) => {
  const response = await fetch(BASE_URL + route, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  const resData = await response.json();
  return resData;
};

export const deleteData = async (route, token) => {
  const response = await fetch(BASE_URL + route, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const resData = await response.json();
  return resData;
};
