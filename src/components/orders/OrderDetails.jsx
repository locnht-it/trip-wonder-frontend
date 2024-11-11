import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderDetail } from "../../api/orderApi";
import getOrderStatus from "../../lib/utils/OrderStatus";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await getOrderDetail(id);
        const data = response.data.content;

        // Map dữ liệu từ API sang state order
        const formattedOrder = {
          orderId: data.id,
          totalPrice: data.totalPrice,
          orderDate: data.orderDate,
          customerName: data.user.fullname,
          customerId: data.user.userId,
          status: data.status,
          paymentDate: data.paymentDate,
          paymentMethod: data.paymentMethod,
          tours: data.orderDetails.map((detail) => ({
            tourId: detail.packageId,
            tourName: detail.packageName,
            unitPrice: detail.packagePrice,
            quantity: detail.quantity,
          })),
        };

        setOrder(formattedOrder);
      } catch (error) {
        console.error("Failed to fetch order detail:", error);
      }
    };

    fetchOrderDetail();
  }, [id]);

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
          <p className="text-lg">
            <Link to={`/users/${order.customerId}`}>{order.customerName}</Link>
          </p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Order Date
          </label>
          <p className="text-lg">{formatDate(order.orderDate)}</p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Payment Date
          </label>
          <p className="text-lg">{formatDate(order.paymentDate)}</p>
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
          <p className="text-lg">
            {order.totalPrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Status</label>
          <p className="text-lg">{getOrderStatus(order.status)}</p>
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
                <div className="text-lg text-blue-900">
                  <Link to={`/tours/${tour.tourId}`}>{tour.tourName}</Link>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Unit Price
                </label>
                <p className="text-lg">
                  {tour.unitPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
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

      <div className="flex justify-between">
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => navigate("/orders")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
