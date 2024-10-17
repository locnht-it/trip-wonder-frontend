import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storage } from "../../lib/firebase/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { editProfile } from "../../api/userApi"; // API để cập nhật hồ sơ người dùng
import { getUserDetails, setUserDetails } from "../auth/AuthContext";

const ProfileUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Lấy userDetails từ localStorage
    const storedUserDetails = getUserDetails();
    if (storedUserDetails) {
      console.log(`>>> Check userDetails from ProfileUpdate: `, userData);
      setUserData(storedUserDetails);
    } else {
      // Nếu không có dữ liệu trong localStorage, điều hướng người dùng ra ngoài
      toast.error("User details not found");
      navigate("/login");
    }
  }, [id, navigate]);

  const validate = () => {
    let tempErrors = {};
    if (!userData.fullname.trim())
      tempErrors.fullName = "Full Name is required";
    if (!userData.phone) tempErrors.phone = "Phone is required";
    else if (!/^\d{10,11}$/.test(userData.phone))
      tempErrors.phone = "Invalid phone number (10-11 digits)";
    if (!userData.address) tempErrors.address = "Address is required";
    if (!userData.gender) tempErrors.gender = "Gender is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageRef = ref(storage, `images/${file.name + v4()}`);
      uploadBytes(imageRef, file)
        .then(() => getDownloadURL(imageRef))
        .then((url) => {
          setImage(url);
          setUserData({ ...userData, image: url });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image");
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Cập nhật lại thông tin người dùng trong localStorage
    // Giữ lại các thông tin không thay đổi, cập nhật các trường mới
    const currentUserData = getUserDetails();
    if (
      currentUserData.image === userData.image &&
      currentUserData.fullname === userData.fullname &&
      currentUserData.phone === userData.phone &&
      currentUserData.address === userData.address
    ) {
      return; // Không gọi API nếu không có thay đổi
    }
    if (validate()) {
      try {
        // Chỉ lấy các trường cần thiết để gửi về API
        const updatedUserData = {
          id: Number.parseInt(id), // ID của người dùng
          fullname: userData.fullname, // Tên đầy đủ
          phone: userData.phone, // Số điện thoại
          address: userData.address, // Địa chỉ
          image: userData.image,
        };

        console.log(
          `>>> Check profile before call api editProfile: `,
          updatedUserData
        );

        // Gửi thông tin đã được chọn về API
        await editProfile(updatedUserData);
        toast.success("Profile updated successfully");

        setUserDetails({
          ...currentUserData, // Giữ các thông tin khác mà không bị thay đổi
          fullname: userData.fullname, // Cập nhật tên đầy đủ
          phone: userData.phone, // Cập nhật số điện thoại
          address: userData.address, // Cập nhật địa chỉ
          image: userData.image, // Nếu có avatar thì giữ nguyên
        });

        navigate(`/profiles/${id}`);
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      }
    }
  };

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
          Update Profile
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Avatar */}
          <div className="flex items-center mb-6">
            <img
              src={image || userData.image}
              alt="Avatar Preview"
              className="w-32 h-32 rounded-full border border-gray-300"
            />
            <div className="ml-4">
              <label className="block text-gray-700 font-medium mb-2">
                Avatar
              </label>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="py-2 px-3 border border-gray-300 rounded mb-5 mr-10"
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
              name="fullname"
              value={userData.fullname}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none`}
              required
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
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
              className={`w-full px-3 py-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none`}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
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
              className={`w-full px-3 py-2 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none`}
              required
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
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
