import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../auth/AuthContext";
import { changePassword } from "../../api/userApi";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  // Kiểm tra email và password trước khi gọi changePassword
  const handleUpdatePassword = async () => {
    const user = getUserDetails(); // Lấy thông tin người dùng từ localStorage
    const email = user?.email;

    if (!email) {
      setError("User email not found. Please log in again.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
    } else {
      try {
        setLoading(true); // Bắt đầu quá trình nạp
        // Truyền trực tiếp email và password vào hàm changePassword
        const success = await changePassword(email, newPassword);
        if (success) {
          setError("");
          toast.success("Change password successfully!");
          navigate(`/login`);
        } else {
          setError("Failed to update password. Please try again.");
        }
      } catch (error) {
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false); // Kết thúc quá trình nạp
      }
    }
  };

  // Hàm xử lý quay lại trang trước
  const handleBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <div className="flex items-center justify-center pt-20">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Change Password
        </h1>
        <h2 className="text-lg text-gray-700 font-semibold mb-4">
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

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="px-6 py-2 bg-gray-500 text-white font-bold rounded hover:bg-gray-700"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            onClick={handleUpdatePassword}
            disabled={loading} // Disable button when loading
            className={`${
              loading
                ? "bg-gray-500"
                : "px-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700"
            } text-white px-4 py-2 rounded transition duration-300`}
          >
            {loading ? "Changing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
