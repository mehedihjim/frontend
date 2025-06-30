"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetSingleFeedOrderDetailsQuery } from "@/redux/api/feedOrderApi";
import { useParams } from "next/navigation";
import React from "react";
import OrderDetails from "./OrderDetails";
import ReturnForm from "./ReturnForm";

const ReturnFeedOrder = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <DefaultLayout>
      {/* Order feed for batch {id} */}
      <div className="container mx-auto md:p-4">
        <h1 className="mb-4 border-b pb-2 text-2xl font-bold">
          Return Feed Order
        </h1>
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <h3 className="text-lg font-bold text-red-700 dark:text-rose-500">
              Return Details
            </h3>
            <ReturnForm feed_order_id={id} />
          </div>
          <div className="w-full sm:w-1/2">
            <OrderDetails feed_order_id={id} />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ReturnFeedOrder;
