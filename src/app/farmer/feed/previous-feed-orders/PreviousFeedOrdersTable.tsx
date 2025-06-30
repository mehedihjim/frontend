"use client";
import Pagination from "@/components/pagination/Pagination";
import { useGetFeedOrderListByFarmerIdQuery } from "@/redux/api/feedOrderApi";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { CancelOrderConfrim } from "./ConfrimCancelOrder";

const PreviousFeedOrdersTable = () => {
  const user = useAppSelector((state) => state.auth.user);
  const farmer_id = user?.id;
  const [cancelSuccess, setCancelSuccess] = useState(false);

  const {
    data: feedOrderList,
    isLoading: feedOrderListLoading,
    refetch,
  } = useGetFeedOrderListByFarmerIdQuery(farmer_id, {
    refetchOnMountOrArgChange: true,
  });
  const [itemCancelToSelect, setItemCancelToSelect] = useState<number | null>(
    null,
  );

  const openCancelOrderModal = (item_id: number) => {
    setItemCancelToSelect(item_id);
    const modal = document.getElementById(
      "confirm_cancel_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };

  useEffect(() => {
    if (cancelSuccess) {
      refetch();
      setCancelSuccess(false);
    }
  }, [cancelSuccess, refetch]);

  return (
    <>
      <div className="block w-full overflow-x-auto rounded shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
        <table className="w-full border-collapse items-center bg-transparent">
          {/* head */}
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-800">
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Order No
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Order Date
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Batch
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Status
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Total Price
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {feedOrderList?.data.map((feedOrder: any) => (
              <tr
                key={feedOrder.id}
                className="border-b-1 border border-l-0 border-r-0 border-t-0 border-slate-200 dark:border-slate-700"
              >
                <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  {feedOrder.order_no}
                </th>
                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  {feedOrder.order_date}
                </td>
                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  {feedOrder.batch_number}
                </td>
                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  {/* status section with conditional badge class */}
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      feedOrder.order_status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : feedOrder.order_status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : feedOrder.order_status === "Cancelled"
                            ? "bg-red-200 text-red-800"
                            : feedOrder.order_status === "Return"
                              ? "bg-orange-200 text-orange-800"
                              : "bg-slate-200 text-slate-800"
                    }`}
                  >
                    {feedOrder.order_status}
                  </span>
                </td>
                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  <div>{feedOrder.total_price}</div>
                </td>
                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  <div className="flex gap-2">
                    <Link
                      key={feedOrder.id}
                      href={`/feed-order-details/${feedOrder.id}`}
                    >
                      <button className="btn btn-outline btn-info btn-xs hover:!text-white">
                        Details
                      </button>
                      {/* <div className="mr-2 border-0" data-tip="View">
                        <FaEye size={15} className="cursor-pointer" />
                      </div> */}
                    </Link>
                    {feedOrder.order_status === "Pending" && (
                      <button
                        className="btn btn-outline btn-error btn-xs hover:!text-white"
                        onClick={() => openCancelOrderModal(feedOrder.id)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CancelOrderConfrim
        itemToSelect={itemCancelToSelect}
        setCancelSuccess={setCancelSuccess}
      />

      {/* <Pagination
        data={chickenOrderData?.data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalPages={totalPages}
        setDisplayData={setDisplayData}
      ></Pagination> */}
    </>
  );
};

export default PreviousFeedOrdersTable;
