// DashboardStatsGrid.jsx

import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { MdOutlineTour } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import {
  getTotalOrders,
  getTotalRevenues,
  getTotalSuppliers,
  getTotalTours,
} from "../../api/dashboardApi";

const DashboardStatsGrid = () => {
  const [totalRevenues, setTotalRevenues] = useState(null);
  const [totalSuppliers, setTotalSuppliers] = useState(null);
  const [totalTours, setTotalTours] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null);

  useEffect(() => {
    // Fetch total revenues
    getTotalRevenues()
      .then((response) => setTotalRevenues(response.data.content))
      .catch((error) =>
        console.error("Failed to fetch total revenues:", error)
      );

    // Fetch total suppliers
    getTotalSuppliers()
      .then((response) => setTotalSuppliers(response.data.content))
      .catch((error) =>
        console.error("Failed to fetch total suppliers:", error)
      );

    // Fetch total tours
    getTotalTours()
      .then((response) => setTotalTours(response.data.content))
      .catch((error) => console.error("Failed to fetch total tours:", error));

    // Fetch total orders
    getTotalOrders()
      .then((response) => setTotalOrders(response.data.content))
      .catch((error) => console.error("Failed to fetch total orders:", error));
  }, []);

  return (
    <div className="flex gap-4 w-full">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-bold">
            Total Revenues
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {totalRevenues !== null
                ? `${totalRevenues.toLocaleString("vi-VN")} ₫`
                : "Loading..."}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-500">
          <FaUser className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-bold">
            Total Suppliers
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {totalSuppliers !== null ? totalSuppliers : "Loading..."}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <MdOutlineTour className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-bold">Total Tours</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {totalTours !== null ? totalTours : "Loading..."}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
          <RiBillFill className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-bold">Total Orders</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {totalOrders !== null ? totalOrders : "Loading..."}
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
};

export default DashboardStatsGrid;

let BoxWrapper = ({ children }) => {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
};
