"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { signIn } from "../helpers/api.function";
import { jwtDecode } from "jwt-decode";
import { getUserDetails } from "../helpers/api.function";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token != undefined) {
      getUserDetailsHandler(token);
    } else {
      setUser(null);
    }
  }, []);

  const getUserDetailsHandler = async (token) => {
    const data = await getUserDetails({ token });
    const jsonData = await data.json();
    if (jsonData.responseStatus.isError) {
      setUser(null);
      return;
    }
    setUser(jsonData?.responseBody?.userDetails);
  };

  const handleLogin = async (credentials) => {
    const resp = await signIn(credentials);
    const data = await resp.json();
    const { responseBody, responseStatus } = data;
    try {
      if (responseStatus.isError) {
        throw responseStatus.message;
      }

      if (responseBody.token) {
        getUserDetailsHandler(responseBody.token);
        sessionStorage.setItem("token", responseBody.token);
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
    // authService.logout();
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
