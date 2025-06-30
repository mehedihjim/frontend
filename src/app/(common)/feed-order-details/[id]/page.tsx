"use client";
import BatchSummary from "@/components/batch-summary/BatchSummary";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetSingleFeedOrderDetailsQuery } from "@/redux/api/feedOrderApi";
import { useGetUsersByIdQuery } from "@/redux/api/userApi";
import { useAppSelector } from "@/redux/hooks";
import { formatDate } from "@/utils/format_date";
import Link from "next/link";
import { useParams } from "next/navigation";

const FeedOrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);

  const { data: feedDetails, isLoading: feedDetailsLoading } =
    useGetSingleFeedOrderDetailsQuery(id);
  const { data: farmerDetails, isLoading: farmerDetailsLoading } =
    useGetUsersByIdQuery(feedDetails?.data?.farmer_id);
  return (
    <DefaultLayout>
      {/* Order feed for batch {id} */}
      <div className="container mx-auto md:p-4">
        <h1 className="mb-4 border-b pb-2 text-2xl font-bold">Order Details</h1>

        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="w-full sm:w-3/5">
            <div className="w-full overflow-hidden rounded rounded-lg bg-white p-4 shadow-sm dark:bg-slate-800">
              {/* Top info segment */}
              <div className="flex justify-between">
                <div className="flex gap-2">
                  {feedDetails?.data?.order_no && (
                    <div>
                      <span>Order No:</span>{" "}
                      <span>{feedDetails?.data?.order_no}</span>
                    </div>
                  )}
                  <div>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        feedDetails?.data?.order_status === "Completed"
                          ? "bg-green-200 text-green-800"
                          : feedDetails?.data?.order_status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : feedDetails?.data?.order_status === "Cancelled"
                              ? "bg-red-200 text-red-800"
                              : feedDetails?.data?.order_status === "Return"
                                ? "bg-red-200 text-red-800"
                                : "bg-slate-200 text-slate-800"
                      }`}
                    >
                      {feedDetails?.data?.order_status}
                    </span>
                  </div>
                </div>
                <div>{formatDate(feedDetails?.data?.order_date)}</div>
              </div>
              {/* Table Segment */}
              <div className="text-gray-700 mb-6 mt-4 flex h-full w-full flex-col overflow-x-auto rounded-sm bg-slate-100 bg-clip-border shadow-sm dark:bg-slate-600">
                <table
                  id="productTable"
                  className="w-full min-w-max table-auto text-left"
                >
                  <thead>
                    <tr>
                      <th className="border-b border-slate-300 bg-slate-200 p-4 dark:border-slate-800 dark:bg-slate-700">
                        <p className="block text-sm font-semibold leading-none text-slate-700 dark:text-slate-200">
                          Feed Name
                        </p>
                      </th>
                      <th className="border-b border-slate-300 bg-slate-200 p-4 dark:border-slate-800 dark:bg-slate-700">
                        <p className="block text-sm font-semibold leading-none text-slate-700 dark:text-slate-200">
                          Feed Type
                        </p>
                      </th>
                      <th className="border-b border-slate-300 bg-slate-200 p-4 dark:border-slate-800 dark:bg-slate-700">
                        <p className="block text-sm font-semibold leading-none text-slate-700 dark:text-slate-200">
                          Qty
                        </p>
                      </th>
                      <th className="border-b border-slate-300 bg-slate-200 p-4 dark:border-slate-800 dark:bg-slate-700">
                        <p className="block text-sm font-semibold leading-none text-slate-700 dark:text-slate-200">
                          Price
                        </p>
                      </th>
                      <th className="border-b border-slate-300 bg-slate-200 p-4 dark:border-slate-800 dark:bg-slate-700">
                        <p className="block text-sm font-semibold leading-none text-slate-700 dark:text-slate-200">
                          Total
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedDetails?.data?.order_details.map((detail: any) => (
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800">
                        <td className="border-b border-slate-200 p-4 dark:border-slate-700">
                          <p className="block text-sm text-slate-800 dark:text-slate-100">
                            {detail?.feed_name}
                          </p>
                        </td>
                        <td className="border-b border-slate-200 p-4 dark:border-slate-700">
                          <p className="block text-sm text-slate-800 dark:text-slate-100">
                            {detail?.type}
                          </p>
                        </td>
                        <td className="border-b border-slate-200 p-4 dark:border-slate-700">
                          <p className="block text-sm text-slate-800 dark:text-slate-100">
                            {detail?.weight}
                          </p>
                        </td>
                        <td className="border-b border-slate-200 p-4 dark:border-slate-700">
                          <p className="block text-sm text-slate-800 dark:text-slate-100">
                            {detail?.price} tk
                          </p>
                        </td>
                        <td className="border-b border-slate-200 p-4 dark:border-slate-700">
                          <p className="block text-sm text-slate-800 dark:text-slate-100">
                            {detail?.total_price} tk
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colSpan={2}
                        className="border-t border-slate-300 p-4 text-left font-bold text-slate-800 dark:text-white"
                      >
                        Total:
                      </td>
                      <td
                        colSpan={2}
                        className="border-t border-slate-300 p-4 font-bold text-slate-800 dark:text-white"
                      >
                        {feedDetails?.data?.weight}
                      </td>
                      <td
                        colSpan={1}
                        className="border-t border-slate-300 p-4 font-semibold text-slate-800 dark:text-white"
                      >
                        {feedDetails?.data?.total_price} tk
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-2/5">
            <div className="w-full overflow-hidden rounded rounded-lg bg-white p-4 shadow-sm dark:bg-slate-800">
              <div>
                <h3 className="mb-4 font-bold text-black dark:text-white">
                  Shipping Information
                </h3>
                <hr />
                <div>
                  <h3 className="mb-2 mt-4 font-semibold text-black dark:text-white">
                    Adress
                  </h3>
                  <p>
                    {farmerDetails?.data?.union_name},{" "}
                    {farmerDetails?.data?.upzilla_name},{" "}
                    {farmerDetails?.data?.district_name},{" "}
                    {farmerDetails?.data?.division_name}
                  </p>
                  <div>
                    Phone: <span>{farmerDetails?.data?.mobile}</span>
                  </div>
                  <div>
                    Email: <span>{farmerDetails?.data?.email}</span>
                  </div>
                </div>
              </div>
            </div>
            {user?.user_type === "farmer" &&
              feedDetails?.data?.order_status === "Completed" && (
                <div className="mt-6 w-full overflow-hidden rounded rounded-lg bg-white p-4 shadow-sm dark:bg-slate-800">
                  <div>
                    <h3 className="mb-4 font-bold text-black dark:text-white">
                      Return Order
                    </h3>
                    <hr />
                    <div className="mt-2">
                      <p>Need to return this order?</p>
                      <Link href={`/farmer/feed/return-feed-order/${id}`}>
                        <p className="cursor-pointer text-sky-700 hover:text-red-700 dark:text-sky-200 hover:dark:text-rose-500">
                          Initiate a reurn
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
        <div className="mt-4">
          <BatchSummary batchID={feedDetails?.data?.batch_id}></BatchSummary>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FeedOrderDetails;
