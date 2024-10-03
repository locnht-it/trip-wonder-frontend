import React from "react";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <div>
      <p>Users Management</p>
      <Link to="/" className="underline">
        go to Dashboard
      </Link>
    </div>
  );
};

export default Users;
