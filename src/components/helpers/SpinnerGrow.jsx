import React from "react";

export default function SpinnerGrow({ color }) {
  return (
    <div className={`spinner-grow text-${color}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}
