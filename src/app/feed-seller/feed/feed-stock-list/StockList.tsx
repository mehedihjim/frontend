"use client";
import { useGetFeedStockListByDealerIdQuery } from "@/redux/api/feedStockApi";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEye, FaPen } from "react-icons/fa6";

const StockList = ({ feedStockList, onEdit }: any) => {
  console.log(feedStockList, "list from table");

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs text-black dark:text-white">
        <thead className="text-red-800 dark:text-red-200">
          <tr className="border-black dark:border-white">
            <th>#</th>
            <th>Feed Name</th>
            <th>Feed Type</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Total Sale</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {feedStockList?.map((feedDetail: any, index: number) => (
            <tr
              key={feedDetail?.id}
              className="border-b border-black dark:border-white"
            >
              <th>{index + 1}</th>
              <td className="text-nowrap">{feedDetail?.feed_name}</td>
              <td className="text-nowrap">{feedDetail?.feed_type}</td>
              <td>{feedDetail?.qty}</td>
              <td>{feedDetail?.price}</td>
              <td>{feedDetail?.unit}</td>
              <td>{feedDetail?.sale_qty}</td>
              <td>
                {" "}
                <div className="flex gap-2">
                  <div
                    className="tooltip cursor-pointer text-green-800 dark:text-green-400"
                    data-tip="Update"
                  >
                    <FaPen
                      onClick={() => onEdit(feedDetail)}
                      size={15}
                      className="cursor-pointer"
                    />
                  </div>
                  {/* <div
                    className="tooltip cursor-pointer text-sky-900 dark:text-slate-400"
                    data-tip="View"
                  >
                    <FaEye
                      onClick={() => onView(data)}
                      size={15}
                      className="cursor-pointer"
                    />
                  </div> */}
                  {/* <div
                    className="tooltip pe-2 text-rose-500 dark:text-rose-400"
                    data-tip="Delete"
                  >
                    <FaTrashAlt
                      className="cursor-pointer"
                      size={15}
                      onClick={() => onRemove(data.id)}
                    />
                  </div> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
