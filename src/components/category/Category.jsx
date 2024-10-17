import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listCategories } from "../../api/categoryApi"; // Import the listCategories function
import getCategoryStatus from "../../lib/utils/CategoryStatus";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Added for pagination, if needed
  const [limit, setLimit] = useState(10); // Set limit of items per page
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await listCategories(page, limit); // Call the API function
      const data = response.data.content;
      console.log(`>>> Check data: `, response);
      // Set the status to Active if delete is false, and Inactive if delete is true
      const updatedCategories = data.map((category) => ({
        ...category,
        status: category.delete ? "Inactive" : "Active",
      }));
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, limit]); // Fetch categories when page or limit changes

  const handleCategoryAddNew = () => {
    navigate("/category/save");
  };

  const handleCategoryUpdate = (id) => {
    navigate(`/category/update/${id}`);
  };

  const handleToggleStatus = (id) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id
          ? {
              ...category,
              status: category.status === "Active" ? "Inactive" : "Active",
            }
          : category
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <strong className="text-gray-700 font-medium text-4xl text-center block pb-7">
          Category Management
        </strong>
        <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans pb-5">
          <button
            class="px-10 py-2 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-700 hover:text-white focus:outline-none ml-auto font-bold"
            onClick={handleCategoryAddNew}
          >
            Add New Category
          </button>
        </div>
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                ID
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Name
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Status
              </th>
              <th class="px-2 py-3 border-b-2 border-gray-300"></th>
              <th class="px-2 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody class="bg-white">
            {categories.map((category) => (
              <tr key={category.id}>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div class="text-sm leading-5 text-blue-500">
                    #{category.id}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div class="text-sm leading-5 text-blue-900">
                    {category.name}
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                  {getCategoryStatus(category.status)}
                </td>
                <td class="px-2 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                  <button
                    class={`px-2 py-2 border ${
                      category.status === "Active"
                        ? "border-red-500 text-red-500 hover:bg-red-700"
                        : "border-green-500 text-green-500 hover:bg-green-700"
                    } rounded transition duration-300 hover:text-white focus:outline-none`}
                    onClick={() => handleToggleStatus(category.id)}
                  >
                    {category.status === "Active"
                      ? "Set Inactive"
                      : "Set Active"}
                  </button>
                </td>
                <td class="px-2 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                  <div class="flex justify-end space-x-2">
                    <button
                      class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                      onClick={() => handleCategoryUpdate(category.id)}
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination here */}
      </div>
    </div>
  );
};

export default Category;
