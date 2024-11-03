import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSupplierById, updateSupplier } from "../../api/supplierApi";
import { toast } from "react-toastify";

const UpdateSupplier = () => {
  const { id } = useParams(); // Get the supplier ID from the URL
  const navigate = useNavigate();

  // State to manage supplier details
  const [supplier, setSupplier] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    status: "Active", // Default status
  });

  // Fetch supplier data by ID on component mount
  useEffect(() => {
    const fetchSupplierDetails = async () => {
      const response = await getSupplierById(id);
      console.log(`>>> Check response from API getSupplierById: `, response);
      const fetchedsupplier = response.data.content;
      if (fetchedsupplier) {
        // Convert boolean status to "active"/"inactive"
        const statusString = fetchedsupplier.status ? "Active" : "Inactive";

        // Set the supplier data with the modified status
        setSupplier({ ...fetchedsupplier, status: statusString });
        console.log(
          `>>> Check supplier from Supplier Details: `,
          fetchedsupplier
        );
      } else {
        alert("Failed to load supplier details");
        navigate("/suppliers"); // Redirect to suppliers page if fetch fails
      }
    };

    fetchSupplierDetails();
  }, [id, navigate]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({
      ...supplier,
      [name]: value,
    });
  };

  // Handle supplier update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert status from string to boolean before sending to the API
      const updatedSupplier = {
        ...supplier,
        id, // Include supplier ID in the payload
        status: supplier.status === "Active" ? true : false, // Convert back to boolean
      };

      // Call the update API
      await updateSupplier(updatedSupplier);
      console.log("Updated supplier:", updatedSupplier);
      toast.success("Supplier updated successfully");
      // Navigate back to supplier details or list after update
      navigate(`/suppliers/${id}`);
    } catch (error) {
      console.error("Error updating supplier:", error);
      alert("Failed to update supplier. Please try again.");
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Update Supplier title */}
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
