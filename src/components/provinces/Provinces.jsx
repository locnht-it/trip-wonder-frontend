import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getProvinceStatus from "../../lib/utils/ProvinceStatus"; // Giả sử hàm này trả về "Active" hoặc "Inactive"
import {
  deleteProvince,
  getNumberProvinces,
  listProvinces,
} from "../../api/provinceApi";
import { toast } from "react-toastify";

const Provinces = () => {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  const fetchProvinces = async () => {
    try {
      const response = await listProvinces(page, limit);
      const response2 = await getNumberProvinces();
      const data = response.data.content;

      // Chuyển đổi từ boolean sang chuỗi "Active" hoặc "Inactive"
      const updatedProvinces = data.map((province) => ({
        ...province,
        status: province.status === true ? "Active" : "Inactive",
      }));

      setProvinces(updatedProvinces);
      const totalItems = response2.data.content;
      setTotalCount(totalItems);
    } catch (error) {
      console.error("Failed to fetch province:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, [page]);

  const handleProvinceAddNew = () => {
    navigate("/provinces/save");
  };

  const handleProvinceUpdate = (province) => {
    navigate(`/provinces/update/${province.id}`, { state: { province } });
  };

  const handleToggleStatus = async (id) => {
    const provinceToUpdate = provinces.find((province) => province.id === id);
    const newStatus = !provinceToUpdate.status; // Chuyển đổi trạng thái

    try {
      await deleteProvince(id); // Gọi API để xóa tỉnh
      toast.success("Change status successfully!");
      // Cập nhật trạng thái cục bộ sau khi gọi API
      setProvinces((prevProvinces) =>
        prevProvinces.map((province) =>
          province.id === id
            ? {
                ...province,
                status: newStatus,
              }
            : province
        )
      );
    } catch (error) {
      console.error("Failed to update province status:", error);
    }
  };

  const totalPages = Math.ceil(totalCount / limit);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (totalCount === 0) return <div>No provinces available.</div>;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <strong className="text-gray-700 font-medium text-4xl text-center block pb-7">
          Province Management
        </strong>
        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans pb-5">
          <button
            className="px-10 py-2 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-700 hover:text-white focus:outline-none ml-auto font-bold"
            onClick={handleProvinceAddNew}
          >
            Add New Province
          </button>
        </div>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Status
              </th>
              <th className="px-2 py-3 border-b-2 border-gray-300"></th>
              <th className="px-2 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {provinces.map((province) => (
              <tr key={province.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-500">
                    #{province.id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">
                    {province.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                  {getProvinceStatus(province.status ? "Active" : "Inactive")}{" "}
                  {/* Sử dụng hàm để hiển thị */}
                </td>
                <td className="px-2 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                  <button
                    className={`px-2 py-2 border ${
                      province.status
                        ? "border-red-500 text-red-500 hover:bg-red-700"
                        : "border-green-500 text-green-500 hover:bg-green-700"
                    } rounded transition duration-300 hover:text-white focus:outline-none`}
                    onClick={() => handleToggleStatus(province.id)}
                  >
                    {province.status ? "Set Inactive" : "Set Active"}
                  </button>
                </td>
                <td className="px-2 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                  <div className="flex justify-end space-x-2">
                    <button
                      className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                      onClick={() => handleProvinceUpdate(province)}
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="ml-auto mt-5 flex justify-end">
          {totalPages > 0 && (
            <nav className="relative z-0 inline-flex shadow-sm -space-x-px">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page - 1);
                }}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium ${
                  page === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:text-gray-400"
                } focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150`}
                disabled={page === 1}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageIndex = index + 1;
                const isNearCurrent = Math.abs(page - pageIndex) <= 2;
                const isFirst = pageIndex === 1;
                const isLast = pageIndex === totalPages;

                if (isFirst || isLast || isNearCurrent) {
                  return (
                    <button
                      key={pageIndex}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pageIndex);
                      }}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium ${
                        pageIndex === page
                          ? "text-blue-700 bg-blue-50"
                          : "text-gray-500 hover:bg-gray-100"
                      } focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150`}
                    >
                      {pageIndex}
                    </button>
                  );
                }

                if (isNearCurrent) return null;

                return (
                  <span
                    key={pageIndex}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500"
                  >
                    ...
                  </span>
                );
              })}

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page + 1);
                }}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium ${
                  page === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:text-gray-400"
                } focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150`}
                disabled={page === totalPages}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 5.293a1 1 0 011.414 0L12 9.586l-3.293 3.293a1 1 0 01-1.414-1.414L9.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Provinces;
