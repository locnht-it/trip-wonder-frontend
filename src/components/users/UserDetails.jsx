import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getUserById, changeStatusUser } from "../../api/userApi"; // Import API changeStatusUser
import getUserRole from "../../lib/utils/UserRole";
import getUserStatus from "../../lib/utils/UserStatus";
import { toast } from "react-toastify";

const UserDetails = () => {
  const { id } = useParams(); // Lấy accountId từ URL
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  // Fetch data từ API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id); // Gọi API getUserById
        setAccount({ ...response.data.content, status: status }); // Giả sử API trả về đối tượng người dùng
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data");
      }
    };

    fetchUser();
  }, [id, status]);

  const handleToggleStatus = async () => {
    const newStatus = account.status === "Active" ? "Inactive" : "Active";
    try {
      // Gọi API changeStatusUser để cập nhật trạng thái người dùng
      const response = await changeStatusUser(id);
      // Kiểm tra phản hồi từ API
      if (response.data.content === true) {
        // Nếu content là true, trạng thái là Inactive
        setAccount({ ...account, status: "Inactive" });
        toast.success("Account status has been updated to Inactive!");
      } else if (response.data.content === false) {
        // Nếu content là false, trạng thái là Active
        setAccount({ ...account, status: "Active" });
        toast.success("Account status has been updated to Active!");
      } else {
        toast.error("Unexpected response from the API.");
      }

      // Cập nhật URL với tham số status mới
      navigate({
        pathname: location.pathname, // Giữ nguyên đường dẫn hiện tại
        search: `?status=${newStatus}`, // Cập nhật tham số status
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status");
    }
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
          src={account.image}
          alt="Avatar"
          className="w-32 h-32 object-cover rounded-full mx-auto"
        />
      </div>

      {/* Full Name */}
      <div className="mb-4 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">Full Name</label>
        <p className="text-lg">{account.fullname}</p>
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
        <p className="text-lg">{account.phoneNumber}</p>
      </div>

      {/* Role */}
      <div className="mb-4 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">Role</label>
        <p className="text-lg">{getUserRole(account.role)}</p>
      </div>

      {/* Gender */}
      <div className="mb-4 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">Gender</label>
        <p className="text-lg">{account.gender}</p>
      </div>

      {/* Status */}
      <div className="mb-4 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">Status</label>
        <p className="text-lg">{getUserStatus(account.status)}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-2 rounded focus:outline-none bg-gray-500 text-white hover:bg-gray-600"
          onClick={() => navigate("/users")}
        >
          Back
        </button>
        <button
          className={`px-6 py-2 rounded focus:outline-none ${
            account.status === "Active"
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
          onClick={handleToggleStatus}
        >
          {account.status === "Active" ? "Inactive" : "Active"}
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
