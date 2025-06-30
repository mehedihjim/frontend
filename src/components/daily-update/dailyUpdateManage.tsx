"use client";
import { useDeleteDailyUpdateMutation, useFilterByBatchDailyUpdateQuery, useGetDailyUpdateQuery } from "@/redux/api/dailyupdateApi";
import { DailyForm } from "./dailyFrom";
import { DailyTable } from "./dailyTable";
import { DeleteConfrim } from "../common/DeleteConfrim";
import { toast } from "sonner";
import { useState } from "react";

export const DailyUpdateManage = ({batchId} : any) => {
    const {data:dailyData,isLoading:dailyDataLoading,refetch} = useFilterByBatchDailyUpdateQuery(batchId);
    const [itemDeleteToSelect, setItemDeleteToSelect] = useState<number | null>(null);
    const [deleteState] = useDeleteDailyUpdateMutation();
    const [singleShedData, setSingleShedData] = useState<any>({});
    
   const openDeleteShedModal = (item_id: number) => {

    setItemDeleteToSelect(item_id);
      const modal = document.getElementById(
        "delete_shed_modal",
      ) as HTMLDialogElement | null;
      if (modal) modal.showModal();
    };

    const handleItemEdit = (item: any) => {
       
        setSingleShedData(item);
    }
  const closeDeleteShedModal = () => {
  const modal = document.getElementById(
      "delete_shed_modal",
  ) as HTMLDialogElement | null;
  if (modal) modal.close();
  };
  const handleItemRemove = async (item: any) => {
    // Implement the remove functionality here
    try {
      const res = await deleteState(item).unwrap();
      if (res) {
        refetch();
        toast.success(res?.message || "Daily-Update deleted successfully");
      }else{
        toast.error(res?.message);
        toast.error(res?.data || res?.error || "Something went wrong!");
      }
    } catch (err : any) {
      toast.error( "Something went wrong!");
    } finally {
      closeDeleteShedModal();
    }
  };

    return (
        <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold border-b">Daily-Update Management</h1>

      <div className="w-full">
        <DailyForm 
            batchid={batchId} 
            refetch={refetch} 
            updateData={singleShedData}
            />
      </div>
      <div className="w-full ">
        <DailyTable 
            dailyUpdateData={dailyData}
            isLoading={dailyDataLoading}
            onRemove={openDeleteShedModal}
            onEdit = {handleItemEdit}
        />
      </div>
      <DeleteConfrim
        titel="Expense"
        itemToSelect={itemDeleteToSelect}
        handleItemRemove={handleItemRemove}
        closeDeleteShedModal={closeDeleteShedModal}
        />
    </div>
    );
};