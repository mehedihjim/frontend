"use client";

import { useDeleteBatchMutation, useGetBatchQuery } from "@/redux/api/batchApi";
import { BatchForm } from "./BatchForm";
import { useState } from "react";
import { BatchTable } from "./BatchTable";
import { set } from "zod";
import { toast } from "sonner";
import { BsExclamationCircle } from "react-icons/bs";
import { DeleteConfrim } from "@/components/common/DeleteConfrim";
import { BatchViewModal } from "./BatchViewModal";

export const BatchManagement = () => {
  const {
    data: batchData,
    isLoading: batchLoading,
    refetch,
  } = useGetBatchQuery({});
  const [deleteBatch] = useDeleteBatchMutation();
  const [singleBatchData, setSingleBatchData] = useState<any>({});
  const [batchViewData, setBatchViewData] = useState<any>({});
  const [itemToSelect, setItemToSelect] = useState<number | null>(null);
  const [itemDeleteToSelect, setItemDeleteToSelect] = useState<number | null>(
    null,
  );
  const handleItemEdit = (batchData: any) => {
    // Implement the edit functionality here

    setSingleBatchData(batchData);
  };

  const handleItemView = (batchData: any) => {
    // Implement the view functionality here
    setItemToSelect(batchData);
    setBatchViewData(batchData);
  };
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

  const handleItemRemove = async (batch_id: number) => {
    try {
      const res = await deleteBatch(batch_id).unwrap();
      if (res) {
        refetch();
        toast.success(res?.message || "Batch deleted successfully");
      } else {
        toast.error(res?.message);
        toast.error(res?.data || res?.error || "Something went wrong!");
      }
    } catch (err: any) {
      toast.error("Something went wrong!");
    } finally {
      closeDeleteShedModal();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 border-b pb-2 text-2xl font-bold">
        Batch Management
      </h1>
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="w-full sm:w-1/2">
          {/* from */}
          <BatchForm
            refetch={refetch}
            singleBatchData={singleBatchData}
            setSingleBatchData={setSingleBatchData}
          />
        </div>
        <div className="w-full sm:w-1/2">
          {/* table */}
          <BatchTable
            batchData={batchData}
            isLoading={batchLoading}
            onEdit={handleItemEdit}
            onView={handleItemView}
            onRemove={openDeleteShedModal}
          />
        </div>
      </div>
      <DeleteConfrim
        titel="Batch"
        itemToSelect={itemDeleteToSelect}
        handleItemRemove={handleItemRemove}
        closeDeleteShedModal={closeDeleteShedModal}
      />
      {itemToSelect && (
        <BatchViewModal
          singleBatchData={batchViewData}
          onClose={() => setItemToSelect(null)}
        />
      )}
    </div>
  );
};
