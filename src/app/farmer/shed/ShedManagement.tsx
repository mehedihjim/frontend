// ShedManagement.tsx
"use client";
import React, { useState } from "react";
import { toast } from "sonner";
// Shed API's
import { useGetShedsQuery, useDeleteShedMutation } from "@/redux/api/shedApi";
// Child Components
import { ShedForm } from "./ShedForm";
import { ShedTable } from "./ShedTable";
import { ShedViewModal } from "./ShedViewModal";

export const ShedManagement = () => {
  const [itemToSelect, setItemToSelect] = useState<number | null>(null);
  const [singleShedData, setSingleShedData] = useState<any>({});
  const [shedViewData, setShedViewData] = useState<any>({});
  const { data: shedsData, isLoading, refetch } = useGetShedsQuery({});
  const [deleteShed] = useDeleteShedMutation();

  const handleItemView = (shedData: any) => {
    setItemToSelect(shedData.id);
    setShedViewData(shedData);
  };

  const handleItemEdit = (shedData: any) => {
    setSingleShedData(shedData);
  };

  const handleItemRemove = async (shed_id: number) => {
    try {
      const res = await deleteShed(shed_id).unwrap();
      if (res) {
        refetch();
        toast.success(res?.message || "Shed deleted successfully");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Shed Management</h1>

      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <ShedForm
            refetch={refetch}
            singleShedData={singleShedData}
            setSingleShedData={setSingleShedData}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <ShedTable
            shedsData={shedsData}
            isLoading={isLoading}
            onEdit={handleItemEdit}
            onView={handleItemView}
            onRemove={handleItemRemove}
          />
        </div>
      </div>

      {itemToSelect && (
        <ShedViewModal
          shedViewData={shedViewData}
          onClose={() => setItemToSelect(null)}
        />
      )}
    </div>
  );
};
