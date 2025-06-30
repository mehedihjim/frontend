import build from "next/dist/build";
import { baseApi } from "./baseApi";
import { all } from "axios";

const chickenOrderApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // Create New User
        ordelistForFarmer: build.query({
            query: (user_id) => ({
                url: `/bird-order-list/seller/${user_id}`,
                method: "GET",
            }),
        }),
        allOrderList: build.query({
            query: () => ({
                url: `/bird-order/list`,
                method: "GET",
            }),
        }),
        orderShowById: build.query({
            query: (id) => ({
                url: `/bird-order/${id}`,
                method: "GET",
            }),
        })
    }),
});

export const {
    useOrdelistForFarmerQuery,
    useAllOrderListQuery,
    useOrderShowByIdQuery
} = chickenOrderApi;