import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../api/baseApi";

export const stocksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    stockIn: build.mutation({
      query: (data) => ({
        url: `/stock-store`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }),
      invalidatesTags: [{ type: tagTypes.stock, id: "LIST" }],
    }),

    stockOut: build.mutation({
      query: (data) => ({
        url: `/stock-out-store`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }),
      invalidatesTags: [{ type: tagTypes.stock, id: "LIST" }],
    }),

    getStocksItems: build.query({
      query: () => ({
        url: "/stock",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: tagTypes.stock, id: "LIST" },
              ...result.data.map(({ id }: { id: string | number }) => ({
                type: tagTypes.stock,
                id,
              })),
            ]
          : [{ type: tagTypes.stock, id: "LIST" }],
    }),

    getStockInReport: build.query({
      query: () => ({
        url: "/stock-in-report",
        method: "GET",
      }),

      providesTags: (result) =>
        result
          ? [
              { type: tagTypes.stock, id: "LIST" },
              ...result.data.map(({ id }: { id: string | number }) => ({
                type: tagTypes.stock,
                id,
              })),
            ]
          : [{ type: tagTypes.stock, id: "LIST" }],
    }),

    getStockOutReport: build.query({
      query: () => ({
        url: "/stock-out-report",
        method: "GET",
      }),

      providesTags: (result) =>
        result
          ? [
              { type: tagTypes.stock, id: "LIST" },
              ...result.data.map(({ id }: { id: string | number }) => ({
                type: tagTypes.stock,
                id,
              })),
            ]
          : [{ type: tagTypes.stock, id: "LIST" }],
    }),

    getCurrentStockReport: build.query({
      query: (params) => ({
        url: "/stock-report",
        method: "GET",
        params: {
          item_id: params?.item_id ? params?.item_id : undefined,
          finance_year_id: params?.finance_year_id
            ? params?.finance_year_id
            : undefined,
        },
      }),

      providesTags: (result) =>
        result
          ? [
              { type: tagTypes.stock, id: "LIST" },
              ...result.data.map(({ id }: { id: string | number }) => ({
                type: tagTypes.stock,
                id,
              })),
            ]
          : [{ type: tagTypes.stock, id: "LIST" }],
    }),
  }),
});

export const {
  useGetStocksItemsQuery,
  useStockInMutation,
  useStockOutMutation,
  useGetStockInReportQuery,
  useGetStockOutReportQuery,
  useGetCurrentStockReportQuery,
} = stocksApi;
