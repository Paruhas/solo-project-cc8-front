const tokenName = "token"
// const roleName = "role"

export const setToken = (token) => {
  return localStorage.setItem(tokenName, token)
};

// export const setRole= (role) => {
//   return localStorage.setItem(roleName, role)
// };

export const getToken = (token) => {
  return localStorage.getItem(tokenName)
};

export const removeToken = (token) => {
  return localStorage.removeItem(tokenName)
};
