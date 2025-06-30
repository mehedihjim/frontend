"use client";

import { useState } from "react";
import {ReadyBatchTable} from "./readyBatchTable";
import { useLoggedUserQuery } from "@/redux/api/userApi";
import { useGetReadyBatchQuery } from "@/redux/api/readyToMarketplaceApi";
import { BatchView } from "./ViewBatch";


export const ReadyToMarketPlaceManage = () => {
    const { data: user, isLoading: isUserLoading } = useLoggedUserQuery({});
    
    const [batchId,setBatchId] = useState<number | null>();
    // batch table api call

    const {
        data: batchData,
        isLoading,
        refetch,
    } = useGetReadyBatchQuery(user?.data.id);

    const onViewBatch = (batch_id: number) => {
        setBatchId(batch_id);
        console.log(batch_id);
    };

   
 
    if(isUserLoading){
        return <>Loding ...</>
    }
     return (
        <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold border-b">Ready To Marketplace List</h1>
  
        <div className="w-full">
        <ReadyBatchTable routePrefix="/admin/ready-to-marketplace" readyBatchData={batchData} isLoading={isLoading} onView={onViewBatch}></ReadyBatchTable>
        </div>
        {/* {orderId &&(
            <BatchView batchData={orderView} onClose={() => setBatchId(null)}></BatchView>
        )} */}
        
        </div>
     )
}