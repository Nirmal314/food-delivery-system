import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className="flex w-full h-screen justify-center items-center">
        <p className="text-3xl underline text-primary">Dashboard</p>
      </div>
    </>
  );
};

export default Dashboard;

// Order Display: The dashboard should provide a clear and organized view of
// all incoming orders, displaying essential information such as order number, customer name, order items, and special instructions.

// Order Status Tracking: Restaurant owners should be able to easily update the status of an order as it moves through different stages
//. This helps keep customers informed and ensures efficient order fulfillment.

// admin: (pending, done, delivered)
// customer: (received, preparing, ready for pickup/delivery)

// Order Acceptance/Rejection
