const initialData = {
  user: null,
};
const authReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'STORE_USER':
      return (state = action.payload);
    case 'LOGOUT_USER':
      return (state = {});
    default:
      return state;
  }
};

export default authReducer;
