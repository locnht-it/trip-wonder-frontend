import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Dùng useNavigate và useParams

const TourUpdate = () => {
  const { tourId } = useParams(); // Lấy ID tour từ URL
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Fake data cho một tour cụ thể
  const fakeTourData = {
    id: 1,
    name: "Amazing Vietnam Tour",
    description:
      "Explore the beautiful landscapes and vibrant culture of Vietnam on this comprehensive tour. You'll visit famous landmarks, enjoy local cuisine, and experience the country's rich history.",
    shortDescription: "A wonderful tour of Vietnam's most iconic destinations.",
    price: 1200,
    startTime: "08:00 AM",
    endTime: "05:00 PM",
    date: "2024-10-05",
    status: "active",
    category: "Cultural",
    province: "Hanoi",
    supplier: "Travel Agency X",
    images: [], // Thêm field để lưu trữ ảnh
  };

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
    images: [], // Thêm field để lưu trữ ảnh
  });

  // Giả lập fetch dữ liệu
  useEffect(() => {
    if (tourId === fakeTourData.id.toString()) {
      setFormValues(fakeTourData);
    }
  }, [tourId]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Tour Data: ", formValues);
    // Logic để cập nhật tour (gọi API)
    alert("Tour details updated successfully!");
    navigate(`/tours/${tourId}`); // Điều hướng về trang chi tiết tour sau khi cập nhật
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => URL.createObjectURL(file));
    setFormValues({ ...formValues, images });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Update Tour</h1>
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

        {/* Display Selected Images */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Selected Images
          </label>
          <div className="flex flex-wrap">
            {formValues.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Selected ${index}`}
                className="h-20 w-20 object-cover mr-2 mb-2 border rounded"
              />
            ))}
          </div>
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
            Update Tour
          </button>
        </div>
      </form>

      {/* Back Button */}
    </div>
  );
};

export default TourUpdate;
