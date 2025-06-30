"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useBatchReadySaleListQuery } from "@/redux/api/batchApi";
import { useParams } from "next/navigation";
import { DetailsView } from "./DetailsView";
import { PriceForm } from "./PriceForm";
import Loading from "@/components/loading/Loading";

const SellingPricePage = () =>{
    const { id } = useParams<{ id: string }>();
    const {data: batchData, isLoading,refetch} = useBatchReadySaleListQuery(id);
    if (isLoading) return <Loading />;
    return (
       <DefaultLayout>
            <div className="container mx-auto p-4">
                <h1 className="mb-4 text-2xl font-bold border-b">Set Batch Selling Price</h1>
                <div className="w-full">
                {batchData.data.map((batch:any) => (
                    <DetailsView key={batch.id} data={batch} />
                ))}   
                </div>
                <PriceForm id={id} refetch={refetch}/>
            </div>
        </DefaultLayout>
    )
}
export default SellingPricePage;