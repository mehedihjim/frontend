"use client";
import incomeDefaultValue from "@/app/default_values/account/incomeCreateDefault";
import incomeCreateValidation from "@/app/valodators/account/incomeCreateValidation";
import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useGetBatchQuery } from "@/redux/api/batchApi";
import {
  useCreateIncomeMutation,
  useUpdateIncomeMutation,
} from "@/redux/api/incomeApi";
import { Ibatch } from "@/types/batch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { FaRepeat } from "react-icons/fa6";
import { toast } from "sonner";

export const IncomeFrom = ({
  refetch,
  singleIncomeData,
  setSingeIncomeData,
}: any) => {
  const [submitType, setSubmitType] = useState("create");
  const [selectedItem, setSelectedItem] = useState<Number>();
  const [error, setError] = useState({});
  const [createIncome] = useCreateIncomeMutation();
  const [updateIncome] = useUpdateIncomeMutation();

  const {
    data: batchData,
    isLoading,
    refetch: refetchBatch,
  } = useGetBatchQuery({});
  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );

  useEffect(() => {
    if (singleIncomeData?.id) {
      if (resetForm) {
        resetForm({
          batch_id: singleIncomeData.batch_id,
          date: singleIncomeData.date,
          amount: singleIncomeData.amount,
          expenditure_sector: singleIncomeData.expenditure_sector,
          comment: singleIncomeData.comment,
        });
        setSelectedItem(singleIncomeData.id);
        setSubmitType("update");
      }
    }
  }, [singleIncomeData]);

  const handleSubmit = async (values: FieldValues) => {
    if (submitType === "create") {
      try {
        const res = await createIncome(values).unwrap();
        if (res) {
          setError("");
          refetch();
          toast.success(res?.message || "Shed created successfully");
        } else {
          toast.error(res?.message);
          setError(res?.data || res?.error || "Something went wrong!");
        }
      } catch (err: any) {
        setError(err.errors);
      }
    } else if (submitType === "update") {
      try {
        const res = await updateIncome({
          data: values,
          income_id: selectedItem,
        }).unwrap();
        if (res) {
          if (resetForm) {
            resetForm({
              batch_id: res.data.batch_id,
              date: res.data.date,
              amount: res.data.amount,
              expenditure_sector: res.data.expenditure_sector,
              comment: res.data.comment,
            });
          }
          setError("");
          refetch();
          toast.success(res?.message || "Shed created successfully");
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
    if (resetForm && singleIncomeData) {
      singleIncomeData = [];
      resetForm({
        batch_id: singleIncomeData.batch_id,
        date: singleIncomeData.date,
        amount: singleIncomeData.amount,
        expenditure_sector: singleIncomeData.expenditure_sector,
        comment: singleIncomeData.comment,
      });
      setSubmitType("create");
    }
  };
  return (
    <div className="mb-6 mt-6">
      <SportsFrom
        resolver={zodResolver(incomeCreateValidation)}
        defaultValues={incomeDefaultValue(singleIncomeData)}
        onSubmit={handleSubmit}
        isReset={true}
        setInputValues={(reset) => setResetForm(() => reset)}
      >
        <div className="mb-6 mt-6">
          <div className="table-headline mb-6 dark:text-white">
            {submitType === "create" ? "Create Income" : "Update Income"}
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
                  Expenditure Sector <span className="text-danger">*</span>
                </label>
                <Select
                  name="expenditure_sector"
                  style="select select-bordered w-full max-w-full bg-white dark:bg-black select-sm md:select-md"
                >
                  <option defaultValue="">Select Sector</option>
                  <option value="SHED_READY">SHED_READY</option>
                  <option value="BUY_1_DAY_OLD_CHICKS">
                    BUY 1 DAY OLD CHICKS
                  </option>
                  <option value="FEED">FEED</option>
                  <option value="VACCINE">VACCINE</option>
                  <option value="DOCTOR">DOCTOR</option>
                  <option value="ELECTRICITY">ELECTRICITY</option>
                  <option value="LABORER">LABORER</option>
                  <option value="TRANSPORT">TRANSPORT</option>
                  <option value="SECURITY">SECURITY</option>
                  <option value="Others">Others</option>
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
