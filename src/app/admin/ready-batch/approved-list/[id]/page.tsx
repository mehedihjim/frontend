'use client';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useBatchReadySaleListQuery, useBatchReadySellingFilterQuery } from "@/redux/api/batchApi";
import { useParams } from "next/navigation";
import { DetailsView } from "./DetailsView";
import { PriceForm } from "./PriceForm";
import Loading from "@/components/loading/Loading";
import { useRouter } from 'next/navigation';

const SellingPricePage = () =>{
    const { id } = useParams<{ id: string }>();
    const route = useRouter();
    const {data: batchData, isLoading,refetch} = useBatchReadySellingFilterQuery({id:id});
    const moveToList = () => {
        route.push('/admin/ready-batch/approved-list');
    }
    if (isLoading) return <Loading />;
    return (
       <DefaultLayout>
            <div className="container mx-auto p-4">
                <div className="w-full flex justify-between border-b ">
                    <h1 className="mb-2 text-2xl font-bold">Update Batch Selling Price</h1>
                    <button
                        onClick={moveToList}
                        className="btn btn-sm rounded border-none bg-blue-700 text-white hover:bg-red-800"
                    >
                        Back to List
                    </button>
                </div>
                <div className="w-full">
                {batchData.data.map((batch:any) => (
                    <DetailsView key={batch.id} data={batch} />
                ))}   
                </div>
                <PriceForm id={id} refetch={refetch} old_price={batchData.data[0]?.selling_price}/>
            </div>
        </DefaultLayout>
    )
}
export default SellingPricePage;