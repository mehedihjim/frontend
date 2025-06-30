// ShedManagement.tsx
"use client";
import React, { useState } from "react";
import { toast } from "sonner";
// Shed API's
import { useGetShedsQuery, useDeleteShedMutation } from "@/redux/api/shedApi";
// Child Components
import VaccinationForm from "./VaccinationForm";
import { VaccinationTable } from "./VaccinationTable";
import {
  useDeleteVaccineMutation,
  useSingleVaccinationQuery,
} from "@/redux/api/vaccinationApi";

export const VaccinationManagement = ({ batchID }: any) => {
  const [itemToSelect, setItemToSelect] = useState<number | null>(null);
  const [singleShedData, setSingleShedData] = useState<any>({});
  const [shedViewData, setShedViewData] = useState<any>({});
  const {
    data: vaccinationData,
    isLoading: vaccinationDataLoading,
    refetch,
  } = useSingleVaccinationQuery(batchID);
  const [deleteVaccine] = useDeleteVaccineMutation();

  const handleItemView = (vaccineData: any) => {
    setItemToSelect(vaccineData.id);
    setShedViewData(vaccineData);
  };

  const handleItemEdit = (vaccineData: any) => {
    setSingleShedData(vaccineData);
  };

  const handleItemRemove = async (vaccin_id: number) => {
    try {
      const res = await deleteVaccine(vaccin_id).unwrap();
      if (res) {
        refetch();
        toast.success(res?.message || "Vaccination deleted successfully");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Vaccination</h1>

      <div className="w-full">
        <VaccinationForm batchID={batchID}></VaccinationForm>
      </div>
      <div className="w-full ">
        <VaccinationTable
          vaccinationData={vaccinationData}
          isLoading={vaccinationDataLoading}
          onEdit={handleItemEdit}
          onView={handleItemView}
          onRemove={handleItemRemove}
        />
      </div>
    </div>
  );
};
