import React from "react";

const getOrderStatus = (status) => {
  switch (status) {
    case `PENDING`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-sky-600 bg-sky-100">
          {status}
        </span>
      );
    case `CANCELLED`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-orange-600 bg-orange-100">
          {status}
        </span>
      );
    case `PROCESSING`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-yellow-600 bg-yellow-100">
          {status}
        </span>
      );
    case `PAID`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-green-600 bg-green-100">
          {status}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-gray-600 bg-gray-100">
          {status}
        </span>
      );
  }
};

export default getOrderStatus;
