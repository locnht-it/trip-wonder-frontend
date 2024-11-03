import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateProvince } from "../../api/provinceApi";
import { toast } from "react-toastify";

const ProvinceUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize state
  const [province, setProvince] = useState({
    name: "",
    status: "Active", // Default value for status
  });

  useEffect(() => {
    // Check if state is passed
    if (location.state && location.state.province) {
      setProvince(location.state.province);
    } else {
      console.error("No province data found.");
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProvince({
      ...province,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call update API
      await updateProvince(id, province); // Pass province data to API
      console.log("Updated Province:", province);
      toast.success("Updated Province Successfully!");
      navigate(`/provinces`); // Redirect to province list
    } catch (error) {
      console.error("Failed to update province:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Update Province</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={province.name}
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
            Update Province
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProvinceUpdate;
