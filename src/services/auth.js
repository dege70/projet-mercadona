import { requestOptions } from "./api";

export const baseUrl = process.env.REACT_APP_BASE_URL;

export const login = async (email, password) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    ...requestOptions,
    method: "POST",
    body: JSON.stringify({ email, password }),
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