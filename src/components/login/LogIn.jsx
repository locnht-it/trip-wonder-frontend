import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { toast } from "react-toastify"; // Import toast
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icon

const Login = () => {
  const [data, setData] = useState({
    login: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn gửi form mặc định
    console.log(data);
    if (!data.login || !data.password) {
      toast.error("Please enter both email and password"); // Hiển thị thông báo lỗi
      return;
    }

    try {
      const roles = await login(data.login, data.password);
      console.log(roles);
      if (roles.includes("ADMIN") || roles.includes("STAFF")) {
        navigate("/");
      } else {
        toast.error("You Don’t Currently Have Permission to Access"); // Hiển thị thông báo lỗi nếu vai trò không hợp lệ
      }
    } catch (error) {
      toast.error("Login failed. Invalid email or password."); // Hiển thị thông báo lỗi khi đăng nhập thất bại
    }
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value, // Đảm bảo giá trị được cập nhật đúng
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Đổi trạng thái hiển thị mật khẩu
  };

  return (
    <div className="flex h-screen rounded-sm">
      {/* Phần hiển thị hình ảnh avatar */}
      <div className="flex-[3.5] flex items-center justify-center bg-gray-100 relative rounded-sm">
        <img
          src="https://i1-dulich.vnecdn.net/2023/07/11/taudem-9193-1689073967.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=4NsCCIysyUEIQJTwQ2Wsvg"
          alt="background"
          className="absolute w-full h-full object-cover rounded-md"
        />
      </div>
      {/* Phần form đăng nhập */}
      <div className="flex-[1.5] flex flex-col justify-center p-8 bg-white shadow-lg">
        <img
          src="./avatar.jpg"
          alt="Avatar"
          className="h-20 w-20 mx-auto object-cover rounded-md mb-10"
        />
        <h1 className="text-5xl font-bold text-center mb-3">Trip Wonder</h1>
        <h3 className="text-2xl font-semibold text-center mb-6">Go together</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-1">Email:</label>
            <input
              type="text"
              name="login"
              value={data.login} // Điều khiển giá trị nhập vào
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Please enter email"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Hiển thị hoặc ẩn mật khẩu
                name="password"
                value={data.password} // Điều khiển giá trị nhập vào
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Please enter password"
                required
              />
              {/* Icon mắt để hiển thị/ẩn mật khẩu */}
              <span
                className="absolute right-2 top-2 cursor-pointer items-center pt-1"
                onClick={toggleShowPassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
          >
            Login
          </button>
          {/* <a
            href="/change-password"
            className="text-blue-500 text-center block mt-2 hover:underline"
          >
            Forgot password?
          </a> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
