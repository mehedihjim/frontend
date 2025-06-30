"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import { ViewComponent } from "./ViewComponent";
import { useOrderShowByIdQuery } from "@/redux/api/chickenOrderApi";

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: orderView, isLoading: isOrderViewLoading } =
    useOrderShowByIdQuery(id);
  return (
    <div>
      <DefaultLayout>
        <div className="container mx-auto p-4">
          <h1 className="mb-4 border-b text-2xl font-bold">
            Chicken Order Information
          </h1>
          <ViewComponent
            orderData={orderView}
            isLoading={isOrderViewLoading}
          ></ViewComponent>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default OrderDetails;
