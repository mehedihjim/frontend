import Pagination from "@/components/pagination/Pagination";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEye, FaPen } from "react-icons/fa6";

export const FeedListTable = ({
  feedListData,
  isLoading,
  onEdit,
  onRemove,
}: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [displayData, setDisplayData] = useState<any[]>([]);

  // Determine the data to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedListData?.data?.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // Determine the total number of pages
  const totalPages = Math.ceil(feedListData?.data?.length / itemsPerPage);
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <div className="mb-6 mt-6 ">
        <div className="table-headline mb-6 dark:text-white">Feed List</div>
      </div>
      <div className="block w-full overflow-x-auto rounded shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
        <table className="w-full border-collapse items-center bg-transparent">
          {/* head */}
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-800">
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                ID
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Feed Name
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Feed Type
              </th>

              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData?.map((data: any) => (
              <tr
                key={data.id}
                className="border-b-1 border border-l-0 border-r-0 border-t-0 border-slate-200 dark:border-slate-700"
              >
                <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  {data.id}
                </th>
                <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  {data.name}
                </th>
                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  {data.feed_type}
                </td>
               
                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  <div className="flex gap-2">
                    <div
                      className="tooltip cursor-pointer text-green-800 dark:text-green-400"
                      data-tip="Edit"
                    >
                      <FaPen
                        onClick={() => onEdit(data)}
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
                    <div
                      className="tooltip pe-2 text-rose-500 dark:text-rose-400"
                      data-tip="Delete"
                    >
                      <FaTrashAlt
                        className="cursor-pointer"
                        size={15}
                        onClick={() => onRemove(data.id)}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        data={feedListData?.data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalPages={totalPages}
        setDisplayData={setDisplayData}
      ></Pagination>
    </>
  );
};
