import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getOrderStatus from "../../lib/utils/OrderStatus";
import { getAllOrders } from "../../api/orderApi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Start from 1 for the UI
  const [pageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  const fetchOrders = async (currentPage) => {
    setLoading(true); // Đặt loading về true mỗi khi bắt đầu fetch
    try {
      const response = await getAllOrders(currentPage - 1, pageSize);
      const data = response.data.content.content;

      console.log(`>>> Check data response of API getAllOrders: `, data);

      setOrders(data);
      const totalItems = response.data.content.totalElements;
      setTotalCount(totalItems);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false); // Đặt loading về false sau khi fetch xong
    }
  };

  useEffect(() => {
    fetchOrders(page); // Gọi API mỗi khi `page` thay đổi
  }, [page]);

  const totalPages = Math.ceil(totalCount / pageSize);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (totalCount === 0) return <div>No orders available.</div>;

  const handlePageChange = (newPage) => {
    // Kiểm tra xem newPage có khác với page hiện tại hay không
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      console.log("Current Page:", page, "New Page:", newPage);
      setPage(newPage); // Chỉ cập nhật page
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleOrderDetail = (id) => {
    navigate(`/orders/${id}`);
  };

  return (
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <strong className="text-gray-700 font-medium text-4xl text-center block pb-10">
          Order Management
        </strong>
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                ID
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Customer Name
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Order Date
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Order Total
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Order Status
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody class="bg-white">
            {orders.map((order) => (
              <tr>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div class="text-sm leading-5 text-gray-800">
                    <Link to={`/orders/${order.orderId}`}>
                      #{order.orderId}
                    </Link>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  <Link to={`/users/${order.userId}`}>{order.userName}</Link>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {formatDate(order.orderDate)}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {order.totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                  {getOrderStatus(order.orderStatus)}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                  <button
                    class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                    onClick={() => handleOrderDetail(order.orderId)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="ml-auto mt-5 flex justify-end">
          {totalPages > 0 && (
            <nav className="relative z-0 inline-flex shadow-sm -space-x-px">
              {/* Previous button */}
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

              {/* Page numbers */}
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

              {/* Next button */}
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

export default Orders;
