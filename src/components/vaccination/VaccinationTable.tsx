"use client";
import Pagination from "@/components/pagination/Pagination";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEye, FaPen } from "react-icons/fa6";

export const VaccinationTable = ({
  vaccinationData,
  isLoading,
  onEdit,
  onView,
  onRemove,
}: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [displayData, setDisplayData] = useState<any[]>([]);

  console.log(displayData);

  // Determine the data to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vaccinationData?.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // Determine the total number of pages
  const totalPages = Math.ceil(vaccinationData?.length / itemsPerPage);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mb-6 mt-6">
      <div className="block w-full overflow-x-auto rounded shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
        <table className="w-full border-collapse items-center bg-transparent">
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-800">
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Vaccination Age
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Disease Name
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Other Disease Name
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
                  className="border-b border-slate-200 dark:border-slate-700"
                >
                  <td className="p-1 px-6 text-left text-xs">{vaccine.age}</td>
                  <td className="p-1 px-6 text-left text-xs">{vaccine.name}</td>
                  <td className="p-1 px-6 text-left text-xs">
                    {vaccine.otherVaccineName}
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
                  colSpan={4}
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
        data={vaccinationData}
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
