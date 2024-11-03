import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSupplier } from "../../api/supplierApi";

const SupplierAddNew = () => {
  const navigate = useNavigate();

  // State to manage supplier information
  const [supplier, setSupplier] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    status: "Active", // Default to Active
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({
      ...supplier,
      [name]: value,
    });
  };

  // Handle form submission to create a new supplier
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert status from string to boolean
      const supplierToCreate = {
        ...supplier,
        status: supplier.status === "Active" ? true : false,
      };

      // Call the API to create a new supplier
      await createSupplier(supplierToCreate);
      console.log("New supplier created:", supplierToCreate);

      // Navigate back to the suppliers page after successful creation
      navigate("/suppliers");
    } catch (error) {
      console.error("Error creating supplier:", error);
      alert("Failed to create supplier. Please try again.");
    }
  };

  // Handle back button click
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center">Add New Supplier</h2>

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
            Add New Supplier
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierAddNew;
