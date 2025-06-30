import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import ProfilePhotoUploader from "@/components/Froms/SportsProfileUpload";
import React, { useState } from "react";
// Validations
import batchReadyValidation from "@/app/valodators/batch/batchMakeReady";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { formDataPayload } from "@/utils/modifyPayload";
import { useMakeReadyBatchMutation } from "@/redux/api/batchApi";

const BatchReadyForm = ({ batchID }: any) => {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [resetProps, setResetProps] = useState(false);

  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );

  const [makeBatchReady] = useMakeReadyBatchMutation();

  const handleSubmit = async (values: FieldValues) => {
    const payload = {
      batch_id: batchID,
      sale_status: "Ready",
      ...values,
    };

    try {
      const res = await makeBatchReady(formDataPayload(payload)).unwrap();
      if (res) {
        setError("");
        if (resetForm) {
          resetForm({
            average_weight: "",
            weight_count_age: "",
            expected_price: "",
            available_for_sale_count: "",
            sale_status: "",
          });
        }
        setResetProps(true);
        setTimeout(() => setResetProps(false), 0);
        toast.success(res?.message || "Sent to admin to review");
      } else {
        toast.error(res?.message);
        setError(res?.data || res?.error || "Something went wrong!");
      }
    } catch (err: any) {
      setError(err.errors);
    }
  };

  return (
    <SportsFrom
      // defaultValues={tracebilityDefaultValues(tracebilityData?.data)}
      resolver={zodResolver(batchReadyValidation)}
      onSubmit={handleSubmit}
      isReset={true}
      setInputValues={(reset) => setResetForm(() => reset)}
    >
      <div className="mb-6 mt-6">
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Bird's Avg. Weight (gram) <span className="text-danger">*</span>
            </label>
            <SportsInput
              type="text"
              errors={error}
              name="average_weight"
              placeholder="Avg. Weight of Birds"
              style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Bird's Age during Weight Measurement{" "}
              <span className="text-danger">*</span>
            </label>
            <SportsInput
              type="text"
              errors={error}
              name="weight_count_age"
              placeholder="Bird's Age during Measurement"
              style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Expected Price (Per KG)
              <span className="text-danger">*</span>
            </label>
            <SportsInput
              type="text"
              errors={error}
              name="expected_price"
              placeholder="Farmer's Expected Price"
              style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Bird's Sale Count
              <span className="text-danger">*</span>
            </label>
            <SportsInput
              type="text"
              errors={error}
              name="available_for_sale_count"
              placeholder="Total Birds to Sale"
              style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Batch's Photo{" "}
              <span className="label-text-alt text-orange-400"></span>
            </label>
            <ProfilePhotoUploader
              name="image"
              multiple
              resetFiles={resetProps}
              style="file-input file-input-ghost file-input-bordered w-full max-w-xs bg-white dark:bg-black"
            />
          </div>

          {/* Button div positioned at the bottom */}
          <div className="mb-6 flex items-end justify-end sm:justify-start">
            <button
              className="btn btn-md w-1/2 border-0 bg-red-700 text-white hover:bg-red-800"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </SportsFrom>
  );
};

export default BatchReadyForm;
