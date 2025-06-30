"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import OrderFeedForm from "../OrderFeedForm";

const OrederFeed = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <DefaultLayout>
      {/* Order feed for batch {id} */}
      <div className="container mx-auto md:p-4">
        <h1 className="mb-4 border-b pb-2 text-2xl font-bold">Order Feed</h1>
        <div className="w-full">
          <OrderFeedForm batch_id={id}></OrderFeedForm>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default OrederFeed;
