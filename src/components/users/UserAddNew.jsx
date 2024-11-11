import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../lib/firebase/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { createUser } from "../../api/userApi";
import { toast } from "react-toastify";

const UserAddNew = () => {
  const [image, setImage] = useState(null);
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male");

  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Tạo một tên file với UUID để đảm bảo là duy nhất
      const imageRef = ref(storage, `images/${file.name + v4()}`);

      // Upload file lên Firebase Storage
      uploadBytes(imageRef, file)
        .then(() => {
          // Khi upload thành công, lấy download URL của file đó
          return getDownloadURL(imageRef);
        })
        .then((url) => {
          // Cập nhật URL hình ảnh mới
          setImage(url);
          console.log(`Image uploaded url: `, url); // In ra URL của ảnh ngay lập tức
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          alert("Failed to upload image");
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic submit form (gửi dữ liệu tới server)
    const accountData = {
      image,
      fullname,
      address,
      email,
      phone,
      password,
      gender, // Không cần role nữa
    };
    console.log(`>>> Check user before call api createUser: `, accountData);
    createUser(accountData) // Gọi API createUser để tạo người dùng
      .then((response) => {
        toast.success("Account has been created successfully!");
        navigate("/users"); // Redirect đến trang users hoặc trang cần thiết sau khi tạo người dùng
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        alert("Failed to create user");
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Account</h1>

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
          {image && (
            <div className="mt-4">
              <img
                src={image}
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
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
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

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHERS">Others</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          {/* Nút "Add New User" */}
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
