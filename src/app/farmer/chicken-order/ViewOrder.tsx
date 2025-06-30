"use client";

export const OrderView = ({ orderData, onClose }: any) => {
    console.log(orderData); // Debugging line, can be removed later

    // Extract order data from the API response
    const data = orderData?.data;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-10">
            <div className="w-1/2 rounded bg-white p-4 shadow-lg dark:bg-black">
                <div className="mt-6 overflow-x-auto">
                    <div className="mb-6 text-center text-2xl font-semibold text-sky-950 dark:text-white border-b">
                        Order Information
                    </div>
                    <div>
                        <h2 className="text-xl text-black-2">Date: {data?.order_date} </h2>
                        <h3 className="text-xl text-black-2">Status: <span className="bg-green-500 text-white px-2 rounded">{data?.status}</span> </h3>
                    </div>

                    <div className="flex flex-col gap-6 sm:flex-row mt-4">
                        <div className="w-full sm:w-1/2 bg-slate-100">
                            <div className="bg-blue-600 text-white p-2 rounded">
                                <h3>Order Details</h3>
                            </div>
                            <table className="table table-borderless">
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
                                        <td className="text-end font-bold">{data?.price_kg}</td>
                                    </tr>  
                                </tbody>
                                
                            </table>
                        </div>
                        <div className="w-full sm:w-1/3 ">
                            <div className="bg-blue-600 text-white p-2 rounded">
                                <h3>Farm information</h3>
                            </div>
                            <table className="table table-borderless bg-slate-100 rounded-none">
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
                    </div>
                    <div className="flex flex-col gap-6 sm:flex-row mt-4">
                        <div className="w-full sm:w-1/2 bg-slate-100">
                            <div className="bg-orange-600 text-white p-2 rounded">
                                <h3>Shipping Infromation</h3>
                            </div>
                            <table className="table table-borderless">
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
                                        <td className="text-end ">{data?.shipping_info?.address || "No address provided"}</td>
                                    </tr>
                                </tbody>
                               
                            </table>
                            
                        </div>
                    </div>
                </div>
                <div className="modal-action">
                    <div>
                        <div className="flex gap-1">
                            <button
                                onClick={onClose}
                                type="button"
                                className="rounded-1 btn btn-sm border-0 bg-rose-800 text-white hover:bg-rose-900"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
