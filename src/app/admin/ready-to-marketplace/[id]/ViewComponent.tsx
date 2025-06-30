"use client";

import { useState } from "react";

export const ViewComponent = ({ orderData, isLoading }: any) => {
    
    const data = orderData?.data;
    if (isLoading) {
        return <>Loading...</>
    }
   
    let orderPending = "";
    let orderCompleted = "";
    let orderCancelled = "";
    let lineTextPending = " h-5 w-5";
    let lineTextComleted = " h-5 w-5";
    let lineTextCancel = " h-5 w-5";
    
    if (data.status === "Pending" || data.status === "Completed" || data.status === "Cancelled") {
        orderPending = "bg-green-500";
        lineTextPending+= " text-green-600 ";
    } if (data.status === "Completed") {
        orderCompleted = " bg-green-500 "; 
        lineTextComleted+= " text-green-600 ";
    } if (data.status === "Cancelled") {
        orderCompleted = " bg-red-600 ";
        orderCancelled += " bg-red-600";
        lineTextCancel+= " text-red-600";
    } 
    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                <div className="">
                    <h2 className="text-xl font-bold">Order No: #{data?.order_no}</h2>
                    <p><span className="font-bold text-lg">Order Date:</span> <span className="text-orange-600 font-bold">{data?.order_date}</span></p>
                    <p><span className="font-bold text-lg">Status:</span> <span className="bg-blue-700 text-white p-1 rounded">{data?.status}</span></p>
                </div>
                <div className="col-span-3 flex justify-center">
                    <ul className="timeline">
                        <li>
                            <div className="timeline-start">Order Placed</div>
                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={lineTextPending}>
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd" />
                                </svg>
                            </div>

                            <hr className={orderPending} style={{ width: '7vw' }} />
                        </li>
                        <li>
                            <hr className={orderPending} style={{ width: '7vw' }} />
                            <div className="timeline-start">Pending</div>
                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={lineTextPending}>
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd" />
                                </svg>
                            </div>
                            {/* <div className="timeline-end timeline-box">iMac</div> */}
                            <hr className={orderCompleted} style={{ width: '7vw' }} />
                        </li>
                        {(data.status === "Completed" || data.status === "Pending")  && (
                            <li>
                                <hr className={orderCompleted} style={{ width: '7vw' }} />
                                <div className="timeline-start">Completed</div>
                                <div className="timeline-middle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className={lineTextComleted}>
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clipRule="evenodd" />
                                    </svg>
                                </div>
                                {/* {data.status === "Cancelled" && (
                                    <div className="timeline-end timeline-box">iPod</div>
                                )} */}
                            
                            </li>
                        )}
                       
                        {data.status === "Cancelled" && (
                             <li>
                             <hr className={orderCancelled} style={{ width: '7vw'}} />
                             <div className="timeline-start">Cancelled</div>
                             <div className="timeline-middle">
                                 <svg
                                     xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20"
                                     fill="currentColor"
                                     className={lineTextCancel}>
                                     <path
                                         fillRule="evenodd"
                                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                         clipRule="evenodd" />
                                 </svg>
                             </div>
                             {/* <div className="timeline-end timeline-box">iPod</div> */}
 
                         </li>
                        )}
                    </ul>
                </div>
                <div className=" col-span-2 shadow">
                    <div className="bg-blue-600 text-white p-2 rounded">
                        <h3>Order Details </h3>
                    </div>
                    <table className="table table-borderless bg-white rounded-none">
                        <tbody>
                            <tr>
                                <td className="border-b" colSpan={2}>Batch Number</td>
                                <td className="text-end border-b">{data?.batch_number}</td>
                            </tr>
                            <tr>
                                <td className="border-b" colSpan={2}>Shed</td>
                                <td className="text-end border-b">{data?.shed_name}</td>
                            </tr>
                            <tr>
                                <td className="border-b" colSpan={2}>Type of Hen</td>
                                <td className="text-end border-b">{data?.hen_type}</td>
                            </tr>
                            <tr>
                                <td className="border-b" colSpan={2}>Number of Hen</td>
                                <td className="text-end border-b">{data?.chicken_number}</td>
                            </tr>
                            <tr>
                                <td className="border-b" colSpan={2}>Average Weight</td>
                                <td className="text-end border-b">{data?.avg_weight}</td>
                            </tr>
                            <tr>
                                <td className="border-b" colSpan={2}>Age</td>
                                <td className="text-end border-b">{data?.age_of_batch}</td>
                            </tr>
                            <tr>
                                <td className="font-bold" colSpan={2}>Rate (per kg)</td>
                                <td className="text-end font-bold">{data?.price_kg} TK</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="">
                    <div className="bg-blue-600 text-white p-2 rounded">
                        <h3>Farm Information</h3>
                    </div>
                    <table className="table table-borderless bg-white rounded-none shadow">
                        <tbody>
                            <tr>
                                <td className="border-b" colSpan={2}>Farmer Name</td>
                                <td className="text-end border-b">{data?.farmer_info?.name}</td>
                            </tr>
                            <tr>
                                <td className="border-b" colSpan={2}>Union Name</td>
                                <td className="text-end border-b">{data?.farmer_info?.union_name}</td>
                            </tr>
                            <tr>
                                <td className="border-b" colSpan={2}>District</td>
                                <td className="text-end border-b">{data?.farmer_info?.district_name}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Division</td>
                                <td className="text-end ">{data?.farmer_info?.division_name}</td>
                            </tr>
                            {/* <tr>
                                        <td className="border-b" colSpan={2}>Shipping Address</td>
                                        <td className="text-end ">{data?.shipping_info?.address || "No address provided"}</td>
                                    </tr> */}
                        </tbody>

                    </table>
                </div>
                <div className="bg-amber-100 col-span-2">
                    <div className="bg-orange-600 text-white p-2 rounded">
                        <h3>Shipping Infromation</h3>
                    </div>
                    <table className="table table-borderless shadow rounded-none">
                        <tbody>
                            <tr>
                                <td className="border-b" colSpan={2}>Buyer Name</td>
                                <td className="text-end border-b">{data?.shipping_info?.name}</td>
                            </tr>
                            <tr>
                                <td className="border-b" colSpan={2}>Union Name</td>
                                <td className="text-end border-b">{data?.shipping_info?.union_name}</td>
                            </tr>
                            <tr>
                                <td className="border-b" colSpan={2}>District</td>
                                <td className="text-end border-b">{data?.shipping_info?.district_name}</td>
                            </tr>
                            <tr>
                                <td className="border-b" colSpan={2}>Division</td>
                                <td className="text-end border-b">{data?.shipping_info?.division_name}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Shipping Address</td>
                                <td className="text-end ">{data?.address || "No address provided"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}