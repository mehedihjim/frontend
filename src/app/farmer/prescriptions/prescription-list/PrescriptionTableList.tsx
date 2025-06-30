"use client";

import { DeleteConfrim } from "@/components/common/DeleteConfrim";
import Pagination from "@/components/pagination/Pagination";
import { useDeletePrescriptionMutation, usePrescritptionListByStatusQuery } from "@/redux/api/prescriptionApi";
import Link from "next/link";
import { useState } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { FaEye, FaPrescription } from "react-icons/fa6";
import { PiEye } from "react-icons/pi";
import { toast } from "sonner";

export const PrescriptionTableList = ({routePrefix} : any) => {
     const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(10);
      const [displayData, setDisplayData] = useState<any[]>([]);
      const [itemDeleteToSelect, setItemDeleteToSelect] = useState<number | null>(null);
      const {data: panddingPrescription , isLoading: isPendingPrescriptionLoading, refetch} = usePrescritptionListByStatusQuery(''); 
      const [deletePrescription] = useDeletePrescriptionMutation({});
      // Determine the data to display based on the current page
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = panddingPrescription?.data?.slice(
        indexOfFirstItem,
        indexOfLastItem,
      );
      const openDeleteShedModal = (item_id: number) => {
            setItemDeleteToSelect(item_id);
              const modal = document.getElementById(
                "delete_shed_modal",
              ) as HTMLDialogElement | null;
              if (modal) modal.showModal();
            };
      
          const closeDeleteShedModal = () => {
          const modal = document.getElementById(
              "delete_shed_modal",
          ) as HTMLDialogElement | null;
          if (modal) modal.close();
          };
      
          const handleItemRemove = async (prescription: number) => {
              try {
                const res = await deletePrescription(prescription).unwrap();
                if (res) {
                  refetch();
                  toast.success(res?.message || "Prescription deleted successfully");
                } else {
                  toast.error(res?.message);
                  toast.error(res?.data || res?.error || "Something went wrong!");
                }
              } catch (err: any) {
                  toast.error( "Something went wrong!");
              } finally {
                closeDeleteShedModal();
              }
            };
      // Determine the total number of pages
      const totalPages = Math.ceil(panddingPrescription?.data?.length / itemsPerPage);
      if (isPendingPrescriptionLoading) return <p>Loading...</p>;
    return (
        <>
          
          <div className="block w-full overflow-x-auto rounded shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
            <div className="flex justify-between items-center p-4 bg-red-700 dark:bg-slate-800">
              <h3 className="text-lg font-semibold text-white dark:text-blueGray-200">
              Prescription List
              </h3>      
            </div>
            <table className="w-full border-collapse items-center bg-transparent">
              {/* head */}
              <thead>
                <tr className="bg-slate-200 dark:bg-slate-800">
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    ID
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Farmer's Name
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Location
                  </th>                 
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Bird Type
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Age
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Average Weight
                  </th>     
                  {/* <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Payment Status
                  </th> */}
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Status
                  </th>
                  <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
                <tbody>
                    {displayData?.map((data, index) => {
                    return (
                        <tr key={data.id} className="border-b-1 border border-l-0 border-r-0 border-t-0 border-slate-200 dark:border-slate-700">
                        <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">{index + 1}</th>
                        <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">{data?.farmer_name}</td>
                        <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">{data?.district_name}</th>
                        <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">{data?.bird_type}</td>
                        <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">{data?.age}</td>
                        <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">{data?.avg_weight}</td>
                        {/* <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                            <div
                              className={`badge badge-sm p-3 ${
                              data?.payment_status === "Paid"
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                              }`}
                            >
                              {data?.payment_status}
                            </div>
                        </td> */}
                        <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                            {/* status section with conditional badge class */}
                            <div className={`badge badge-sm ${data?.row_status === "Completed" ? "bg-green-500" : "bg-red-500"} text-white p-3`}>
                            {data.row_status}
                            </div>
                        </td>
                        <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                            <div className="flex gap-1">
                              {data?.payment_status === "Pending" || data?.row_status === "Pending" ? (
                                <button className=" btn-disabled" tabIndex={-1} role="button" aria-disabled="true">
                                  <div className="btn btn-sm mr-2 border-0 bg-blue-300 text-white hover:bg-blue-800" data-tip="View">
                                    <FaPrescription /> <PiEye />
                                  </div>
                                </button>
                              ) : (
                                <Link key={data.id} href={`${routePrefix}/${data.id}`}>
                                  <div className="btn btn-sm mr-2 border-0 bg-blue-600 text-white hover:bg-blue-800" data-tip="View">
                                    <FaPrescription /> <PiEye />
                                  </div>
                                </Link>
                              )}
                              {/* <div
                                className="tooltip dark:text-rose-400 btn btn-sm border-0 bg-red-600 text-white hover:bg-red-800"
                                data-tip="Delete"
                              >
                                <FaTrashAlt
                                  className="cursor-pointer mt-2"
                                  size={15}
                                  onClick={() => openDeleteShedModal(data?.id)}
                                />
                              </div> */}
                            </div>
                            
                        </td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
          </div>
          <DeleteConfrim
                      titel="Prescription"
                      itemToSelect={itemDeleteToSelect}
                      handleItemRemove={handleItemRemove}
                      closeDeleteShedModal={closeDeleteShedModal}
                     />
          <Pagination
            data={panddingPrescription?.data}
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