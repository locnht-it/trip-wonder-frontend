import React from "react";
import { Link } from "react-router-dom";

const Provinces = () => {
  return (
    <div>
      <p>Provinces Management</p>
      <Link to="/" className="underline">
        go to Dashboard
      </Link>
    </div>
  );
};

export default Provinces;
