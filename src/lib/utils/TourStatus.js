import React from "react";

const getTourStatus = (status) => {
  switch (status) {
    case `Inactive`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-orange-600 bg-orange-100">
          {status.replaceAll(`_`, ` `).toLowerCase()}
        </span>
      );
    case `Active`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-green-600 bg-green-100">
          {status.replaceAll(`_`, ` `).toLowerCase()}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-gray-600 bg-gray-100">
          {status.replaceAll(`_`, ` `).toLowerCase()}
        </span>
      );
  }
};

export default getTourStatus;
