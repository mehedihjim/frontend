"use client";

import { useState } from "react";
import { FeedPriceForm } from "./FeedPriceForm";
import { FeedPriceTable } from "./FeedPriceTable";
import {
  useDeleteFeedPriceMutation,
  useGetFeedPriceQuery,
} from "@/redux/api/feedPriceApi";
import { useLoggedUserQuery } from "@/redux/api/userApi";
import { toast } from "sonner";
import { DeleteConfrim } from "@/components/common/DeleteConfrim";
import { FeedPriceView } from "./FeedPriceView";

export const FeedPriceManage = () => {
  const { data: user, isLoading: isUserLoading } = useLoggedUserQuery({});
  const [editItem, setEditItem] = useState<any>(null);
  const [viewData, setViewData] = useState<any>();
  const [deleteApi] = useDeleteFeedPriceMutation();
  const handleEdit = (item: any) => {
    setEditItem(item);
    console.log(item);
  };
  const [itemDeleteToSelect, setItemDeleteToSelect] = useState<number | null>(
    null,
  );

  const openDeleteShedModal = (item_id: number) => {
    setItemDeleteToSelect(item_id);
    const modal = document.getElementById(
      "delete_shed_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };
  function closeDeleteShedModal() {
    const modal = document.getElementById(
      "delete_shed_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.close();
  }
  let userID = "";

  if (user?.data.user_type === "feed-seller") {
    userID = user?.data.id;
  }
  const { data: feedPrice, isLoading, refetch } = useGetFeedPriceQuery(userID);

  const handleItemView = (item: any) => {
    setViewData(item);
  };
  const handleItemRemove = async (batch_id: number) => {
    try {
      const res = await deleteApi(batch_id).unwrap();
      if (res) {
        refetch();
        toast.success(res?.message || "Feed Price deleted successfully");
      } else {
        toast.error(res?.message);
        toast.error(res?.data || res?.error || "Something went wrong!");
      }
    } catch (err: any) {
      toast.error("Something went wrong!");
    } finally {
      closeDeleteShedModal();
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 border-b pb-2 text-2xl font-bold">Feed Price</h1>
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="w-full sm:w-1/2">
          {/* from */}
          <FeedPriceForm
            refetchData={refetch}
            editData={editItem}
            user={user}
            isUserLoading={isUserLoading}
          />
        </div>
        <div className="w-full sm:w-1/2">
          {/* table */}
          <FeedPriceTable
            feedPrice={feedPrice}
            isLoading={isLoading}
            onEdit={handleEdit}
            onView={handleItemView}
            onRemove={openDeleteShedModal}
          />
        </div>
      </div>
      <DeleteConfrim
        titel="Feed Price"
        itemToSelect={itemDeleteToSelect}
        handleItemRemove={handleItemRemove}
        closeDeleteShedModal={closeDeleteShedModal}
      />
      {viewData && (
        <FeedPriceView
          feedPriceView={viewData}
          onClose={() => setViewData(null)}
          userType={user?.data.user_type}
        />
      )}
    </div>
  );
};
