import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopFiveTours } from "../../api/dashboardApi";

const PopularTours = () => {
  const [topTours, setTopTours] = useState([]);

  useEffect(() => {
    getTopFiveTours()
      .then((response) => {
        const tours = response.data.content.map((tour) => ({
          id: tour[0],
          name: tour[1],
          rating: tour[2],
          thumbnail: tour[3],
          price: tour[4],
        }));
        setTopTours(tours);
      })
      .catch((error) => console.error("Failed to fetch top tours:", error));
  }, []);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 w-[20rem]">
      <strong className="text-gray-700 font-medium">Best Tours</strong>
      <div className="mt-4 flex flex-col gap-3">
        {topTours.map((tour) => (
          <Link
            to={`/tours/${tour.id}`}
            className="flex hover:no-underline"
            key={tour.id}
          >
            <div className="w-10 h-10 min-w-10 bg-gray-200 rounded-sm overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={tour.thumbnail}
                alt={tour.name}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800">{tour.name}</p>
              <span className="text-sm font-medium text-gray-600">
                Rating: {tour.rating.toFixed(1)}
              </span>
            </div>
            <div className="text-xs text-gray-500 pl-2">
              {tour.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTours;
