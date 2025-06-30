"use client";

import { useDeleteFeedlistMutation, useGetFeedlistQuery } from "@/redux/api/feedlistApi";
import { FeedListForm } from "./FeedListForm";
import { FeedListTable } from "./FeedListTable";
import React, { useState } from "react";
import { toast } from "sonner";
import { DeleteConfrim } from "@/components/common/DeleteConfrim";
import { useLoggedUserQuery } from "@/redux/api/userApi";

export const FeedListManage = () => {
    const [selectItems, setSelectItems] = useState<any>();
    const [itemDeleteToSelect, setItemDeleteToSelect] = useState<number | null>(null);
    const {data : feedlistData, isLoading,refetch} = useGetFeedlistQuery({});
   
    
    const [deleteApi] = useDeleteFeedlistMutation();
    const openDeleteShedModal = (item_id: number) => {
        setItemDeleteToSelect(item_id);
          const modal = document.getElementById(
            "delete_shed_modal",
          ) as HTMLDialogElement | null;
          if (modal) modal.showModal();
        };
      function closeDeleteShedModal() {
        const modal = document.getElementById(
            "delete_shed_modal"
        ) as HTMLDialogElement | null;
        if (modal) modal.close();
    }
  
      const handleItemRemove = async (batch_id: number) => {
          try {
            const res = await deleteApi(batch_id).unwrap();
            if (res) {
              refetch();
              toast.success(res?.message || "Officer deleted successfully");
            } else {
              toast.error(res?.message);
              toast.error(res?.data || res?.error || "Something went wrong!");
            }
          } catch (err: any) {
              toast.error( "Something went wrong!");
          } finally {
            closeDeleteShedModal();
          }
        };
    const handleEdit= (item:any) => {
        setSelectItems(item);
    }
    
    return (
            <div className="container mx-auto p-4">
              <h1 className="mb-4 text-2xl font-bold border-b pb-2">Feed List</h1>
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="w-full sm:w-1/2">
                 {/* from */}
                    <FeedListForm 
                        refetch = {refetch}
                        editData={selectItems}
                     />
                </div>
                <div className="w-full sm:w-1/2">
                 {/* table */}
                    <FeedListTable 
                        feedListData = {feedlistData}
                        onRemove = {openDeleteShedModal}
                        onEdit = {handleEdit}
                    />
                </div>
              </div>
              <DeleteConfrim
                titel="Feed List"
                itemToSelect={itemDeleteToSelect}
                handleItemRemove={handleItemRemove}
                closeDeleteShedModal={closeDeleteShedModal}
               />
              
            </div>
          );
}