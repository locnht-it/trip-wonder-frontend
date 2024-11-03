import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updateCategory } from "../../api/categoryApi"; // Import API function
import { toast } from "react-toastify";

const CategoryUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize state
  const [category, setCategory] = useState({
    name: "",
    status: "Active", // Default value for status
  });

  useEffect(() => {
    // Check if state is passed
    if (location.state && location.state.category) {
      setCategory(location.state.category);
    } else {
      console.error("No category data found.");
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call update API
      await updateCategory(id, category); // Pass category data to API
      console.log("Updated Category:", category);
      toast.success("Updated Category Successfully!");
      navigate(`/category`); // Redirect to category list
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Update Category</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
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
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryUpdate;
