import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProvince } from "../../api/provinceApi";
import { toast } from "react-toastify";

const ProvinceAddNew = () => {
  const [province, setProvince] = useState({
    name: "",
  });

  const [error, setError] = useState(null); // Handle any errors
  const navigate = useNavigate();

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
      console.log(`>>> Check province new before call api: `, province);
      const newProvince = await createProvince(province); // Call the API
      console.log(`>>> Check new province: `, newProvince);
      toast.success("Province created successfully!");
      navigate("/provinces"); // Redirect to category list
    } catch (err) {
      console.error("Failed to create province:", err);
      setError(
        "An error occurred while creating the category. Please try again."
      ); // Handle error
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Province</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
            className="px-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700"
          >
            Add New Province
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProvinceAddNew;
