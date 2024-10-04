import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const OrderDetail = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(""); // Thêm state để lưu trạng thái hiện tại

  // Fake dữ liệu cho order chi tiết
  const fakeOrderData = {
    orderId: 1,
    totalPrice: 2400,
    orderDate: "2024-10-01",
    customerName: "Nam Lee",
    status: "Completed",
    paymentDate: "2024-10-02",
    paymentMethod: "Credit Card",
    tours: [
      {
        tourId: 1,
        tourName: "Amazing Vietnam Tour",
        unitPrice: 1200,
        quantity: 1,
      },
      {
        tourId: 2,
        tourName: "Explore the Mekong Delta",
        unitPrice: 600,
        quantity: 2,
      },
    ],
  };

  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setOrder(fakeOrderData);
    setStatus(fakeOrderData.status); // Khởi tạo trạng thái hiện tại của order
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value); // Cập nhật trạng thái khi chọn
  };

  const handleStatusUpdate = () => {
    // Giả lập cập nhật trạng thái (gửi request đến API trong thực tế)
    setOrder({ ...order, status });
    alert(`Order status has been updated to ${status}!`);
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Order Details</h1>

      {/* Thông tin chung về order */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Order ID</label>
          <p className="text-lg">{order.orderId}</p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Customer Name
          </label>
          <p className="text-lg">{order.customerName}</p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Order Date
          </label>
          <p className="text-lg">
            {new Date(order.orderDate).toLocaleDateString()}
          </p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Payment Date
          </label>
          <p className="text-lg">
            {new Date(order.paymentDate).toLocaleDateString()}
          </p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Payment Method
          </label>
          <p className="text-lg">{order.paymentMethod}</p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Total Price
          </label>
          <p className="text-lg">{order.totalPrice} USD</p>
        </div>

        {/* Trạng thái order với chức năng cập nhật */}
        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Status</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button
            onClick={handleStatusUpdate}
            className="mt-3 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Update Status
          </button>
        </div>
      </div>

      {/* Danh sách tour trong order */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Tour List</h2>
        <div className="border border-gray-300 p-3 rounded">
          {order.tours.map((tour, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 border-b border-gray-200 pb-4"
            >
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Tour Name
                </label>
                <p className="text-lg">
                  <div class="text-lg text-blue-900">
                    <Link to={`/tours/${tour.tourId}`}>{tour.tourName}</Link>
                  </div>
                </p>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Unit Price
                </label>
                <p className="text-lg">{tour.unitPrice} USD</p>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Quantity
                </label>
                <p className="text-lg">{tour.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nút Back */}
      <div className="flex justify-start">
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
