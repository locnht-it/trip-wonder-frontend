import React, { useState } from "react";
import axios from "axios"; // Giả sử bạn sử dụng axios để gọi API
import { useParams, useNavigate } from "react-router-dom";

// Giả sử bạn có hàm gửi OTP qua email
const sendOtpToEmail = async (email) => {
  // Gọi API gửi OTP qua email
  console.log("Sending OTP to:", email);
  return true; // Thay thế bằng API thực tế
};

// Giả sử có hàm kiểm tra OTP
const verifyOtp = async (email, otp) => {
  // Gọi API để kiểm tra OTP
  console.log("Verifying OTP:", otp);
  return otp === "12345"; // Thay thế bằng API thực tế
};

// Giả sử có hàm thay đổi mật khẩu
const updatePassword = async (email, newPassword) => {
  // Gọi API để cập nhật mật khẩu
  console.log("Updating password for:", email);
  return true; // Thay thế bằng API thực tế
};

const ChangePassword = () => {
  const { id } = useParams(); // Giả sử có ID của user (nếu cần)
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // Bước 1: Nhập email, Bước 2: Nhập OTP, Bước 3: Nhập mật khẩu mới
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Xử lý khi người dùng nhấn nút gửi email để nhận OTP
  const handleSendOtp = async () => {
    if (email) {
      const success = await sendOtpToEmail(email);
      if (success) {
        setStep(2); // Chuyển sang bước 2: Nhập OTP
        setError("");
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } else {
      setError("Please enter your email.");
    }
  };

  // Xử lý khi người dùng nhấn nút xác minh OTP
  const handleVerifyOtp = async () => {
    if (otp) {
      const isValid = await verifyOtp(email, otp);
      if (isValid) {
        setStep(3); // Chuyển sang bước 3: Nhập mật khẩu mới
        setError("");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } else {
      setError("Please enter the OTP.");
    }
  };

  // Xử lý khi người dùng nhấn nút cập nhật mật khẩu
  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
    } else {
      const success = await updatePassword(email, newPassword);
      if (success) {
        setError("");
        navigate(`/profile/${id}`); // Điều hướng về trang profile sau khi đổi mật khẩu thành công
      } else {
        setError("Failed to update password. Please try again.");
      }
    }
  };

  // Xử lý nút quay lại
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1); // Quay lại bước trước
      setError(""); // Xóa thông báo lỗi khi quay lại
    } else {
      navigate(-1); // Quay lại trang profile nếu đang ở bước đầu tiên
    }
  };

  return (
    <div className="flex items-center justify-center pt-20">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Change Password
        </h1>

        {step === 1 && (
          <div>
            <h2 className="text-lg text-gray-700 mb-4">Enter your email</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
              placeholder="Your email address"
              required
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Back
              </button>
              <button
                onClick={handleSendOtp}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Send OTP
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg text-gray-700 mb-4">
              Enter the OTP sent to your email
            </h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
              placeholder="OTP code"
              required
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Back
              </button>
              <button
                onClick={handleVerifyOtp}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Verify OTP
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg text-gray-700 mb-4">
              Enter your new password
            </h2>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
              placeholder="New password"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
              placeholder="Confirm new password"
              required
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Back
              </button>
              <button
                onClick={handleUpdatePassword}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
              >
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
