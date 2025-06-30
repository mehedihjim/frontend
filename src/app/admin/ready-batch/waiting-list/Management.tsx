"use client";

import { useBatchReadySaleListQuery, useBatchReadySellingRejectMutation } from "@/redux/api/batchApi";
import { BatchWaitingList } from "./WaitingList";

import { useState } from "react";
import { RejectAlert } from "./RejectAlert";
import { toast } from "sonner";

export const ManagementPage = () => {
    const {data: batchData, isLoading,refetch} = useBatchReadySaleListQuery({});
    const [itemDeleteToSelect, setItemDeleteToSelect] = useState<number | null>(null);
    const [rejectApi] = useBatchReadySellingRejectMutation();
    const openDeleteShedModal = (item_id: number) => {
        setItemDeleteToSelect(item_id);
          const modal = document.getElementById(
            "delete_shed_modal",
          ) as HTMLDialogElement | null;
          if (modal) modal.showModal();
        };
  
      const closeDeleteShedModal = () => {
      const modal = document.getElementById(
          "delete_shed_modal",
      ) as HTMLDialogElement | null;
      if (modal) modal.close();
      };
    const handleReject = async (id: number) => {
       try{
            const res = await rejectApi(id).unwrap();
            if (res) {
                closeDeleteShedModal();
                refetch();
                toast.success(res?.message || "Batch rejected successfully");
                setItemDeleteToSelect(null);
            }
        }
        catch (err: any) {
            closeDeleteShedModal();
            setItemDeleteToSelect(null);
            console.log(err);
       }
    };
    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-4 text-2xl font-bold border-b">Saleable Batch List</h1>
            <div className="w-full">
                <BatchWaitingList batchData={batchData} isLoading={isLoading} routePrefix="/admin/ready-batch/waiting-list" onReject={openDeleteShedModal} />
            </div>
            <RejectAlert
            titel="Batch"
            itemToSelect={itemDeleteToSelect}
            handleItemRemove={handleReject}
            closeDeleteShedModal={closeDeleteShedModal}
            />
        </div>
    )
}