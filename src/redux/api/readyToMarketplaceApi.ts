import build from "next/dist/build";
import { baseApi } from "./baseApi";

const readyToMarketplaceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
         getReadyBatch : build.query({
            query : () =>({
                url:`/batches?ready_to_sale=Ready`,
                method:'GET'
            }),
         }),
         updateReadyBatch : build.mutation({
             query: (data) => ({
                 url : `/ready-to-sale`,
                 method : 'POST',
                 contentType : 'application/json',
                 data : data
             }),
         }),

    })
});

export const {useGetReadyBatchQuery,useUpdateReadyBatchMutation} = readyToMarketplaceApi;