"use client";
import { useBatchSummaryQuery } from "@/redux/api/batchApi";
import { AiOutlineUser } from "react-icons/ai";
import { PiHouseLineLight } from "react-icons/pi";
import { PiBirdLight } from "react-icons/pi";
const BatchSummary = ({ batchID }: { batchID: number | string }) => {
  const { data: batchSummary, isLoading: batchSummaryLoading } =
    useBatchSummaryQuery(batchID);

  return (
    <div className="card w-full p-4 shadow-sm dark:bg-slate-800 lg:block">
      <h1 className="text-lg text-red-700 dark:text-red-400 lg:text-xl">
        Batch Information
      </h1>
      <div className=" card flex w-full flex-row md:flex-row">
        <div className="grid hidden h-20 grow rounded-box md:block lg:p-2">
          <div className="flex items-center gap-3 border-0">
            <div className="text-red-700 dark:text-red-400">
              <AiOutlineUser className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
            </div>

            <div className="text-xs sm:text-sm xl:text-base">
              <p className="text-black dark:text-white">
                <span className="font-bold text-red-700 dark:text-red-400">
                  Name:
                </span>{" "}
                {batchSummary?.data?.basic_info?.name}
              </p>
              <p className="text-black dark:text-white">
                <span className="font-bold text-red-700 dark:text-red-400">
                  Phone:
                </span>{" "}
                {batchSummary?.data?.basic_info?.mobile}
              </p>
              <p className="text-black dark:text-white">
                <span className="font-bold text-red-700 dark:text-red-400">
                  Location:
                </span>{" "}
                {batchSummary?.data?.basic_info?.district}
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:divider md:divider-error md:divider-horizontal md:flex"></div>
        <div className=" grid  h-20 grow rounded-box lg:p-2">
          <div className="flex items-center gap-3 border-0">
            <div className="text-red-700 dark:text-red-400">
              <PiHouseLineLight className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
            </div>

            <div className="text-xs sm:text-sm xl:text-base">
              <p className="text-black dark:text-white">
                <span className="font-bold text-red-700 dark:text-red-400">
                  Shed No:
                </span>{" "}
                {batchSummary?.data?.basic_info?.shed_number}
              </p>
              <p className="text-black dark:text-white">
                <span className="font-bold text-red-700 dark:text-red-400">
                  Batch No:
                </span>{" "}
                {batchSummary?.data?.basic_info?.batch_number}
              </p>
              <p className="text-black dark:text-white">
                <span className="font-bold text-red-700 dark:text-red-400">
                  Bird Type:
                </span>{" "}
                {batchSummary?.data?.basic_info?.bird_type}
              </p>
            </div>
          </div>
        </div>
        <div className="divider divider-error m-0 md:divider-horizontal"></div>
        <div className="grid h-20 grow rounded-box lg:p-2">
          <div className="flex items-center gap-2 border-0 md:gap-3">
            <div className="text-red-700 dark:text-red-400">
              <PiBirdLight className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
            </div>

            <div className="text-xs sm:text-sm xl:text-base">
              <p className="text-black dark:text-white">
                <span className="font-bold text-red-700 dark:text-red-400">
                  Bird Count:
                </span>{" "}
                {batchSummary?.data?.basic_info?.bird_count}
              </p>
              <p className="text-black dark:text-white">
                <span className="font-bold text-red-700 dark:text-red-400">
                  Bird Age:
                </span>{" "}
                {batchSummary?.data?.basic_info?.age}
              </p>
              <p className="text-black dark:text-white">
                <span className="font-bold text-red-700 dark:text-red-400">
                  Avg Weight:
                </span>{" "}
                {batchSummary?.data?.basic_info?.average_weight} gm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchSummary;
