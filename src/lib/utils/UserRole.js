import React from "react";

const getUserRole = (role) => {
  switch (role) {
    case `ADMIN`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-sky-600 bg-sky-100">
          {role.replaceAll(`_`, ` `).toLowerCase()}
        </span>
      );
    case `STAFF`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-teal-600 bg-teal-100">
          {role.replaceAll(`_`, ` `).toLowerCase()}
        </span>
      );
    case `CUSTOMER`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-yellow-600 bg-yellow-100">
          {role.replaceAll(`_`, ` `).toLowerCase()}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-gray-600 bg-gray-100">
          {role.replaceAll(`_`, ` `).toLowerCase()}
        </span>
      );
  }
};

export default getUserRole;
