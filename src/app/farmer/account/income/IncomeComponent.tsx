"use client"
import { useDeleteIncomeMutation, useGetIncomeQuery } from "@/redux/api/incomeApi";
import { IncomeFrom } from "./IncomeFrom";
import { IncomeTable } from "./IncomeTable";
import { useState } from "react";
import { DeleteConfrim } from "@/components/common/DeleteConfrim";
import { toast } from "sonner";
import { IncomeView } from "./IncomeView";

export const IncomeComponent = () => {
  const {
    data: incomeData,
    isLoading : incomeLoading,
    refetch,
  } = useGetIncomeQuery({});
  const [singleIncome, setSingleIncomeData] = useState<any>({});
  const [itemDeleteToSelect, setItemDeleteToSelect] = useState<number | null>(null);

  const [deleteIncome] = useDeleteIncomeMutation();
  const [itemToSelect, setItemToSelect] = useState<number | null>(null);

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
        const res = await deleteIncome(batch_id).unwrap();
        if (res) {
          refetch();
          toast.success(res?.message || "Income deleted successfully");
        } else {
          toast.error(res?.message);
          toast.error(res?.data || res?.error || "Something went wrong!");
        }
      } catch (err: any) {
          toast.error( "Something went wrong!");
      } finally {
        closeDeleteShedModal();
      }
    };

  const editHandler = (data: any) => {
    setSingleIncomeData(data);
  };

  const viewIncomeHandler = (data: any) => {
    setItemToSelect(data);
  };

  return (
    <>
      <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold border-b pb-2">Income Management</h1> 
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <IncomeFrom 
            refetch = {refetch}
            singleIncomeData = {singleIncome}
            />
        </div>
        <div className="w-full sm:w-1/2">
        {/* Table section */}
        <IncomeTable 
          incomeData = {incomeData}
          isLoading = {incomeLoading}
          onEdit = {editHandler}
          onRemove = {openDeleteShedModal}
          onView = {viewIncomeHandler}
        />
        </div>
      </div> 
      </div>
      <DeleteConfrim
        titel="Income"
        itemToSelect={itemDeleteToSelect}
        handleItemRemove={handleItemRemove}
        closeDeleteShedModal={closeDeleteShedModal}
        />
      {itemToSelect && (
          <IncomeView
          singleIncome={itemToSelect}
          onClose={() => setItemToSelect(null)}
          />
        )}
    </>
  );
};