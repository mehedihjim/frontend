"use client";

import Pagination from "@/components/pagination/Pagination";
import Link from "next/link";
import { useState } from "react";
import { FaEye } from "react-icons/fa6";

export const OrderTable = ({routePrefix, chickenOrderData, isLoading ,onView} : any) => {
     const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(10);
      const [displayData, setDisplayData] = useState<any[]>([]);
    
      // Determine the data to display based on the current page
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = chickenOrderData?.data?.slice(
        indexOfFirstItem,
        indexOfLastItem,
      );
    
      // Determine the total number of pages
      const totalPages = Math.ceil(chickenOrderData?.data?.length / itemsPerPage);
      if (isLoading) return <p>Loading...</p>;
    return (
        <>
          
          <div className="block w-full overflow-x-auto rounded shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
            <table className="w-full border-collapse items-center bg-transparent">
              {/* head */}
              <thead>
                <tr className="bg-slate-200 dark:bg-slate-800">
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    ID
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Date
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Shed
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Batch Number
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Type of Hen
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Number of Hen
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Average Weight
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Status
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
            {displayData?.map((data) => {
              let badgeClass = "badge gap-2 text-white";
              if (data.status === "Pending") {
                badgeClass += " badge-warning";
              } else if (data.status === "Completed") {
                badgeClass += " badge-success "; 
              } else if (data.status === "Cancelled") {
                badgeClass += " badge-error";
              } else if (data.status === "Return") {
                badgeClass += " badge-gray"; 
              }

              return (
                <tr key={data.id} className="border-b-1 border border-l-0 border-r-0 border-t-0 border-slate-200 dark:border-slate-700">
                  <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">{data.id}</th>
                  <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">{data.order_date}</td>
                  <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">{data.shed_name}</th>
                  <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">{data.batch_number}</td>
                  <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">{data.hen_type}</td>
                  <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">{data.bird_count}</td>
                  <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">{data.avg_weight}</td>
                  <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                    {/* status section with conditional badge class */}
                    <div className={badgeClass}>
                      {data.status}
                    </div>
                  </td>
                  <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                    <div className="flex gap-2">
                      <Link key={data.id} href={`${routePrefix}/${data.id}`}>
                        <div className="btn btn-sm mr-2 border-0 bg-blue-600 text-white hover:bg-blue-800" data-tip="View">
                          <FaEye  size={15} className="cursor-pointer" />
                        </div>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
            </table>
          </div>
          <Pagination
            data={chickenOrderData?.data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            totalPages={totalPages}
            setDisplayData={setDisplayData}
          ></Pagination>
        </>
      );
}