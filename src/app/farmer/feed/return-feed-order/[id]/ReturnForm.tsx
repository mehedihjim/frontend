"use client";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsTextArea from "@/components/Froms/SportsTextArea";
import { useReturnFeedOrderMutation } from "@/redux/api/feedOrderApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const ReturnForm = ({ feed_order_id }: any) => {
  const router = useRouter();
  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );

  const [returnFeedOrder] = useReturnFeedOrderMutation();
  const handleSubmit = async (values: FieldValues) => {
    const payload = {
      feed_order_id,
      ...values,
    };

    try {
      const res = await returnFeedOrder(payload).unwrap();
      if (res.success) {
        if (resetForm) {
          resetForm({
            return_reason: "",
          });
        }
        toast.success(res?.message || "Feed Ordere Returned!");
        setTimeout(() => {
          router.push(`/farmer/feed/previous-feed-orders`);
        }, 1000);
      } else {
        toast.error(res?.message || "Something went wrong!!");
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong!!");
    }
  };
  return (
    <SportsFrom
      onSubmit={handleSubmit}
      isReset={true}
      setInputValues={(reset) => setResetForm(() => reset)}
    >
      <div className="mb-6 mt-6">
        <div className="mx-4">
          <div className="mb-3">
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Reason for return:
            </label>
            <SportsTextArea
              name="return_reason"
              rows={4}
              placeholder="Write your reason..."
              style="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-sky-800 active:border-sky-800 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-sky-800"
            ></SportsTextArea>
          </div>

          <div className="mt-4 text-right">
            <button
              type="submit"
              className="btn btn-sm top-6 rounded border-none bg-red-700 text-white hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-900"
            >
              Return
            </button>
          </div>
        </div>
      </div>
    </SportsFrom>
  );
};

export default ReturnForm;
