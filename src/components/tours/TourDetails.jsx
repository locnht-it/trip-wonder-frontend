import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Dùng useNavigate thay vì useHistory

const TourDetail = ({ tourId }) => {
  const [tour, setTour] = useState(null);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  // Fake data cho một tour cụ thể
  const fakeTourData = {
    id: 1,
    name: "Amazing Vietnam Tour",
    description:
      "Explore the beautiful landscapes and vibrant culture of Vietnam on this comprehensive tour. You'll visit famous landmarks, enjoy local cuisine, and experience the country's rich history.",
    shortDescription: "A wonderful tour of Vietnam's most iconic destinations.",
    price: 1200,
    startTime: "08:00 AM",
    endTime: "05:00 PM",
    date: "2024-10-05",
    status: "active", // Thay đổi ở đây
    category: "Cultural",
    province: "Hanoi",
    supplier: "Travel Agency X",
    images: [
      { url: "https://via.placeholder.com/150" },
      { url: "https://via.placeholder.com/150" },
      { url: "https://via.placeholder.com/150" },
    ],
    reviews: [
      // Thêm phần đánh giá
      {
        reviewerName: "NamLee",
        reviewDate: "2024-09-20",
        rating: 5,
        comment: "Đỉnh nóc kịch trần tung bay phấp phới",
        isActive: true,
      },
      {
        reviewerName: "Hieu Chu Nhat",
        reviewDate: "2024-09-18",
        rating: 1,
        comment: "Quá tệ",
        isActive: true,
      },
    ],
  };

  // Giả lập fetch dữ liệu
  useEffect(() => {
    setTour(fakeTourData);
  }, []);

  const handleUpdate = () => {
    // Điều hướng đến trang cập nhật
    navigate(`/tours/update/${tour.id}`);
  };

  const handleToggleStatus = () => {
    // Logic để chuyển đổi trạng thái tour
    const newStatus = tour.status === "active" ? "inactive" : "active";
    setTour({ ...tour, status: newStatus });
    alert(
      `Tour status has been updated to ${
        newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
      }!`
    );
  };

  const handleToggleReviewStatus = (index) => {
    // Logic để chuyển đổi trạng thái comment
    const updatedReviews = [...tour.reviews];
    updatedReviews[index].isActive = !updatedReviews[index].isActive; // Chuyển đổi trạng thái
    setTour({ ...tour, reviews: updatedReviews });
  };

  const handleNavigateToProfile = (reviewerName) => {
    // Điều hướng đến trang profile của người đánh giá
    navigate(`/users/${reviewerName}`);
  };

  if (!tour) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Tour Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tour Name */}
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <p className="text-lg">{tour.name}</p>
        </div>

        {/* Price */}
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <p className="text-lg">{tour.price} USD</p>
        </div>

        {/* Start Time */}
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Start Time
          </label>
          <p className="text-lg">{tour.startTime}</p>
        </div>

        {/* End Time */}
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">End Time</label>
          <p className="text-lg">{tour.endTime}</p>
        </div>

        {/* Date */}
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Date</label>
          <p className="text-lg">{new Date(tour.date).toLocaleDateString()}</p>
        </div>

        {/* Status */}
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Status</label>
          <p className="text-lg">
            {tour.status.charAt(0).toUpperCase() + tour.status.slice(1)}
          </p>
        </div>

        {/* Category */}
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <p className="text-lg">{tour.category}</p>
        </div>

        {/* Province */}
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Province</label>
          <p className="text-lg">{tour.province}</p>
        </div>

        {/* Supplier */}
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Supplier</label>
          <p className="text-lg">{tour.supplier}</p>
        </div>
      </div>

      {/* Short Description */}
      <div className="mb-6 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">
          Short Description
        </label>
        <p className="text-lg">{tour.shortDescription}</p>
      </div>

      {/* Description */}
      <div className="mb-6 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <p className="text-lg">{tour.description}</p>
      </div>

      {/* Tour Images */}
      <div className="mb-6 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">Images</label>
        <div className="flex space-x-4 overflow-x-auto">
          {tour.images?.length > 0 ? (
            tour.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Tour Image ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mb-6 border border-gray-300 p-3 rounded">
        <h2 className="text-xl font-bold mb-2">Customer Reviews</h2>
        {tour.reviews && tour.reviews.length > 0 ? (
          tour.reviews.map((review, index) => (
            <div
              key={index}
              className={`mb-4 border border-gray-200 p-2 rounded ${
                review.isActive ? "" : "opacity-50"
              }`}
            >
              <p
                className="font-semibold cursor-pointer text-blue-600"
                onClick={() => handleNavigateToProfile(review.reviewerName)}
              >
                {review.reviewerName}
              </p>
              <p className="text-gray-600">
                {new Date(review.reviewDate).toLocaleDateString()}
              </p>
              <p className="text-yellow-500">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
              </p>
              <p className="text-gray-700">{review.comment}</p>
              {/* <button
                className={`mt-2 px-4 py-1 rounded focus:outline-none ${
                  review.isActive
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-500 text-white hover:bg-gray-600"
                }`}
                onClick={() => handleToggleReviewStatus(index)}
              >
                {review.isActive ? "Inactive" : "Active"}
              </button> */}
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>

      {/* Buttons */}
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

          <button
            className={`px-6 py-2 rounded focus:outline-none ${
              tour.status === "active"
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
            onClick={handleToggleStatus}
          >
            {tour.status === "active" ? "Inactive" : "Active"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
