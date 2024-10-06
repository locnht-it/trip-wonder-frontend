import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Thêm axios để gửi request

const SupplierAddNew = () => {
  const navigate = useNavigate();

  // State quản lý thông tin của supplier
  const [supplier, setSupplier] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    status: "Active", // Mặc định là Active
  });

  // State quản lý file Excel
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null); // Để quản lý trạng thái upload file

  // Xử lý khi form thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({
      ...supplier,
      [name]: value,
    });
  };

  // Xử lý khi file Excel được chọn
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Lưu file vào state

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        setUploadStatus("Uploading...");
        // Gửi file lên server
        await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setUploadStatus("Upload successful!");
      } catch (error) {
        console.error("Error uploading file:", error);
        setUploadStatus("Upload failed.");
      }
    }
  };

  // Xử lý tạo mới supplier
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu tạo mới đến server
      await axios.post("/api/suppliers", supplier);
      console.log("New supplier:", supplier);

      // Điều hướng về trang quản lý nhà cung cấp sau khi tạo mới
      navigate("/suppliers");
    } catch (error) {
      console.error("Error creating supplier:", error);
    }
  };

  // Xử lý quay lại trang trước đó
  const handleBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Tiêu đề Create Supplier ở giữa */}
      <div className="flex justify-between items-center mb-6 w-full">
        <h2 className="text-2xl font-bold">Create Supplier</h2>

        {/* Nút chọn file Excel nằm bên phải */}
        <div>
          <label className="relative inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded-lg cursor-pointer hover:bg-blue-600">
            Upload File
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
          {uploadStatus && (
            <p className="mt-2 text-sm text-gray-600">{uploadStatus}</p>
          )}
        </div>
      </div>

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
            className="px-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700"
          >
            Create Supplier
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierAddNew;
