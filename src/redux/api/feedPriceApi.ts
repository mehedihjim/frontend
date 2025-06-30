import build from "next/dist/build";
import { baseApi } from "./baseApi";

const feedPriceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create New User
    createFeedPrice: build.mutation({
      query: (data) => ({
        url: `/feed-price`,
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
    }),
    getFeedPrice: build.query({
      query: (user_id) => ({
        url: `/feed-price${(user_id && typeof user_id === "string") || typeof user_id === "number" ? "?dealer_id=" + user_id : ""}`,
        method: "GET",
      }),
    }),

    updateFeedPrice: build.mutation({
      query: ({ data, feedprice_id }) => ({
        url: `/feed-price/${feedprice_id}`,
        method: "PUT",
        contentType: "application/json",
        data: data,
      }),
    }),
    deleteFeedPrice: build.mutation({
      query: (feedprice_id) => ({
        url: `/feed-price/${feedprice_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateFeedPriceMutation,
  useGetFeedPriceQuery,
  useUpdateFeedPriceMutation,
  useDeleteFeedPriceMutation,
} = feedPriceApi;
