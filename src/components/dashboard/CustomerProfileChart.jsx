import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { getTotalGender } from "../../api/dashboardApi";

const RADIAN = Math.PI / 180;
const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

let renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomLegend = ({ data, colors }) => {
  return (
    <div className="mt-4 flex justify-center">
      {data.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center mx-2">
          <div
            className="w-3 h-3"
            style={{ backgroundColor: colors[index % colors.length] }}
          ></div>
          <span className="ml-2 text-xs text-gray-700">{entry.name}</span>
        </div>
      ))}
    </div>
  );
};

const CustomerProfileChart = () => {
  const [genderData, setGenderData] = useState([
    { name: "Male", value: 0 },
    { name: "Female", value: 0 },
    { name: "Other", value: 0 },
  ]);

  useEffect(() => {
    getTotalGender()
      .then((response) => {
        const data = response.data.content;
        setGenderData([
          { name: "Male", value: data.Male },
          { name: "Female", value: data.Female },
          { name: "Other", value: data.Other },
        ]);
      })
      .catch((error) => console.error("Failed to fetch gender data:", error));
  }, []);

  return (
    <div className="w-[20rem] h-[24rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-gray-700 font-medium">Customer Profile</strong>
      <div className="w-full mt-3 flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={genderData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {genderData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <CustomLegend data={genderData} colors={COLORS} />
    </div>
  );
};

export default CustomerProfileChart;
