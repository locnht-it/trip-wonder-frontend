import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import getSupplierStatus from "../../lib/utils/SupplierStatus";
import { deleteSupplier, getSupplierById } from "../../api/supplierApi";
import { toast } from "react-toastify";

const SupplierDetails = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const navigate = useNavigate();

  // Fetch supplier data by ID
  useEffect(() => {
    const fetchSupplier = async () => {
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

    fetchSupplier();
  }, [id, navigate]);

  const handleUpdate = () => {
    navigate(`/suppliers/update/${supplier.id}`);
  };

  const handleBack = () => {
    navigate(`/suppliers`);
  };

  const handleToggleStatus = async () => {
    if (!supplier) return;

    const newStatus = supplier.status === "Active" ? "Inactive" : "Active";

    try {
      const result = await deleteSupplier(id);
      if (result) {
        setSupplier({ ...supplier, status: newStatus });
        toast.success(`Supplier status has been updated to ${newStatus}!`);
      } else {
        alert("Failed to update supplier status");
      }
    } catch (error) {
      console.error("Error updating supplier status", error);
    }
  };

  if (!supplier) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Supplier Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <p className="text-lg">{supplier.name}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Contact Email
          </label>
          <p className="text-lg">{supplier.contactEmail}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Contact Phone
          </label>
          <p className="text-lg">{supplier.contactPhone}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Address</label>
          <p className="text-lg">{supplier.address}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Status</label>
          <p className="text-lg">{getSupplierStatus(supplier.status)}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Tour List</h2>
        <div className="border border-gray-300 p-3 rounded">
          {supplier.tours.map((tour, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 border-b border-gray-200 pb-4"
            >
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Tour Name
                </label>
                <p className="text-lg">
                  <div className="text-lg text-blue-900">
                    <Link to={`/tours/${tour.id}`}>{tour.name}</Link>
                  </div>
                </p>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Price
                </label>
                <p className="text-lg">{tour.price} USD</p>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Slot
                </label>
                <p className="text-lg">{tour.attendance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
          onClick={handleBack}
        >
          Back
        </button>

        <div className="space-x-4">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={handleUpdate}
          >
            Update
          </button>

          <button
            className={`px-6 py-2 rounded focus:outline-none ${
              supplier.status === "Active"
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
            onClick={handleToggleStatus}
          >
            {supplier.status === "Active" ? "Inactive" : "Active"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;
