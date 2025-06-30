"use client";
import { useChangeFeedOrderStatusByIdQuery } from "@/redux/api/feedOrderApi";
import { useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";

export const CancelOrderConfrim = ({ itemToSelect, setCancelSuccess }: any) => {
  const [cancelled, setCancelled] = useState<boolean>(false);
  const { data: changedStatusDetail, isLoading: changedStatusDetailLoading } =
    useChangeFeedOrderStatusByIdQuery(
      { feed_order_id: itemToSelect, status: "Cancelled" },
      { skip: !cancelled },
    );

  useEffect(() => {
    if (!changedStatusDetailLoading && changedStatusDetail) {
      // Only after data is successfully received
      setCancelSuccess(true);
      closeCancelOrderModal();
      setCancelled(false); // reset for next time
    }
  }, [changedStatusDetailLoading, changedStatusDetail]);

  const handleOrderCancel = () => {
    setCancelled(true);
  };

  const closeCancelOrderModal = () => {
    const modal = document.getElementById(
      "confirm_cancel_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.close();
  };

  return (
    <dialog id="confirm_cancel_modal" className="modal">
      <div className="modal-box bg-white dark:bg-black">
        <div className="mt-6 flex flex-col items-center text-center">
          <div className="text-lg font-bold">
            <BsExclamationCircle
              size={70}
              className="text-rose-700 dark:text-rose-500"
            />
          </div>
          <p className="mt-2 py-4 text-lg font-medium">
            Are you sure you want to cancel the order?
          </p>
        </div>
        <div className="modal-action">
          <div>
            {/* if there is a button in form, it will close the modal */}
            <div className="flex gap-1">
              <button
                onClick={closeCancelOrderModal}
                type="button"
                className="rounded-1 btn btn-sm border-0 bg-rose-800 text-white hover:bg-rose-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleOrderCancel}
                className="rounded-1 btn btn-sm border-0 bg-sky-900 text-white hover:bg-green-800"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};
