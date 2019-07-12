import React from "react";

const Label = ({ children }) => (
  <span
    className=" font-semibold text-gray-600 text-right text-xs"
    style={{ minHeight: "1rem" }}
  >
    {children}
  </span>
);

export default Label;
