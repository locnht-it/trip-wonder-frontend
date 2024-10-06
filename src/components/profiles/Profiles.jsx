import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Giả sử bạn có một hàm lấy thông tin người dùng theo id (thay thế bằng hàm thực tế)
const fetchUserData = async (id) => {
  // Thay thế với gọi API thực tế để lấy thông tin người dùng
  // Dưới đây là dữ liệu mẫu
  return {
    fullName: "Ngo Huynh Tan loc",
    address: "Ho Chi Minh City",
    email: "locnht.it@example.com",
    phone: "0901234567",
    role: "Admin", // hoặc "Admin"
    dateOfBirth: "2003-11-23",
    avatar:
      "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/378014342_1996203014082143_1181191835414672378_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=eU22345q1bEQ7kNvgFhHzdL&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AQOREiXq4t1NgtD7S31-dMa&oh=00_AYBWWuhtEwOJwsRI2CyMGhBt9twXMbX_pTf3I-YerXEBFQ&oe=6705890A", // Thay thế bằng URL hình ảnh thực tế
    gender: "Male", // Có thể là "Male", "Female", "Others"
  };
};

const ProfilePage = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserData(id); // Gọi hàm lấy dữ liệu người dùng
      setUserData(data);
    };
    loadUserData();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/profiles/edit/${id}`); // Chuyển hướng tới trang chỉnh sửa thông tin với id
  };

  const handleChangePassword = () => {
    navigate(`/change-password`); // Chuyển hướng tới trang thay đổi mật khẩu với id
  };

  const handleBack = () => {
    navigate(-1); // Quay lại trang trước đó
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
            src={userData.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full border border-gray-300"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {userData.fullName}
            </h2>
            <p className="text-gray-600">{userData.role}</p>
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
          <strong className="text-gray-800">Date of Birth:</strong>
          <p className="text-gray-600">{userData.dateOfBirth}</p>
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
