import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Giả sử bạn sử dụng axios để gọi API

// Giả sử bạn có một hàm lấy thông tin người dùng theo id
const fetchUserData = async (id) => {
  // Thay thế bằng gọi API thực tế
  return {
    fullName: "Ngo Huynh Tan Loc",
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

// Giả sử có hàm update thông tin người dùng
const updateUserProfile = async (id, data) => {
  // Gọi API để cập nhật dữ liệu
  // Thay thế bằng API thực tế
  console.log("Cập nhật thông tin:", data);
};

const ProfileUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    avatar: "",
  });
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserData(id);
      setUserData(data);
      setAvatarPreview(data.avatar); // Hiển thị ảnh avatar hiện tại
    };
    loadUserData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData({ ...userData, avatar: file });
      setAvatarPreview(URL.createObjectURL(file)); // Hiển thị ảnh mới được chọn
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserProfile(id, userData);
    navigate(`/profile/${id}`); // Điều hướng trở lại trang profile sau khi cập nhật
  };

  const handleCancel = () => {
    navigate(`/profile/${id}`); // Quay lại trang profile mà không lưu thay đổi
  };

  return (
    <div className="flex items-center justify-center p-10 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Update Profile
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Avatar */}
          <div className="flex items-center mb-6">
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-32 h-32 rounded-full border border-gray-300"
            />
            <div className="ml-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="py-2 px-3 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={userData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            {/* Nút "Add New Tour" */}
            <button
              type="submit"
              className="mt-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none font-bold"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
