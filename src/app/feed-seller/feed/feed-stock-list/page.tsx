"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import StockList from "./StockList";
import UpdateFeedForm from "./UpdateFeedForm";
import { useAppSelector } from "@/redux/hooks";
import { useGetFeedStockListByDealerIdQuery } from "@/redux/api/feedStockApi";

const FeedStockListPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dealer_id = user?.id;
  const {
    data: feedStockList,
    isLoading: feedStockListLoading,
    refetch,
  } = useGetFeedStockListByDealerIdQuery(dealer_id);
  const [singleStockData, setSingleStockData] = useState<any>({});

  const handleItemEdit = (feedStockData: any) => {
    // Implement the edit functionality here
    setSingleStockData(feedStockData);
  };
  return (
    <DefaultLayout>
      <div className="container mx-auto md:p-4">
        <h1 className="mb-4 border-b pb-2 text-2xl font-bold">Stock List</h1>
        <div className="w-full">
          <UpdateFeedForm
            refetch={refetch}
            singleStockData={singleStockData}
            setSingleStockData={setSingleStockData}
            dealerID={dealer_id}
          ></UpdateFeedForm>
          <StockList
            onEdit={handleItemEdit}
            feedStockList={feedStockList?.data}
          ></StockList>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FeedStockListPage;
