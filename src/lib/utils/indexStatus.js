import React from "react";

const getOrderStatus = (status) => {
  switch (status) {
    case `PLACED`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-sky-600 bg-sky-100">
          {status}
        </span>
      );
    case `CONFIRMED`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-orange-600 bg-orange-100">
          {status}
        </span>
      );
    case `SHIPPED`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-teal-600 bg-teal-100">
          {status}
        </span>
      );
    case `OUT_FOR_DELIVERY`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-yellow-600 bg-yellow-100">
          {status}
        </span>
      );
    case `DELIVERED`:
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
