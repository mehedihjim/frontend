"use client";
import feedStockUpdateValidation from "@/app/valodators/feed/feedStockUpdateValidation";
import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useUpdateFeedStockMutation } from "@/redux/api/feedStockApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const UpdateFeedForm = ({
  refetch,
  singleStockData,
  setSingleStockData,
  dealerID,
}: any) => {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [resetProps, setResetProps] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Number>();

  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );
  const [updateFeedStock] = useUpdateFeedStockMutation();

  useEffect(() => {
    if (singleStockData?.id) {
      if (resetForm) {
        resetForm({
          qty: singleStockData.qty,
          price: singleStockData.price,
          unit: singleStockData.unit,
        });
      }
      setSelectedItem(singleStockData.id);
    }
  }, [singleStockData]);

  const handleSubmit = async (values: FieldValues) => {
    console.log(values, "values from update form");
    const payload = {
      dealer_id: dealerID,
      ...values,
    };

    try {
      const res = await updateFeedStock({
        data: payload,
        feed_list_id: selectedItem,
      }).unwrap();
      if (res) {
        if (resetForm) {
          resetForm({
            qty: "",
            price: "",
            unit: "",
          });
        }
        setSingleStockData(null);
        refetch();
        toast.success(res?.message || "Feed Stock Item Updated Successfully");
      } else {
        toast.error(res?.message);
        setError(res?.data || res?.error || "Something went wrong!");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.errors);
      setLoading(false);
    }
  };
  return (
    <SportsFrom
      // defaultValues={tracebilityDefaultValues(tracebilityData?.data)}
      resolver={zodResolver(feedStockUpdateValidation)}
      onSubmit={handleSubmit}
      isReset={true}
      setInputValues={(reset) => setResetForm(() => reset)}
    >
      <div className="mb-2 mt-6 md:mb-6">
        <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Quantitiy <span className="text-danger">*</span>
            </label>
            <SportsInput
              type="number"
              errors={error}
              name="qty"
              placeholder="Enter Available Qty"
              style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Price
              <span className="text-danger">*</span>
            </label>
            <SportsInput
              type="number"
              errors={error}
              name="price"
              placeholder="Enter Price Per Unit"
              style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Unit
              <span className="text-danger">*</span>
            </label>
            <Select
              name="unit"
              style="select select-sm select-bordered w-full max-w-xs bg-white dark:bg-black md:select-md"
            >
              <option value=""></option>
              <option value="KG">KG</option>
              <option value="Gram">Gram</option>
              <option value="Liter">Liter</option>
              <option value="Ml">mL</option>
              <option value="Piece">Piece</option>
              <option value="Ton">Ton</option>
              <option value="Maund">Maund</option>
            </Select>
          </div>

          {/* Button div positioned at the bottom */}
          <div className="flex items-end justify-end sm:justify-start">
            <button
              className="btn btn-sm w-1/2 border-0 bg-red-700 text-white md:btn-md hover:bg-red-800"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </SportsFrom>
  );
};

export default UpdateFeedForm;
