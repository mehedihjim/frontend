"use-client";
import SportsFrom from "@/components/Froms/SportsFrom";
import { FieldValues } from "react-hook-form";
import TracebilityFormInputs from "./TracebilityFormInputs";
import { useSingleBatchQuery } from "@/redux/api/batchApi";
import {
  useSingleTracebilityQuery,
  useTracebilityPostMutation,
} from "@/redux/api/tracebilityApi";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import tracebilityDefaultValues from "@/app/default_values/tracebility/tracebilityDefault";
import { useParams } from "next/navigation";

const TracebilityForm = ({ formID }: any) => {
  // Logged in user information from storage
  const { user } = useAppSelector((state) => state.auth);
  // ID from Url param
  const { id } = useParams<{ id: string }>();

  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );

  const { data: batchData, isLoading: batchDataLoading } =
    useSingleBatchQuery(formID);
  const {
    data: tracebilityData,
    isLoading: tracebilityDataLoading,
    refetch,
  } = useSingleTracebilityQuery(formID);
  console.log(tracebilityData?.data, "single tracebility data");

  const [tracebilityPost] = useTracebilityPostMutation();

  useEffect(() => {
    if (tracebilityData) {
      if (resetForm) {
        resetForm({
          sprayedDisinfectants:
            tracebilityData.data?.sprayedDisinfectants || "",
          bleachingCleaned: tracebilityData.data?.bleachingCleaned || "",
          isFumigation: tracebilityData.data?.isFumigation || "",
          isBufferZone: tracebilityData.data?.isBufferZone || "",
          isFootBaths: tracebilityData.data?.isFootBaths || "",
          entrySpary: tracebilityData.data?.entrySpary || "",
          isDeadAnimal: tracebilityData.data?.isDeadAnimal || "",
          companyName: tracebilityData.data?.companyName || "",
          isGovt: tracebilityData.data?.isGovt || "",
          safeWater: tracebilityData.data?.safeWater || "",
          foodCompanyName: tracebilityData.data?.foodCompanyName || "",
          isWaterTest: tracebilityData.data?.isWaterTest || "",
          waterTestMethod: tracebilityData.data?.waterTestMethod || "",
          isPreBiotic: tracebilityData.data?.isPreBiotic || "",
          probioticsDays: tracebilityData.data?.probioticsDays || "",
          isWithdrwalFollow: tracebilityData.data?.isWithdrwalFollow || "",
          antibioticsDays: tracebilityData.data?.antibioticsDays || "",
          doctorAdvice: tracebilityData.data?.doctorAdvice || "",
          advicerType: tracebilityData.data?.advicerType || "",
          dlsRegistered: tracebilityData.data?.dlsRegistered || "",
          dlsRegiNo: tracebilityData.data?.dlsRegiNo || "",
          isCertified: tracebilityData.data?.isCertified || "",
          wasteRemoval: tracebilityData.data?.wasteRemoval || "",
          is40_42_days: tracebilityData.data?.is40_42_days || "",
          isGrowth_chart_used: tracebilityData.data?.isGrowth_chart_used || "",
          growthWeekOne: tracebilityData.data?.growthWeekOne || "",
          growthWeekTwo: tracebilityData.data?.growthWeekTwo || "",
          growthWeekThree: tracebilityData.data?.growthWeekThree || "",
          growthWeekFour: tracebilityData.data?.growthWeekFour || "",
          growthWeekFive: tracebilityData.data?.growthWeekFive || "",
          growthWeekSix: tracebilityData.data?.growthWeekSix || "",
          growthWeekSeven: tracebilityData.data?.growthWeekSeven || "",
          growthWeekEight: tracebilityData.data?.growthWeekEight || "",
          growthWeekNine: tracebilityData.data?.growthWeekNine || "",
        });
      }
    }
  }, [tracebilityData]);

  const handleSubmit = async (values: FieldValues) => {
    console.log(formID, "bacth id");

    let payload = {
      batch_id: formID,
      created_by: user?.id,
      ...values,
    };
    try {
      const res = await tracebilityPost(payload).unwrap();
      if (resetForm) {
        resetForm({
          sprayedDisinfectants: res.data.sprayedDisinfectants || "",
          bleachingCleaned: res.data.bleachingCleaned || "",
          isFumigation: res.data?.isFumigation || "",
          isBufferZone: res.data?.isBufferZone || "",
          isFootBaths: res.data?.isFootBaths || "",
          entrySpary: res.data?.entrySpary || "",
          isDeadAnimal: res.data?.isDeadAnimal || "",
          companyName: res.data?.companyName || "",
          isGovt: res.data?.isGovt || "",
          safeWater: res.data?.safeWater || "",
          foodCompanyName: res.data?.foodCompanyName || "",
          isWaterTest: res.data?.isWaterTest || "",
          waterTestMethod: res.data?.waterTestMethod || "",
          isPreBiotic: res.data?.isPreBiotic || "",
          probioticsDays: res.data?.probioticsDays || "",
          isWithdrwalFollow: res.data?.isWithdrwalFollow || "",
          antibioticsDays: res.data?.antibioticsDays || "",
          doctorAdvice: res.data?.doctorAdvice || "",
          advicerType: res.data?.advicerType || "",
          dlsRegistered: res.data?.dlsRegistered || "",
          dlsRegiNo: res.data?.dlsRegiNo || "",
          isCertified: res.data?.isCertified || "",
          wasteRemoval: res.data?.wasteRemoval || "",
          is40_42_days: res.data?.is40_42_days || "",
          isGrowth_chart_used: res.data?.isGrowth_chart_used || "",
          growthWeekOne: res.data?.growthWeekOne || "",
          growthWeekTwo: res.data?.growthWeekTwo || "",
          growthWeekThree: res.data?.growthWeekThree || "",
          growthWeekFour: res.data?.growthWeekFour || "",
          growthWeekFive: res.data?.growthWeekFive || "",
          growthWeekSix: res.data?.growthWeekSix || "",
          growthWeekSeven: res.data?.growthWeekSeven || "",
          growthWeekEight: res.data?.growthWeekEight || "",
          growthWeekNine: res.data?.growthWeekNine || "",
        });
      }
      toast.success(res?.message || "Data stored successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to store data");
    }
  };
  return (
    <>
      <SportsFrom
        defaultValues={tracebilityDefaultValues(tracebilityData?.data)}
        onSubmit={handleSubmit}
        setInputValues={(reset) => setResetForm(() => reset)}
      >
        <div className="mb-6 mt-6">
          <TracebilityFormInputs
            batchData={batchData?.data}
          ></TracebilityFormInputs>
          <div className="mt-0 grid pb-5">
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 text-center md:right-25 lg:left-auto">
              <button
                type="submit"
                className="btn btn-sm my-1 border-0 bg-green-700 bg-opacity-90 px-20 text-white hover:bg-green-800"
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </SportsFrom>
    </>
  );
};

export default TracebilityForm;
