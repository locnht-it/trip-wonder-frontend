import React, { useState, useEffect } from "react";
import axios from "axios"; // Sử dụng axios để gọi API
import { useNavigate } from "react-router-dom";

const AddNewTour = () => {
  const navigate = useNavigate();

  // State để giữ các giá trị của form
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    shortDescription: "",
    price: "",
    startTime: "",
    endTime: "",
    date: "",
    status: "",
    category: "",
    province: "",
    supplier: "",
    images: [], // Thêm state để lưu trữ danh sách ảnh
  });

  // State để giữ danh sách từ API
  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null); // Quản lý trạng thái upload file

  // Sử dụng useEffect để lấy dữ liệu từ API khi component được mount
  // useEffect(() => {
  //   // Giả lập việc gọi API để lấy dữ liệu cho các trường
  //   axios
  //     .get("/api/categories")
  //     .then((response) => setCategories(response.data));
  //   axios.get("/api/provinces").then((response) => setProvinces(response.data));
  //   axios.get("/api/suppliers").then((response) => setSuppliers(response.data));
  // }, []);

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formValues);
    // Thêm logic để gửi dữ liệu (ví dụ: gọi API)
  };

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Xử lý thay đổi khi chọn ảnh
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormValues({ ...formValues, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Xử lý khi người dùng chọn file để upload ngay lập tức
  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        setUploadStatus("Uploading...");
        // Gửi file lên server qua API
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

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
      {/* Tiêu đề và nút Upload Excel */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Tour</h1>
        {/* Nút chọn file Excel nằm bên phải */}
        <div>
          <label className="relative inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded-lg cursor-pointer hover:bg-blue-600">
            Upload File
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
          {uploadStatus && (
            <p className="mt-2 text-sm text-gray-600">{uploadStatus}</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            placeholder="Enter tour name"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            placeholder="Enter tour description"
            required
          />
        </div>

        {/* Short Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Short Description
          </label>
          <input
            type="text"
            name="shortDescription"
            value={formValues.shortDescription}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            placeholder="Enter short description"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formValues.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Start Time */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Start Time
          </label>
          <input
            type="time"
            name="startTime"
            value={formValues.startTime}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            required
          />
        </div>

        {/* End Time */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            End Time
          </label>
          <input
            type="time"
            name="endTime"
            value={formValues.endTime}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            required
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formValues.date}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            required
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Status</label>
          <select
            name="status"
            value={formValues.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            name="category"
            value={formValues.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Province */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Province
          </label>
          <select
            name="province"
            value={formValues.province}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            required
          >
            <option value="">Select province</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        {/* Supplier */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Supplier
          </label>
          <select
            name="supplier"
            value={formValues.supplier}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            required
          >
            <option value="">Select supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Images */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Image Previews
            </label>
            <div className="grid grid-cols-3 gap-4">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Selected preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          </div>
        )}

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
            Add New Tour
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewTour;
