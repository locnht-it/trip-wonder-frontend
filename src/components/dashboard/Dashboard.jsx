import React, { useEffect } from "react";
import { toast } from "react-toastify"; // Import toast
import DashboardStatsGrid from "./DashboardStatsGrid";
import CustomerProfileChart from "./CustomerProfileChart";
import CustomerNumberChart from "./CustomerNumberChart";
import RecentOrders from "./RecentOrders";
import PopularTours from "./PopularTours";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full">
        <CustomerNumberChart />
        <CustomerProfileChart />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <RecentOrders />
        <PopularTours />
      </div>
    </div>
  );
};

export default Dashboard;
