import Pagination from "@/components/pagination/Pagination";
import Link from "next/link";
import { useState } from "react";
import { BiSolidMessageSquareX, BiX } from "react-icons/bi";
import { FaPen } from "react-icons/fa6";

export const ApprovedTableComponent = ({
    batchData,
    isLoading,
    routePrefix
}: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [displayData, setDisplayData] = useState<any[]>([]);

    // Determine the data to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = batchData?.data?.slice(
        indexOfFirstItem,
        indexOfLastItem,
    );

    // Determine the total number of pages
    const totalPages = Math.ceil(batchData?.data?.length / itemsPerPage);
    if (isLoading) return <p>Loading...</p>;
    return (
        <>

            <div className="block w-full overflow-x-auto rounded shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
                <table className="w-full border-collapse items-center bg-transparent">
                    {/* head */}
                    <thead>
                        <tr className="bg-slate-200 dark:bg-slate-800">
                            <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-2 py-2 text-left align-middle text-xs font-semibold uppercase">
                                ID
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-2 py-2 text-left align-middle text-xs font-semibold uppercase">
                                Farmer Name
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-2 py-2 text-left align-middle text-xs font-semibold uppercase">
                                Phone no
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-2 py-2 text-left align-middle text-xs font-semibold uppercase">
                                Shed
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-2 py-2 text-left align-middle text-xs font-semibold uppercase">
                                Batch No
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-2 py-2 text-left align-middle text-xs font-semibold uppercase">
                                Hen Type
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-2 py-2 text-left align-middle text-xs font-semibold uppercase">
                                Chicken Count
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-2 py-2 text-left align-middle text-xs font-semibold uppercase">
                                Avg. Weight
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-2 py-2 text-left align-middle text-xs font-semibold uppercase">
                                Age
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-2 py-2 text-left align-middle text-xs font-semibold uppercase">
                                Upazilla
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-2 py-2 text-left align-middle text-xs font-semibold uppercase">
                                Union
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-2 py-2 text-left align-middle text-xs font-semibold uppercase">
                                Farmer's Price
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-2 py-2 text-left align-middle text-xs font-semibold uppercase">
                                Admin Price
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-2 py-2 text-left align-middle text-xs font-semibold uppercase">
                               Batch Status
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-2 py-2 text-left align-middle text-xs font-semibold uppercase">
                               Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayData?.map((data: any) => (
                            <tr
                                key={data.id}
                                className="border-b-1 border border-l-0 border-r-0 border-t-0 border-slate-200 dark:border-slate-700"
                            >
                                <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-2 text-left align-middle text-xs">
                                    {data.id}
                                </th>
                                <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-2 text-left align-middle text-xs">
                                    {data?.farmer_name}
                                </th>
                                <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-2 text-left align-middle text-xs">
                                    {data?.farmer_phone}
                                </th>
                                <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-2 text-left align-middle text-xs">
                                    {data.shed_name}
                                </th>
                                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-2 text-left align-middle text-xs">
                                    {data.batch_number}
                                </td>
                                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-2 text-left align-middle text-xs">
                                    {data.hen_type}
                                </td>
                                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-2 text-left align-middle text-xs">
                                    {data.available_for_sale_count}
                                </td>
                                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-2 text-left align-middle text-xs">
                                    {data?.average_weight} gm
                                </td>
                                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-2 text-left align-middle text-xs">
                                    {data?.age} days
                                </td>
                                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-2 text-left align-middle text-xs">
                                    {data?.location?.upzilla_name_bn}
                                </td>
                                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-2 text-left align-middle text-xs">
                                    {data?.location?.union_name_bn}
                                </td>
                                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-2 text-left align-middle text-xs">
                                    {data?.expected_price} tk/kg
                                </td>
                                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-2 text-left align-middle text-xs">
                                   <span className="badge badge-warning">{data?.selling_price} tk/kg</span> 
                                </td>
                                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-2 text-left align-middle text-xs">
                                    <span className="badge badge-success text-white">{data?.sale_status}</span>
                                </td>
                                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-2 text-left align-middle text-xs">
                                    <Link key={data.id} href={`${routePrefix}/${data.id}`}>
                                        <div
                                            className="tooltip cursor-pointer text-yellow-500 dark:text-green-400 bg-blue-500 hover:bg-red-600 rounded-full p-2"
                                            data-tip="Price Update"
                                        >
                                            <FaPen
                                                size={15}
                                                className="cursor-pointer"
                                            />
                                        </div>
                                    </Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                data={batchData?.data}
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
