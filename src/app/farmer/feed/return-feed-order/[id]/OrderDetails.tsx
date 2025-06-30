"use client";
import { useGetSingleFeedOrderDetailsQuery } from "@/redux/api/feedOrderApi";
import React from "react";

const OrderDetails = ({ feed_order_id }: any) => {
  const { data: feedDetails, isLoading: feedDetailsLoading } =
    useGetSingleFeedOrderDetailsQuery(feed_order_id);
  return (
    <>
      <h3 className="text-lg font-bold text-red-700 dark:text-rose-500">
        Order Details
      </h3>
      <div className="mt-4 flex justify-between">
        <h3 className="text-md font-bold text-black dark:text-white">
          Order #{feedDetails?.data?.order_no}
        </h3>
        <p className="text-sm text-black dark:text-white">
          Delivery Date: {feedDetails?.data?.delivery_date}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-sm font-semibold text-black dark:text-white">
              <th></th>
              <th>Product</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {feedDetails?.data?.order_details.map(
              (feed: any, index: number) => (
                <tr key={feed?.id}>
                  <th className="py-1">{index + 1}</th>
                  <td className="py-1 text-black dark:text-white">
                    {feed?.feed_name} x {feed?.quantity}
                  </td>
                  <td className="py-1 text-black dark:text-white">
                    {feed?.total_price}
                  </td>
                </tr>
              ),
            )}
            <tr>
              <th></th>
              <td className="py-1 text-end font-bold text-black dark:text-white">
                Subtotal
              </td>
              <td className="py-1 font-bold text-black dark:text-white">
                {feedDetails?.data?.total_price}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderDetails;
