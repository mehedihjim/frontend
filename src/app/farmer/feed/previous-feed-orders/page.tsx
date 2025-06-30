import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import PreviousFeedOrdersTable from "./PreviousFeedOrdersTable";

const PreviousFeedOrdersPage = () => {
  return (
    <DefaultLayout>
      {/* Order feed for batch {id} */}
      <div className="container mx-auto md:p-4">
        <h1 className="mb-4 border-b pb-2 text-2xl font-bold">
          Previous Feed Orders
        </h1>
        <div className="w-full">
          <PreviousFeedOrdersTable></PreviousFeedOrdersTable>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PreviousFeedOrdersPage;
