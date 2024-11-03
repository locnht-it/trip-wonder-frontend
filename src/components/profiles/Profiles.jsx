import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../auth/AuthContext"; // Lấy từ localStorage
import getUserRole from "../../lib/utils/UserRole";

const ProfilePage = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = getUserDetails(); // Parse JSON từ localStorage
      setUserData(storedUser);
      console.log(
        `>>> Check userDetails from localStorage in ProfilePage: `,
        storedUser
      );
    };

    fetchUserData(); // Lấy thông tin user từ localStorage khi component mount
  }, [id]); // Cập nhật khi id thay đổi

  const handleUpdate = () => {
    navigate(`/profiles/edit/${id}`); // Chuyển hướng tới trang chỉnh sửa thông tin với id
  };

  const handleChangePassword = () => {
    navigate(`/change-password`); // Chuyển hướng tới trang thay đổi mật khẩu
  };

  const handleBack = () => {
    navigate(`/`); // Quay lại trang trước đó
  };

  // Nếu dữ liệu người dùng chưa được tải, hiển thị loading
  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-10 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Profile Information
        </h1>
        <div className="flex items-center mb-6">
          <img
            src={userData.image}
            alt="Avatar"
            className="w-32 h-32 rounded-full border border-gray-300"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {userData.fullname}
            </h2>
            <p className="text-gray-600">{getUserRole(userData.role)}</p>
          </div>
        </div>
        <div className="mb-4">
          <strong className="text-gray-800">Email:</strong>
          <p className="text-gray-600">{userData.email}</p>
        </div>
        <div className="mb-4">
          <strong className="text-gray-800">Phone:</strong>
          <p className="text-gray-600">{userData.phone}</p>
        </div>
        <div className="mb-4">
          <strong className="text-gray-800">Address:</strong>
          <p className="text-gray-600">{userData.address}</p>
        </div>
        <div className="mb-4">
          <strong className="text-gray-800">Gender:</strong>
          <p className="text-gray-600">{userData.gender}</p>
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 mr-2"
          >
            Update Information
          </button>
          <button
            onClick={handleChangePassword}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-300"
          >
            Change Password
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
