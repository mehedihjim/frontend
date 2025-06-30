"use client";
import expenseCreateDefault from "@/app/default_values/account/expenseCreateDefault";
import expenseCreateValidation from "@/app/valodators/account/expenseCreateValidation";
import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useGetBatchQuery } from "@/redux/api/batchApi";
import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
} from "@/redux/api/expenseApi";
import { Ibatch } from "@/types/batch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { FaRepeat } from "react-icons/fa6";
import { toast } from "sonner";

export const ExpenseForm = ({ singleExpenseData, refetch }: any) => {
  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );
  const [submitType, setSubmitType] = useState("create");
  const [error, setError] = useState({});
  const [selectedItem, setSelectedItem] = useState<Number>();

  const [createExpense] = useCreateExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();

  const { data: batchData, isLoading: isBatchLoading } = useGetBatchQuery({});

  useEffect(() => {
    if (singleExpenseData?.id) {
      if (resetForm) {
        resetForm({
          batch_id: singleExpenseData.batch_id,
          date: singleExpenseData.date,
          amount: singleExpenseData.amount,
          source: singleExpenseData.source,
          comment: singleExpenseData.comment,
        });
        setSelectedItem(singleExpenseData.id);
        setSubmitType("update");
      }
    }
  }, [singleExpenseData]);
  const handleSubmit = async (values: FieldValues) => {
    if (submitType === "create") {
      try {
        const res = await createExpense(values).unwrap();
        if (res) {
          setError("");
          refetch();
          toast.success(res?.message || "Expense created successfully");
        } else {
          toast.error(res?.message);
          setError(res?.data || res?.error || "Something went wrong!");
        }
      } catch (err: any) {
        setError(err.errors);
      }
    } else if (submitType === "update") {
      try {
        const res = await updateExpense({
          data: values,
          expense_id: selectedItem,
        }).unwrap();
        if (res) {
          if (resetForm) {
            resetForm({
              batch_id: res.data.batch_id,
              date: res.data.date,
              amount: res.data.amount,
              source: res.data.source,
              comment: res.data.comment,
            });
            setError("");
            refetch();
            toast.success(res?.message || "Expense created successfully");
          }
        } else {
          toast.error(res?.message);
          setError(res?.data || res?.error || "Something went wrong!");
        }
      } catch (err: any) {
        setError(err.errors);
      }
    }
  };
  const reloadFrom = () => {
    if (resetForm && singleExpenseData) {
      singleExpenseData = [];
      resetForm({
        batch_id: singleExpenseData.batch_id,
        date: singleExpenseData.date,
        amount: singleExpenseData.amount,
        expenditure_sector: singleExpenseData.expenditure_sector,
        comment: singleExpenseData.comment,
      });
      setSubmitType("create");
    }
  };

  return (
    <div className="mb-6 mt-6">
      <SportsFrom
        resolver={zodResolver(expenseCreateValidation)}
        defaultValues={expenseCreateDefault(singleExpenseData)}
        onSubmit={handleSubmit}
        isReset={true}
        setInputValues={(reset) => setResetForm(() => reset)}
      >
        <div className="mb-6 mt-6">
          <div className="table-headline mb-6 dark:text-white">
            {submitType === "create" ? "Create Expense" : "Update Expense"}
          </div>
          <div className="rounded-md p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Batch <span className="text-danger">*</span>
                </label>
                <Select
                  name="batch_id"
                  style="select select-bordered w-full max-w-full bg-white dark:bg-black select-sm md:select-md"
                >
                  <option defaultValue="">Select Batch</option>
                  {batchData?.data.map((data: Ibatch) => (
                    <option value={data.id} key={data.id}>
                      {data.batch_number}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Amount <span className="text-danger">*</span>
                </label>
                <SportsInput
                  type="number"
                  name="amount"
                  errors={error}
                  placeholder="Enter Amount"
                  style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                />
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Source <span className="text-danger">*</span>
                </label>
                <Select
                  name="source"
                  style="select select-bordered w-full max-w-full bg-white dark:bg-black select-sm md:select-md"
                >
                  <option defaultValue="">Select Source</option>
                  <option value="SELLING_BIRDS">SELLING BIRDS</option>
                  <option value="SELLING_EGGS">SELLING EGGS</option>
                  <option value="WASTE_SALE">WASTE SALE</option>
                  <option value="SPONSOR">SPONSOR</option>
                  <option value="DONATION">DONATION</option>
                  <option value="OTHERS">OTHERS</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  comment
                </label>
                <SportsInput
                  type="text"
                  name="comment"
                  errors={error}
                  placeholder="Enter comment"
                  style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                />
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="input-container">
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Date <span className="text-danger">*</span>
                </label>
                <SportsInput
                  type="date"
                  name="date"
                  errors={error}
                  placeholder="dd/mm/yyyy"
                  style="input input-date-light input-bordered w-full max-w-full bg-white dark:bg-black dark:input-date-dark input-sm md:input-md"
                />
              </div>
            </div>
            <div className="mt-4 text-right">
              {submitType === "update" && selectedItem && (
                <button
                  onClick={reloadFrom}
                  className="btn btn-sm top-6 mr-3 rounded bg-green-700 text-white hover:bg-green-800"
                >
                  <FaRepeat size={18} className="cursor-pointer" />
                </button>
              )}
              <button
                type="submit"
                className="btn btn-sm top-6 rounded border-none bg-sky-900 text-white hover:bg-sky-950"
              >
                {submitType === "create" ? "Add New" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </SportsFrom>
    </div>
  );
};
