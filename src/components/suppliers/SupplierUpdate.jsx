import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSupplier = () => {
  const { id } = useParams(); // Lấy ID của supplier từ URL
  const navigate = useNavigate();

  // State quản lý thông tin của supplier
  const [supplier, setSupplier] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    status: "Active", // Mặc định là Active
  });

  // Giả sử bạn có một hàm để lấy chi tiết supplier theo id
  useEffect(() => {
    // Giả lập gọi API hoặc lấy dữ liệu từ server
    const fetchSupplier = async () => {
      // Ví dụ data giả lập
      const data = {
        id,
        name: `VietTravel`,
        contactEmail: `viettravel@gmail.com`,
        contactPhone: `0911000001`,
        address: `Ho Chi Minh City`,
        status: `Active`,
      };
      setSupplier(data);
    };
    fetchSupplier();
  }, [id]);

  // Xử lý khi form thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({
      ...supplier,
      [name]: value,
    });
  };

  // Xử lý cập nhật supplier
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi yêu cầu cập nhật đến server
    console.log("Updated supplier:", supplier);
    // Điều hướng về trang quản lý nhà cung cấp sau khi cập nhật
    navigate("/suppliers");
  };

  // Xử lý quay lại trang trước đó
  const handleBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Tiêu đề Update Supplier ở giữa */}
      <h2 className="text-2xl font-bold text-center mb-6">Update Supplier</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={supplier.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={supplier.contactEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Contact Phone</label>
          <input
            type="text"
            name="contactPhone"
            value={supplier.contactPhone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Address</label>
          <input
            type="text"
            name="address"
            value={supplier.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Status</label>
          <select
            name="status"
            value={supplier.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="px-6 py-2 bg-gray-500 text-white font-bold rounded hover:bg-gray-700"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
          >
            Update Supplier
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSupplier;
