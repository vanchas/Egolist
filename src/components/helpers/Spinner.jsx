import React from "react";

function Spinner({ color, size = null }) {
  return (
    <div
      className={`spinner-border ${
        size ? "spinner-border" + size : ""
      } text-${color}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;
