import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded); // Kiểm tra token đã được giải mã
        setUser(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = async (login, password) => {
    console.log("Sending data to API:", { login, password });

    // API: Login
    const response = await fetch(
      "https://tripwonder.onrender.com/api/v1/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({ login, password }),
      }
    );

    if (!response.ok) {
      console.error("Response Status:", response.status); // Log mã lỗi nếu có
      const errorData = await response.json(); // Lấy dữ liệu lỗi từ phản hồi
      console.error("API Error Message:", errorData); // Log thông tin lỗi từ API
      throw new Error(errorData.messages[0]?.content || "Login failed");
    }

    const data = await response.json(); // Trích xuất dữ liệu JSON từ phản hồi
    console.log("Response Data:", data); // Log dữ liệu phản hồi để kiểm tra
    setAuthToken(data.content.token); // Lưu token vào localStorage
    setUserDetails(data.content.userDTO);
    console.log(`>>> Check userDetails: `, getUserDetails());
    console.log("Token: ", getAuthToken());
    const decoded = jwtDecode(data.content.token);
    console.log("Decoded: ", decoded);
    setUser(decoded);
    return data.content.userDTO.role;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const setAuthToken = (token) => {
  window.localStorage.setItem("auth_token", token);
};

export const setUserDetails = (userDetails) => {
  window.localStorage.setItem("user", JSON.stringify(userDetails));
};

export const getUserDetails = () => {
  const userDetails = window.localStorage.getItem("user");
  return userDetails ? JSON.parse(userDetails) : null;
};

export function useAuth() {
  return useContext(AuthContext);
}
