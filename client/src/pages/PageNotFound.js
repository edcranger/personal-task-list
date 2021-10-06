import React from "react";
import { useLocation } from "react-router-dom";

const PageNotFound = () => {
  const location = useLocation();
  return (
    <div>
      <h1>Page Not Found (404) location {location.pathname}</h1>
    </div>
  );
};

export default PageNotFound;
