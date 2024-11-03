import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTourById } from "../../api/tourApi";
import { toast } from "react-toastify";

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        console.log("Fetching tour with ID:", id);

        const response = await getTourById(id);
        console.log(">>> API response from TourDetails:", response);

        if (response && response.data && response.data.content) {
          setTour(response.data.content);
        } else {
          console.error("API response structure is not as expected:", response);
          setError("Invalid API response format");
        }
      } catch (error) {
        console.error("Error fetching tour details:", error);
        toast.error("Failed to fetch tour details");
        setError("Failed to fetch tour details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTour();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleUpdate = () => {
    navigate(`/tours/update/${tour.id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Tour Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <p className="text-lg">{tour.name}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <p className="text-lg">
            {tour.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Attendance
          </label>
          <p className="text-lg">{tour.attendance}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <p className="text-lg">{tour.category}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Start Time
          </label>
          <p className="text-lg">{formatDate(tour.startTime)}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">End Time</label>
          <p className="text-lg">{formatDate(tour.endTime)}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Province</label>
          <p className="text-lg">{tour.province}</p>
        </div>
      </div>

      <div className="mb-6 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">
          Short Description
        </label>
        <p className="text-lg">{tour.shortDescription}</p>
      </div>

      <div className="mb-6 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <p className="text-lg">{tour.description}</p>
      </div>

      <div className="mb-6 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">Images</label>
        <div className="flex space-x-4 overflow-x-auto">
          {tour.galleries?.length > 0 ? (
            tour.galleries.map((image, index) => (
              <img
                key={index}
                src={image.imageUrl}
                alt={`Tour Image ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>

      <div className="mb-6 border border-gray-300 p-3 rounded">
        <h2 className="text-xl font-bold mb-2">Customer Reviews</h2>
        {tour.ratingReviews?.length > 0 ? (
          tour.ratingReviews.map((review, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-200 p-2 rounded"
            >
              <p
                className="font-semibold text-blue-600 cursor-pointer hover:text-blue-700"
                onClick={() => navigate(`/users/${review.user.userId}`)}
              >
                {review.user.fullname}
              </p>
              <p className="text-gray-600">
                {review.ratingDate
                  ? formatDate(review.ratingDate)
                  : "No date provided"}
              </p>
              <p className="text-yellow-500">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
              </p>
              <p className="">{review.feedback}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
          onClick={() => window.history.back()}
        >
          Back
        </button>

        <div className="space-x-4">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
