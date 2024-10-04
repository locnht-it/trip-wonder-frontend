import React from "react";
import { Link } from "react-router-dom";
import getOrderStatus from "../../lib/utils/OrderStatus";

const recentOrderData = [
  {
    id: `1`,
    tour_id: `4324`,
    customer_id: `10000`,
    customer_name: `NamLee`,
    order_date: `2024-09-09`,
    order_total: `$435.50`,
    current_order_status: `PENDING`,
    shipment_address: `Ho Chi Minh City`,
  },
  {
    id: `2`,
    tour_id: `4325`,
    customer_id: `10001`,
    customer_name: `HieuHa`,
    order_date: `2024-09-10`,
    order_total: `$500.50`,
    current_order_status: `PAID`,
    shipment_address: `Can Tho City`,
  },
  {
    id: `3`,
    tour_id: `4326`,
    customer_id: `10002`,
    customer_name: `MinhTa`,
    order_date: `2024-09-11`,
    order_total: `$600.50`,
    current_order_status: `PENDING`,
    shipment_address: `Ho Chi Minh City`,
  },
  {
    id: `4`,
    tour_id: `4327`,
    customer_id: `10003`,
    customer_name: `NamLee`,
    order_date: `2024-09-09`,
    order_total: `$435.50`,
    current_order_status: `PAID`,
    shipment_address: `Khanh Hoa`,
  },
  {
    id: `5`,
    tour_id: `4328`,
    customer_id: `10004`,
    customer_name: `TrungBui`,
    order_date: `2024-09-20`,
    order_total: `$1000.50`,
    current_order_status: `PENDING`,
    shipment_address: `Hai Phong City`,
  },
];

const RecentOrders = () => {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Recent Orders</strong>
      <div className="mt-3">
        <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
          <thead>
            <tr>
              <td>ID</td>
              <td>Tour ID</td>
              <td>Customer Name</td>
              <td>Order Date</td>
              <td>Order Total</td>
              <td>Address</td>
              <td>Order Status</td>
            </tr>
          </thead>
          <tbody>
            {recentOrderData.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`/orders/${order.id}`}>#{order.id}</Link>
                </td>
                <td>
                  <Link to={`/tours/${order.tour_id}`}>{order.tour_id}</Link>
                </td>
                <td>
                  <Link to={`/users/${order.customer_id}`}>
                    {order.customer_name}
                  </Link>
                </td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>{order.order_total}</td>
                <td>{order.shipment_address}</td>
                <td>{getOrderStatus(order.current_order_status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
