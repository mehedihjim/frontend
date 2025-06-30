"use client";

import SportsFrom from "@/components/Froms/SportsFrom";
import ProfilePhotoUploader from "@/components/Froms/SportsProfileUpload";
import SportsTextArea from "@/components/Froms/SportsTextArea";
import { useStoreManualPrescriptionMutation } from "@/redux/api/prescriptionApi";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IoMdPhotos } from "react-icons/io";
import { LuUpload } from "react-icons/lu";
import { toast } from "sonner";

const PresForm = ({ batch_id }: any) => {
  const [resetProps, setResetProps] = useState<boolean>(false);
  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );
  const [createApi ] = useStoreManualPrescriptionMutation();
  const [error, setError] = useState({});
  const [submitType, setSubmitType] = useState<string>("create");
  const user = useAppSelector((state) => state.auth.user);
  const handleSubmit = async (values: FieldValues) => {
    // Add your form submission logic here
    const data = { ...values, farmer_id: user?.id, batch_id: batch_id };
   
      try {
        const res = await createApi(data).unwrap();
        if (res) {
          if(resetForm) {
            resetForm({
              description: "",
            });
          }
          setError("");
          setResetProps(true);
          
          toast.success(res?.message || "Shed created successfully");
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
      // resolver={zodResolver(batchCreateValidation)}
      // defaultValues={batchCreateDefaultValues(singleBatchData)}
      onSubmit={handleSubmit}
      isReset={true}
      setInputValues={(reset) => setResetForm(() => reset)}
    >
      <div className="mb-6 mt-6">
        <div className="table-headline mb-6 dark:text-white">
          {submitType === "create" ? "Create Prescription" : "Update Prescription"}
        </div>
        <div className="rounded-md p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
          <div className="mt-3 grid grid-cols-1 md:grid-cols-1">
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Description<span className="text-danger">*</span>
              </label>
              <SportsTextArea
                name="description"
                rows={4}
                placeholder="Default textarea"
                style="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-sky-800 active:border-sky-800 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-sky-800"
              ></SportsTextArea>
            </div>

            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              <div className="flex flex-row place-items-center">
                {/* <CgAttachment /> */}
                <IoMdPhotos size={18} />
                &nbsp; Add Photos
              </div>
            </label>
            <div
              id="FileUpload"
              className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-sky-900 bg-gray px-4 py-4 dark:border-sky-200 dark:bg-meta-4 sm:py-7.5"
            >
              <ProfilePhotoUploader
                name="image"
                multiple
                style="absolute inset-0 z-10 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                resetFiles={resetProps}
              />
              <div className="flex flex-col items-center justify-center space-y-1">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                  <LuUpload />
                </span>
                <p>
                  <span className="text-primary dark:text-sky-200">
                    Click to upload{" "}
                  </span>
                  or{" "}
                  <span className="text-primary dark:text-sky-200">
                    drag and drop
                  </span>
                </p>
                <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                {/* <p>(max, 800 X 800px)</p> */}
              </div>
            </div>
            <div className="mt-4 text-right">
                {/* {submitType === "update" && selectedItem && (
                  <button
                    onClick={reloadFrom}
                    className="btn btn-sm top-6 mr-3 rounded bg-green-700 text-white hover:bg-green-800"
                  >
                    <FaRepeat size={18} className="cursor-pointer" />
                  </button>
                )} */}
                <button
                  type="submit"
                  className="btn btn-sm top-6 rounded border-none bg-sky-900 text-white hover:bg-sky-950"
                >
                  {submitType === "create" ? "Add New" : "Update"}
                </button>
              </div>
          </div>
        </div>
      </div>
    </SportsFrom>
  );
};

export default PresForm;