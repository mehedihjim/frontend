import build from "next/dist/build";
import { baseApi } from "./baseApi";
import { url } from "inspector";

export const batchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBatch: build.query({
      query: () => ({
        url: `/batches`,
        method: "GET",
      }),
    }),
    getShedId: build.query({
      query: () => ({
        url: `/sheds`,
        method: "GET",
      }),
    }),
    creatBatch: build.mutation({
      query: (data) => ({
        url: `/batches`,
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
    }),
    makeReadyBatch: build.mutation({
      query: (data) => ({
        url: `/ready-to-sale`,
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
    }),
    updateBatch: build.mutation({
      query: ({ data, batch_id }) => ({
        url: `/batches/${batch_id}`,
        method: "PUT",
        contentType: "application/json",
        data: data,
      }),
    }),
    deleteBatch: build.mutation({
      query: (batch_id) => ({
        url: `/batches/${batch_id}`,
        method: "DELETE",
      }),
    }),
    singleBatch: build.query({
      query: (batch_id) => ({
        url: `/batches/${batch_id}`,
        method: "GET",
      }),
    }),
    batchInformation: build.query({
      query: (batch_id) => ({
        url: `/batches/detail/${batch_id}`,
        method: "GET",
      }),
    }),
    batchSummary: build.query({
      query: (batch_id) => ({
        url: `/batches/summary/${batch_id}`,
        method: "GET",
      }),
    }),
    batchReadySaleList: build.query({
      query: (id) => ({
        url: `/ready-to-sale`,
        method: "GET",
        params: {
          id: id,
        },
      }),
    }),
    batchSellingPriceSet: build.mutation({
      query: ({data,id}) => ({
        url: `/ready-to-sale/${id}`,
        method: "PUT",
        contentType: "application/json",
        data: data,
      }),
    }),
    batchReadySellingReject: build.mutation({
      query: (id) => ({
        url: `/ready-to-sale/reject/${id}`,
        method: "PUT",
      }),
    }),
    batchReadySellingFilter: build.query({
      query: ({ready_to_sale,batch_number,shed_id,id}) => ({
        url: `/ready-to-sale/filter`,
        method: "POST",
        params: {
          ready_to_sale: ready_to_sale,
          shed_id: shed_id,
          batch_number: batch_number,
          id: id,
        }
      }),
    }),
  }),
});

export const {
  useGetBatchQuery,
  useGetShedIdQuery,
  useCreatBatchMutation,
  useMakeReadyBatchMutation,
  useUpdateBatchMutation,
  useDeleteBatchMutation,
  useSingleBatchQuery,
  useBatchInformationQuery,
  useBatchSummaryQuery,
  useBatchReadySaleListQuery,
  useBatchSellingPriceSetMutation,
  useBatchReadySellingRejectMutation,
  useBatchReadySellingFilterQuery,
} = batchApi;
