import React from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <div>
      <p>Orders Management</p>
      <Link to="/" className="underline">
        go to Dashboard
      </Link>
    </div>
  );
};

export default Orders;
