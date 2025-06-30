"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetBatchQuery } from "@/redux/api/batchApi";
import Link from "next/link";

interface BatchCardGridProps {
  routePrefix: string;
  pageType?: string;
}

const henTypeImages: Record<string, string> = {
  Broiler: "/images/chicken/broiler.jpg",
  Sonali: "/images/chicken/sonali.jpg",
  "Hybrid Layer": "/images/chicken/layer.png",
};

const BatchCardGrid = ({ routePrefix, pageType }: BatchCardGridProps) => {
  const { data: allBatchData, isLoading: allBatchDataLoading } =
    useGetBatchQuery({});

  const renderBatchCards = (batches: any[]) => {
    return batches.map((batchData) => (
      <Link key={batchData.id} href={`${routePrefix}/${batchData.id}`}>
        <div className="cursor-pointer rounded-lg bg-sky-50 p-4 shadow-xl transition duration-300 hover:shadow-2xl dark:bg-slate-800 sm:p-5">
          {henTypeImages[batchData.hen_type] && (
            <img
              className="h-auto max-h-40 w-full rounded-lg object-cover sm:max-h-48"
              src={henTypeImages[batchData.hen_type]}
              alt={`${batchData.hen_type} Hen`}
            />
          )}
          <div className="mt-3 flex items-center justify-between">
            <h1 className="text-[clamp(12px,1vw,14px)]">
              <span className="font-semibold">Shed:</span>{" "}
              <span className="font-normal">{batchData.shed_name}</span>
            </h1>
            <h1 className="text-[clamp(12px,1vw,14px)]">
              <span className="font-semibold">Batch:</span>{" "}
              <span className="font-normal">{batchData.batch_number}</span>
            </h1>
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-2 gap-3 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {pageType === "makeReady"
          ? renderBatchCards(
              allBatchData?.data.filter(
                (batchData: any) => batchData?.sale_status !== "Ready",
              ) || [],
            )
          : renderBatchCards(allBatchData?.data || [])}
      </div>
    </DefaultLayout>
  );
};

export default BatchCardGrid;
