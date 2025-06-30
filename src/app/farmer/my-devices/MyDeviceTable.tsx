"use client";
import Pagination from "@/components/pagination/Pagination";
import { useGetDeviceListByFarmerIDQuery } from "@/redux/api/iotDeviceApi";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";
import { MdOutlineDataset } from "react-icons/md";
import Link from "next/link";

const MyDeviceTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [deviceIdSelect, setDeviceIdSelect] = useState<number | null>(null);

  const { data: deviceListFarmerID, isLoading: deviceListFarmerIDLoading } =
    useGetDeviceListByFarmerIDQuery({});

  // Determine the data to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = deviceListFarmerID?.data?.device.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // Determine the total number of pages
  const totalPages = Math.ceil(
    deviceListFarmerID?.data?.device?.length / itemsPerPage,
  );

  return (
    <div className="mb-6 mt-6">
      <div className="block w-full overflow-x-auto rounded shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
        <table className="w-full border-collapse items-center bg-transparent">
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-800">
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Device ID
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Device Name
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Device Model
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Assigned Shed
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {displayData?.length > 0 ? (
              displayData?.map((device: any) => (
                <tr
                  key={device.id}
                  className="border-b border-slate-200 text-black dark:border-slate-700 dark:text-white"
                >
                  <td className="p-1 px-6 text-left text-xs">
                    {device.device_id}
                  </td>
                  <td className="p-1 px-6 text-left text-xs">
                    {device.device}
                  </td>
                  <td className="p-1 px-6 text-left text-xs">
                    {device.device_model}
                  </td>
                  <td className="p-1 px-6 text-left text-xs">
                    {device.shed_name}
                  </td>
                  <td className="p-1 px-6 text-left text-xs">
                    <div className="flex-cols flex gap-1">
                      <button
                        className="btn btn-sm border-0 bg-red-700 text-white hover:bg-red-800"
                        //   onClick={() => onRemove(vaccine.id)}
                      >
                        <GrConfigure size={15} />
                      </button>
                      <Link href={`/shed-monitoring-data/${device.device_id}`}>
                        <button className="btn btn-sm border-0 bg-red-700 text-white hover:bg-red-800">
                          <MdOutlineDataset size={15} />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
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
        data={deviceListFarmerID?.data?.device}
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

export default MyDeviceTable;
