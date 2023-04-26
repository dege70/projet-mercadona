import { API_BASE_URL, requestOptions } from "./api";

export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    ...requestOptions,
    method: "POST",
    body: new URLSearchParams({
      'username': username,
      'password': password
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const { token } = await response.json();
  localStorage.setItem("token", token);
  return true;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const useAuth = () => {
  return {
    login,
    logout,
    isLoggedIn,
    getToken,
  };
};
