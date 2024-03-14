import React from "react";

const RestaurantLoading = () => {
  return (
    <>
      <div className="animate-pulse w-96 overflow-hidden bg-gray-300 rounded-lg">
        <div className="relative overflow-hidden">
          <div className="bg-gray-400 rounded-t-lg h-64"></div>{" "}
          {/* Placeholder for the image */}
        </div>
        <div className="p-4">
          <div className="bg-gray-400 h-6 mb-2 rounded"></div>{" "}
          {/* Placeholder for the title */}
          <div className="bg-gray-400 h-4 rounded"></div>{" "}
          {/* Placeholder for the description */}
        </div>
        <div className="p-4">
          <div className="bg-gray-400 h-4 w-20 mb-1 rounded"></div>{" "}
          {/* Placeholder for the location icon */}
          <div className="bg-gray-400 h-4 rounded"></div>{" "}
          {/* Placeholder for the location text */}
        </div>
      </div>
    </>
  );
};

export default RestaurantLoading;
