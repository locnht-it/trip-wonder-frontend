import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen">
      {/* Phần hiển thị hình ảnh avatar */}
      <div className="flex-[3.5] flex items-center justify-center bg-gray-100 relative">
        <img
          src="./avatar.jpg"
          alt="Avatar"
          className="absolute inset-0 w-full h-full object-cover" // Chiếm toàn bộ không gian
        />
      </div>
      {/* Phần form đăng nhập */}
      <div className="flex-[1.5] flex flex-col justify-center p-8 bg-white shadow-lg">
        <h1 className="text-5xl font-bold text-center mb-3">Trip Wonder</h1>
        <h3 className="text-2xl font-semibold text-center mb-6">Go together</h3>
        <form className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Email:</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Please enter email"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Password:</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Please enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            onClick={() => navigate(`/`)}
          >
            Login
          </button>
          <a
            href="/change-password"
            className="text-blue-500 text-center block mt-2 hover:underline"
          >
            Forgot password?
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
