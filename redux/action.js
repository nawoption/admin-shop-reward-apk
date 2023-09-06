export const storeUser = payload => {
  return {
    type: 'STORE_USER',
    payload: payload,
  };
};
export const logout = () => {
  return {
    type: 'LOGOUT_USER',
  };
};
