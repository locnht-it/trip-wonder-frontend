import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserAddNew = () => {
  const [avatar, setAvatar] = useState(null);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [gender, setGender] = useState("Male");

  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0])); // Hiển thị ảnh avatar đã chọn
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic submit form (ví dụ gửi dữ liệu đến server API)
    const accountData = {
      avatar,
      fullName,
      address,
      email,
      phone,
      password,
      dob,
      role,
      gender,
    };
    console.log(accountData); // Kiểm tra dữ liệu trên console
    alert("Account has been created successfully!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">
        Create New Account
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Chọn Avatar */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
          {avatar && (
            <div className="mt-4">
              <img
                src={avatar}
                alt="Avatar Preview"
                className="w-32 h-32 object-cover rounded-full"
              />
            </div>
          )}
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="MANAGER">MANAGER</option>
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
            Add New Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAddNew;
