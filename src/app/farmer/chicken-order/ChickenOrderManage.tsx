"use client";

import { useState } from "react";
import { OrderTable } from "./orderTable";
import { useLoggedUserQuery } from "@/redux/api/userApi";
import { useOrdelistForFarmerQuery, useOrderShowByIdQuery } from "@/redux/api/chickenOrderApi";
import { OrderView } from "./ViewOrder";

export const ChickenOrderManage = () => {
    const { data: user, isLoading: isUserLoading } = useLoggedUserQuery({});
    
    const [orderId,setOrderId] = useState<number | null>();
    // order table api call
    
    const {
        data: orderData,
        isLoading,
        refetch,
    } = useOrdelistForFarmerQuery(user?.data.id);

    const onViewOrder = (order_id: number) => {
        setOrderId(order_id);
        console.log(order_id);
    };

   
 
    if(isUserLoading){
        return <>Loding ...</>
    }
     return (
        <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold border-b">Chicken Order List</h1>
  
        <div className="w-full">
        <OrderTable routePrefix="/farmer/chicken-order" chickenOrderData={orderData} isLoading={isLoading} onView={onViewOrder}></OrderTable>
        </div>
        {/* {orderId &&(
            <OrderView orderData={orderView} onClose={() => setOrderId(null)}></OrderView>
        )} */}
        
        </div>
     )
}