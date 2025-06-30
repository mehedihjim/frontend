"use client";

import { useDeleteExpenseMutation, useGetExpenseQuery } from "@/redux/api/expenseApi";
import { ExpenseForm } from "./ExpenseFrom";
import { ExpenseTable } from "./ExpenseTable";
import { useState } from "react";
import { DeleteConfrim } from "@/components/common/DeleteConfrim";
import { toast } from "sonner";
import { ExpenseView } from "./ExpenseView";

export const ExpenseComponent = () => {
  const [singleExpense, setSingleExpenseData] = useState<any>({});
  const [itemDeleteToSelect, setItemDeleteToSelect] = useState<number | null>(null);
  const { data: expenseData, isLoading, refetch } = useGetExpenseQuery({});

  const [itemView, setItemView] = useState<any>(null);

  const [deleteExpense] = useDeleteExpenseMutation();

  const handleItemEdit = (item: any) => {
    // Implement the edit functionality here
    setSingleExpenseData(item);
  };

  console.log(singleExpense, "single expense");
  const handleItemView = (item: any) => {
    setItemView(item);
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
  const handleItemRemove = async (item: any) => {
    // Implement the remove functionality here
    try {
      const res = await deleteExpense(item).unwrap();
      if (res) {
        refetch();
        toast.success(res?.message || "Expense deleted successfully");
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
        <>
          <div className="container mx-auto p-4">
          <h1 className="mb-4 text-2xl font-bold border-b pb-2">Expense Management</h1> 
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="w-full sm:w-1/2">
             {/* Form section */}
             <ExpenseForm
              refetch={refetch}
              singleExpenseData={singleExpense}
              />
            </div>
            <div className="w-full sm:w-1/2">
            {/* Table section */}
             <ExpenseTable
              expenseData={expenseData}
              isLoading={isLoading}
              onEdit={handleItemEdit}
              onView={handleItemView}
              onRemove={openDeleteShedModal}
              />
            </div>
          </div> 
          </div>
          <DeleteConfrim
            titel="Expense"
            itemToSelect={itemDeleteToSelect}
            handleItemRemove={handleItemRemove}
            closeDeleteShedModal={closeDeleteShedModal}
            />
          {itemView && (
              <ExpenseView
              singleIncome={itemView}
              onClose={() => setItemView(null)}
              />
            )}
        </>
      );
}
