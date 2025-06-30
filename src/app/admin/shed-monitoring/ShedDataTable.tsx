import Pagination from "@/components/pagination/Pagination";
import { useGetShedMonitoringDataQuery } from "@/redux/api/shedDataApi";
import { formatDate } from "@/utils/format_date";
import { formatTime } from "@/utils/format_time";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const ShedDataTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [displayData, setDisplayData] = useState<any[]>([]);

  const { data: shedMonitoringData, isLoading: shedLoading } =
    useGetShedMonitoringDataQuery();

  // Determine the data to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shedMonitoringData?.data?.shed_monitoring?.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // Determine the total number of pages
  const totalPages = Math.ceil(shedMonitoringData?.length / itemsPerPage);

  const onRemove = (data_id: any) => {
    console.log(data_id, "to be removed");
  };

  return (
    <div className="mb-6 mt-6">
      <div className="block w-full overflow-x-auto rounded shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
        <table className="w-full border-collapse items-center bg-transparent">
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-800">
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Date
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Time
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Device ID
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Smoke
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Ammonia
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Methene
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Temp.
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Humidity
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {displayData?.length > 0 ? (
              displayData?.map((vaccine: any) => (
                <tr
                  key={vaccine.id}
                  className="border-b border-slate-200 font-medium text-black dark:border-slate-700"
                >
                  <td className="text-nowrap p-1 px-6 text-left text-xs">
                    {formatDate(vaccine.date)}
                  </td>
                  <td className="text-nowrap p-1 px-6 text-left text-xs">
                    {formatTime(vaccine.date)}
                  </td>
                  <td className="text-nowrap p-1 px-6 text-left text-xs">
                    {vaccine.device_name}
                  </td>
                  <td className="p-1 px-6 text-left text-xs">
                    {vaccine.smoke_count}
                  </td>
                  <td className="p-1 px-6 text-left text-xs">
                    {vaccine.ammonia_count}
                  </td>
                  <td className="p-1 px-6 text-left text-xs">
                    {vaccine.methen_count}
                  </td>
                  <td className="p-1 px-6 text-left text-xs">
                    {vaccine.temperature}
                  </td>
                  <td className="p-1 px-6 text-left text-xs">
                    {vaccine.humidity}
                  </td>
                  <td className="p-1 px-6 text-left text-xs">
                    <button
                      className="btn btn-sm border-0 bg-red-700 text-white hover:bg-red-800"
                      onClick={() => onRemove(vaccine.id)}
                    >
                      <FaTrashAlt size={15} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="p-2 text-center text-red-700 dark:text-red-400"
                >
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        data={shedMonitoringData?.data?.shed_monitoring}
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

export default ShedDataTable;
