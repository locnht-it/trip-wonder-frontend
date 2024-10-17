import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getNumberOfCustomerForEachMonth } from "../../api/dashboardApi";

const CustomerNumberChart = ({ year }) => {
  const [data, setData] = useState([]); // State để lưu dữ liệu từ API

  useEffect(() => {
    const fetchCustomerDataForYear = async () => {
      const promises = [];
      const chartData = [];

      // Gọi API cho từng tháng trong năm
      for (let month = 1; month <= 10; month++) {
        const promise = getNumberOfCustomerForEachMonth(month, 2024)
          .then((response) => {
            // Log đúng dữ liệu trả về
            console.log(
              `>>> Check response from CustomerDataForEachMonth ${month}: `,
              response
            );

            // Thêm dữ liệu vào chartData
            chartData.push({
              name: `Month ${month}`, // Tháng hiện tại
              customers: response.data.content, // Số lượng khách hàng trả về từ API
            });
          })
          .catch((error) => {
            console.error(`Error fetching data for month ${month}:`, error);
            chartData.push({
              name: `Month ${month}`,
              customers: 0, // Nếu có lỗi thì số lượng khách là 0
            });
          });

        promises.push(promise); // Lưu promise để xử lý tất cả cùng lúc
      }

      // Chờ tất cả các API call hoàn tất
      await Promise.all(promises);

      // Sắp xếp dữ liệu theo tháng (phòng trường hợp dữ liệu bị lệch thứ tự)
      chartData.sort((a, b) => {
        const monthA = parseInt(a.name.split(" ")[1], 10);
        const monthB = parseInt(b.name.split(" ")[1], 10);
        return monthA - monthB;
      });
      console.log(`>>> Check customer number for each month: `, chartData);
      setData(chartData); // Cập nhật dữ liệu biểu đồ
    };

    fetchCustomerDataForYear(); // Gọi hàm lấy dữ liệu
  }, []);

  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Customers for 2024</strong>
      <div className="w-full mt-3 flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data} // Dữ liệu từ API
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" /> {/* Hiển thị tháng */}
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="customers" // Số lượng khách hàng
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerNumberChart;
