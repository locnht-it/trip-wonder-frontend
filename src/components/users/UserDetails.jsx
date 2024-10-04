import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDetails = ({ accountId }) => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  // Fake data cho account
  const fakeAccountData = {
    id: 1,
    avatar: "https://via.placeholder.com/150",
    fullName: "John Doe",
    address: "123 Street, City",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    dob: "1990-01-01",
    role: "ADMIN",
    gender: "Male",
    status: "active", // active or inactive
  };

  // Giả lập fetch dữ liệu
  useEffect(() => {
    setAccount(fakeAccountData); // Giả lập fetch data từ API
  }, [accountId]);

  const handleToggleStatus = () => {
    // Logic để chuyển đổi trạng thái account
    const newStatus = account.status === "active" ? "inactive" : "active";
    setAccount({ ...account, status: newStatus });
    alert(
      `Account status has been updated to ${
        newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
      }!`
    );
  };

  if (!account) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Account Details</h1>

      {/* Avatar */}
      <div className="mb-6 text-center">
        <img
          src={account.avatar}
          alt="Avatar"
          className="w-32 h-32 object-cover rounded-full mx-auto"
        />
      </div>

      {/* Full Name */}
      <div className="mb-4 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">Full Name</label>
        <p className="text-lg">{account.fullName}</p>
      </div>

      {/* Address */}
      <div className="mb-4 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">Address</label>
        <p className="text-lg">{account.address}</p>
      </div>

      {/* Email */}
      <div className="mb-4 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">Email</label>
        <p className="text-lg">{account.email}</p>
      </div>

      {/* Phone */}
      <div className="mb-4 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">Phone</label>
        <p className="text-lg">{account.phone}</p>
      </div>

      {/* Date of Birth */}
      <div className="mb-4 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">
          Date of Birth
        </label>
        <p className="text-lg">{new Date(account.dob).toLocaleDateString()}</p>
      </div>

      {/* Role */}
      <div className="mb-4 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">Role</label>
        <p className="text-lg">{account.role}</p>
      </div>

      {/* Gender */}
      <div className="mb-4 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">Gender</label>
        <p className="text-lg">{account.gender}</p>
      </div>

      {/* Status */}
      <div className="mb-4 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">Status</label>
        <p className="text-lg">
          {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className={`px-6 py-2 rounded focus:outline-none bg-gray-500 text-white hover:bg-gray-600 focus:outline-none"`}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          className={`px-6 py-2 rounded focus:outline-none ${
            account.status === "active"
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
          onClick={handleToggleStatus}
        >
          {account.status === "active" ? "Inactive" : "Active"}
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
