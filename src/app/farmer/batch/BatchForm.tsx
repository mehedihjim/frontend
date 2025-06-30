import batchCreateDefaultValues from "@/app/default_values/batch_create/batchCreateDefault";
import batchCreateValidation from "@/app/valodators/batch/batchCreateValidator";
import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";

import {
  useCreatBatchMutation,
  useGetBatchQuery,
  useUpdateBatchMutation,
} from "@/redux/api/batchApi";
import { useGetShedsQuery } from "@/redux/api/shedApi";
import { IShed } from "@/types/shed.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { FaRepeat } from "react-icons/fa6";
import { toast } from "sonner";

export const BatchForm = ({
  refetch,
  singleBatchData,
  setSingleBatchData,
  handleItemEdit,
}: any) => {
  const [submitType, setSubmitType] = useState("create");
  const [selectedItem, setSelectedItem] = useState<Number>();
  const [formValues, setFormValues] = useState<any>({});
  const [createBatch] = useCreatBatchMutation();
  const [updateBatch] = useUpdateBatchMutation();

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );

  const { data: shedList, isLoading: shedLoading } = useGetShedsQuery({});
  const shedData = shedList?.data;
  useEffect(() => {
    if (singleBatchData?.id) {
      if (resetForm) {
        resetForm({
          batch_number: singleBatchData.batch_number,
          shed_id: singleBatchData.shed_id,
          hen_type: singleBatchData.hen_type,
          chick_number: singleBatchData.chick_number,
          chick_price: singleBatchData.chick_price,
          start_date: singleBatchData.start_date,
        });
      }
      setSelectedItem(singleBatchData.id);
      setSubmitType("update");
    }
  }, [singleBatchData]);

  const handleSubmit = async (values: FieldValues) => {
    if (submitType === "create") {
      try {
        const res = await createBatch(values).unwrap();
        if (res) {
          setError("");
          setFormValues({});
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
        const res = await updateBatch({
          data: values,
          batch_id: selectedItem,
        }).unwrap();
        if (res) {
          if (resetForm) {
            resetForm({
              shed_id: res.data.shed_id,
              batch_number: res.data.batch_number,
              hen_type: res.data.hen_type,
              chick_number: res.data.chick_number,
              chick_price: res.data.chick_price,
              start_date: res.data.start_date,
            });
          }
          setFormValues({});
          // setSingleBatchData(null);
          refetch();
          toast.success(res?.message || "Shed updated successfully");
        } else {
          toast.error(res?.message);
          setError(res?.data || res?.error || "Something went wrong!");
          setLoading(false);
        }
      } catch (err: any) {
        setError(err.errors);
        setLoading(false);
      }
    }
  };
  const reloadFrom = () => {
    if (resetForm && singleBatchData) {
      console.log(singleBatchData, "Single batch data from reload");

      singleBatchData = [];
      resetForm({
        batch_number: singleBatchData.batch_number,
        shed_id: singleBatchData.shed_id,
        hen_type: singleBatchData.hen_type,
        chick_number: singleBatchData.chick_number,
        chick_price: singleBatchData.chick_price,
        start_date: singleBatchData.start_date,
      });
      setSubmitType("create");
    }
  };
  return (
    <SportsFrom
      resolver={zodResolver(batchCreateValidation)}
      defaultValues={batchCreateDefaultValues(singleBatchData)}
      onSubmit={handleSubmit}
      isReset={true}
      setInputValues={(reset) => setResetForm(() => reset)}
    >
      <div className="mb-6 mt-6">
        <div className="table-headline mb-6 dark:text-white">
          {submitType === "create" ? "Create Batch" : "Update Batch"}
        </div>
        <div className="rounded-md p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Shed <span className="text-danger">*</span>
              </label>
              <Select
                name="shed_id"
                style="select select-bordered w-full max-w-full bg-white dark:bg-black select-sm md:select-md"
              >
                <option defaultValue="">Select Shed</option>
                {shedList?.data.map((data: IShed) => (
                  <option value={data.id} key={data.id}>
                    {data.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Batch Number
              </label>
              <SportsInput
                type="text"
                name="batch_number"
                errors={error}
                placeholder="Enter Batch Number"
                style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
              />
            </div>
          </div>
          <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Hen Type
              </label>
              <Select
                name="hen_type"
                style="select select-bordered w-full max-w-full bg-white dark:bg-black select-sm md:select-md"
              >
                <option value="">Select Hen Type</option>
                <option value="Sonali">Sonali</option>
                <option value="Broiler">Broiler</option>
                <option value="Hybrid Layer">Hybrid Layer</option>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Chick Number
              </label>
              <SportsInput
                type="text"
                name="chick_number"
                errors={error}
                placeholder="Enter Chicken Number"
                style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
              />
            </div>
          </div>
          <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Chick Price
              </label>
              <SportsInput
                type="text"
                name="chick_price"
                errors={error}
                placeholder="Enter chicken price"
                style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
              />
            </div>
            <div className="input-container">
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Start Date <span className="text-danger">*</span>
              </label>
              <SportsInput
                type="date"
                name="start_date"
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
              className="btn btn-sm top-6 rounded border-none bg-red-700 text-white hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-900"
            >
              {submitType === "create" ? "Add batch" : "Edit Batch"}
            </button>
          </div>
        </div>
      </div>
    </SportsFrom>
  );
};
