import React from "react";
import FeedAddForm from "./FeedAddForm";

const FeedAddManangement = () => {
  return (
    <div className="container mx-auto md:p-4">
      <h1 className="mb-4 border-b pb-2 text-2xl font-bold">Feed Stock</h1>
      <div className="w-full">
        {/* form */}
        <FeedAddForm></FeedAddForm>
      </div>
    </div>
  );
};

export default FeedAddManangement;
