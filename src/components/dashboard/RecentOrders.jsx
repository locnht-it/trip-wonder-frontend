import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getOrderStatus from "../../lib/utils/OrderStatus";
import { getTopFiveOrders } from "../../api/dashboardApi";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchTopFiveOrders = async () => {
      try {
        const response = await getTopFiveOrders();
        setOrders(response.data.content);
      } catch (error) {
        console.error("Error fetching top five orders:", error);
      }
    };

    fetchTopFiveOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Recent Orders</strong>
      <div className="mt-3">
        <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
          <thead>
            <tr>
              <td className="font-bold">ID</td>
              <td className="font-bold">Customer Name</td>
              <td className="font-bold">Order Date</td>
              <td className="font-bold">Order Total</td>
              <td className="font-bold">Order Status</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`/orders/${order.id}`}>#{order.id}</Link>
                </td>
                <td>{order.name}</td>
                <td>{formatDate(order.orderDate)}</td>
                <td>
                  {order.totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td>{getOrderStatus(order.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
