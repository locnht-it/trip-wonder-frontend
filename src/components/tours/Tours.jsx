import React from "react";
import { Link } from "react-router-dom";

const Tours = () => {
  return (
    <div>
      <p>Tours Management</p>
      <Link to="/" className="underline">
        go to Dashboard
      </Link>
    </div>
  );
};

export default Tours;
