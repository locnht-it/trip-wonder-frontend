import { Legend } from "@headlessui/react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 4000,

    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,

    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,

    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,

    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,

    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,

    amt: 2500,
  },
  {
    name: "Jul",
    uv: 3490,

    amt: 2100,
  },
  {
    name: "Aug",
    uv: 3000,

    amt: 2100,
  },
  {
    name: "Sep",
    uv: 2500,

    amt: 2100,
  },
  {
    name: "Oct",
    uv: 3490,

    amt: 2100,
  },
];

const CustomerNumberChart = () => {
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Customers</strong>
      <div className="w-full mt-3 flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerNumberChart;
