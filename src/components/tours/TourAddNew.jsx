import React, { useState, useEffect } from "react";
import axios from "axios"; // Sử dụng axios để gọi API
import { useNavigate } from "react-router-dom";
import { storage } from "../../lib/firebase/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { listCategories } from "../../api/categoryApi";
import { listProvinces } from "../../api/provinceApi";
import { listSuppliers } from "../../api/supplierApi";
import { createTour } from "../../api/tourApi";
import { getUserDetails } from "../auth/AuthContext";
import { toast } from "react-toastify";

const AddNewTour = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    shortDescription: "",
    price: "",
    startTime: "",
    endTime: "",
    attendance: "",
    status: "",
    category: "",
    province: "",
    supplier: "",
    images: [],
    rating: "",
    locations: [],
  });

  // State for additional inputs
  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [images, setImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [user, setUser] = useState();

  // Fetch options on mount
  useEffect(() => {
    setUser(getUserDetails());
    listCategories(1, 1000)
      .then((response) => setCategories(response.data.content))
      .catch((error) => console.error("Error fetching categories:", error));
    listProvinces(1, 1000)
      .then((response) => setProvinces(response.data.content))
      .catch((error) => console.error("Error fetching provinces:", error));
    listSuppliers(0, 1000)
      .then((response) => setSuppliers(response.data.content.content))
      .catch((error) => console.error("Error fetching suppliers:", error));
  }, []);

  // Handle input changes for form values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle locations
  const handleLocationChange = (index, event) => {
    const { name, value } = event.target;
    const newLocations = [...formValues.locations];
    newLocations[index] = { ...newLocations[index], [name]: value };
    setFormValues({ ...formValues, locations: newLocations });
  };

  const addLocation = () => {
    setFormValues({
      ...formValues,
      locations: [
        ...formValues.locations,
        {
          name: "",
          startTime: "",
          endTime: "",
          facilitate: "",
          latitude: "",
          longitude: "",
        },
      ],
    });
  };

  const removeLocation = (index) => {
    const newLocations = formValues.locations.filter((_, i) => i !== index);
    setFormValues({ ...formValues, locations: newLocations });
  };

  // Handle image uploads
  const handleImagesChange = (e) => {
    const files = e.target.files;
    const urls = [];

    Array.from(files).forEach((file) => {
      const imageRef = ref(storage, `images/${file.name + v4()}`);
      uploadBytes(imageRef, file)
        .then(() => getDownloadURL(imageRef))
        .then((url) => urls.push(url))
        .catch((error) => {
          console.error("Error uploading image:", error);
          alert("Failed to upload image");
        });
    });

    setImages(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tourData = {
      ...formValues,
      price: Number(formValues.price),
      attendance: Number(formValues.attendance),
      status: formValues.status === "active",
      categoryId: Number(formValues.category),
      provinceId: Number(formValues.province),
      ratingReviews: Number(formValues.rating),
      galleries: images,
      supplierId: formValues.supplier,
      staffId: user?.userId,
    };

    try {
      await createTour(tourData);
      navigate("/tours");
      toast.success("Tour created successfully!");
    } catch (error) {
      console.error("Error creating tour:", error);
      toast.error("Failed to create tour.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
      {/* Tiêu đề và nút Upload Excel */}

      <h1 className="text-2xl font-bold text-center mb-3">Add New Tour</h1>

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

        {/* Attendance */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Attendance
          </label>
          <input
            type="number"
            name="attendance"
            value={formValues.attendance}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            placeholder="Enter attendance"
            required
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
            type="datetime-local"
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
            type="datetime-local"
            name="endTime"
            value={formValues.endTime}
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

        {/* Rating */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Rating (1: bad - 5: very good)
          </label>
          <input
            type="number"
            name="rating"
            value={formValues.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            placeholder="Enter rating (1-5)"
            required
          />
        </div>

        {/* Images */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* Image Previews */}
        {images.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Image Previews
            </label>
            <div className="grid grid-cols-3 gap-4">
              {images.map((preview, index) => (
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

        {/* Locations */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Locations
          </label>
          {formValues.locations.map((location, index) => (
            <div key={index} className="mb-4 border p-4 rounded bg-gray-100">
              <h2 className="text-lg font-semibold mb-2">
                Location {index + 1}
              </h2>
              <input
                type="text"
                name="name"
                value={location.name}
                onChange={(e) => handleLocationChange(index, e)}
                placeholder="Enter location name"
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="datetime-local"
                name="startTime"
                value={location.startTime}
                onChange={(e) => handleLocationChange(index, e)}
                placeholder="Start Time"
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="datetime-local"
                name="endTime"
                value={location.endTime}
                onChange={(e) => handleLocationChange(index, e)}
                placeholder="End Time"
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="facilitate"
                value={location.facilitate}
                onChange={(e) => handleLocationChange(index, e)}
                placeholder="Enter facilitate"
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                name="latitude"
                value={location.latitude}
                onChange={(e) => handleLocationChange(index, e)}
                placeholder="Latitude"
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                name="longitude"
                value={location.longitude}
                onChange={(e) => handleLocationChange(index, e)}
                placeholder="Longitude"
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
                required
              />
              <button
                type="button"
                className="text-red-600 mt-2"
                onClick={() => removeLocation(index)}
              >
                Remove Location
              </button>
            </div>
          ))}
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded"
            onClick={addLocation}
          >
            Add Location
          </button>
        </div>

        {/* Submit */}
        <div className="flex justify-between">
          <button
            type="button"
            className="px-6 py-2 bg-gray-500 text-white font-bold rounded hover:bg-gray-700"
            onClick={() => navigate("/tours")}
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700"
          >
            Add New Tour
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewTour;
