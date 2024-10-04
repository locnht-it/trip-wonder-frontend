import React from "react";

const Support = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mt-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Need Support?
        </h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          If you have any questions or need assistance, contact to us via our
          Facebook fanpage or contact email.
        </p>
        <div className="flex flex-col items-center">
          <a
            href="https://www.facebook.com/profile.php?id=61565907795833"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 mb-4 w-full text-center"
          >
            Visit our Facebook FanPage
          </a>
          <p className="text-lg text-gray-800 mb-2">Or contact us at:</p>
          <a
            href="mailto:tripwonder@example.com"
            className="text-blue-500 underline"
          >
            tripwonder@example.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Support;
