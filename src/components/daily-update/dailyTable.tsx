"use client";
import { useState } from "react";
import Pagination from "../pagination/Pagination";
import { FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";

export const DailyTable = ({dailyUpdateData, isLoading,onRemove,onEdit,}: any) => {
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(10);
      const [displayData, setDisplayData] = useState<any[]>([]);
      const [updateData, setUpdateData] = useState<any>({});
    
      // Determine the data to display based on the current page
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = dailyUpdateData?.data?.slice(
        indexOfFirstItem,
        indexOfLastItem,
      );
    
      // Determine the total number of pages
      const totalPages = Math.ceil(dailyUpdateData?.data?.length / itemsPerPage);
    
      if (isLoading) return <p>Loading...</p>;
    return (
        <div className="mb-6 mt-6">
          <div className="block w-full overflow-x-auto rounded shadow-[rgba(8,_112,_212,_0.2)_0px_3px_15px]">
            <table className="w-full border-collapse items-center bg-transparent">
              <thead>
                <tr className="bg-slate-200 dark:bg-slate-800">
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    ID
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Batch Number
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Date
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Death Count
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Feed Consumption 
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Average Weight
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Average Price
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayData?.map((dailyUpdate: any) => (
                  <tr
                    className="border-b-1 border border-l-0 border-r-0 border-t-0 border-slate-200 dark:border-slate-700"
                    key={dailyUpdate.id}
                  >
                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-2 px-6 text-left align-middle text-xs">
                      {dailyUpdate.id}
                    </td>
                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-2 px-6 text-left align-middle text-xs">
                      {dailyUpdate.batch_number}
                    </td>
                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-2 px-6 text-left align-middle text-xs">
                      {dailyUpdate.date}
                    </td>
                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-2 px-6 text-left align-middle text-xs">
                      {dailyUpdate.death_count}
                    </td>
                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-2 px-6 text-left align-middle text-xs">
                      {dailyUpdate.feed_consumption}
                    </td>
                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-2 px-6 text-left align-middle text-xs">
                      {dailyUpdate.average_weight}
                    </td>
                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-2 px-6 text-left align-middle text-xs">
                      {dailyUpdate.average_price}
                    </td>
                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-2 px-6 text-left align-middle text-xs">
                      <button
                        className="btn btn-sm mr-2 border-0 bg-red-700 text-white hover:bg-red-800"
                        onClick={() => onRemove(dailyUpdate.id)}
                      >
                        <FaTrashAlt size={15} />
                      </button>
                      <button
                        className="btn btn-sm border-0 bg-yellow-700 text-white hover:bg-yellow-800"
                        onClick={() => onEdit(dailyUpdate)}
                      >
                        <FaPen size={15} />
                      </button>

                      {/* <div className="flex gap-2">
                        <div
                          className="tooltip cursor-pointer text-green-800 dark:text-green-400"
                          data-tip="Edit"
                        >
                          <FaPen
                            onClick={() => onEdit(shed)}
                            size={15}
                            className="cursor-pointer"
                          />
                        </div>
                        <div
                          className="tooltip cursor-pointer text-sky-900 dark:text-slate-400"
                          data-tip="View"
                        >
                          <FaEye
                            onClick={() => onView(shed)}
                            size={15}
                            className="cursor-pointer"
                          />
                        </div>
                        <div
                          className="tooltip pe-2 text-rose-500 dark:text-rose-400"
                          data-tip="Delete"
                        >
                          <FaTrashAlt
                            className="cursor-pointer"
                            size={15}
                            onClick={() => onRemove(shed.id)}
                          />
                        </div>
                      </div> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            data={dailyUpdateData?.data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            totalPages={totalPages}
            setDisplayData={setDisplayData}
          ></Pagination>
        </div>
      );
};