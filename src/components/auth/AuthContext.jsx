import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
    const response = await fetch("http://localhost:8080/api/v1/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify({ login, password }),
    });

    if (!response.ok) {
      console.error("Response Status:", response.status); // Log mã lỗi nếu có
      const errorData = await response.json(); // Lấy dữ liệu lỗi từ phản hồi
      console.error("API Error Message:", errorData); // Log thông tin lỗi từ API
      throw new Error(errorData.messages[0]?.content || "Login failed");
    }

    const data = await response.json(); // Trích xuất dữ liệu JSON từ phản hồi
    console.log("Response Data:", data); // Log dữ liệu phản hồi để kiểm tra
    localStorage.setItem("token", data.content.token); // Lưu token vào localStorage
    console.log("Token: " + localStorage.getItem("token"));
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

export function useAuth() {
  return useContext(AuthContext);
}
