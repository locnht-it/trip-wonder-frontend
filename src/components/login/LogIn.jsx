import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen rounded-sm">
      {/* Phần hiển thị hình ảnh avatar */}
      <div className="flex-[3.5] flex items-center justify-center bg-gray-100 relative rounded-sm">
        <img
          src="https://i1-dulich.vnecdn.net/2023/07/11/taudem-9193-1689073967.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=4NsCCIysyUEIQJTwQ2Wsvg"
          alt="background"
          className="absolute w- h-full object-cover rounded-md" // Chiếm toàn bộ không gian
        />
      </div>
      {/* Phần form đăng nhập */}
      <div className="flex-[1.5] flex flex-col justify-center p-8 bg-white shadow-lg">
        <img
          src="./avatar.jpg"
          alt="Avatar"
          className="h-20 w-20 mx-auto object-cover rounded-md mb-10" // Chiếm toàn bộ không gian
        />
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
