"use client";

import { useBatchReadySellingFilterQuery } from "@/redux/api/batchApi";
import { ApprovedTableComponent } from "./TableComponent";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useState } from "react";

export const ApprovedListTable = () => {
    const [batchNumber,setBatchNumber] = useState<any | null>(null);
    const { data: batchData, isLoading, refetch } = useBatchReadySellingFilterQuery({ ready_to_sale: 'Published', batch_number: batchNumber });
    const handleSubmit = async (data: any) => {
        const {batch_number} = data;
        setBatchNumber(batch_number);
        refetch();
    }
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-4 text-2xl font-bold border-b">MarketPlace Publish Batch List</h1>
            <div className="w-full">
                <div className="mb-3 mt-2 rounded p-3 shadow dark:bg-boxdark">
                    <SportsFrom
                        isReset={false}
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3 mb-3">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                    Batch Number
                                </label>
                                <SportsInput
                                    type="text"
                                    name="batch_number"
                                    placeholder="Enter Batch Number"
                                    style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                                />
                            </div>
                            {/* <div>
                                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                    Shed Name
                                </label>
                                <SportsInput
                                    type="number"
                                    name="batch_number"
                                    placeholder="Enter Selling Price"
                                    style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                                />
                            </div> */}
                            {/* Add more grid items here if needed */}
                        </div>
                       

                        <div className="flex justify-start mb-2">
                            <button
                                type="submit"
                                className="btn btn-sm rounded border-none bg-red-700 text-white hover:bg-red-800"
                            >
                                Filter Batch
                            </button>
                        </div>
                    </SportsFrom>
                </div>
                <ApprovedTableComponent batchData={batchData} isLoading={isLoading} refetch={refetch} routePrefix="/admin/ready-batch/approved-list" />
            </div>
        </div>
    )
}