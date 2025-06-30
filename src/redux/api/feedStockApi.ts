import { baseApi } from "./baseApi";

const feedStockApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create New User
    createFeedStock: build.mutation({
      query: (data) => ({
        url: `/feed-stock`,
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
    }),

    // Get Dealer's Added Feeds by Dealer Id
    getFeedStockListByDealerId: build.query({
      query: (dealer_id) => ({
        url: `/feed-stock`,
        method: "GET",
        params: {
          dealer_id: dealer_id ? dealer_id : undefined,
        },
      }),
    }),

    // Update Single Feed Stock
    updateFeedStock: build.mutation({
      query: ({ data, feed_list_id }) => ({
        url: `/feed-stock/${feed_list_id}`,
        method: "PUT",
        contentType: "application/json",
        data: data,
      }),
    }),
  }),
});

export const {
  useCreateFeedStockMutation,
  useGetFeedStockListByDealerIdQuery,
  useUpdateFeedStockMutation,
} = feedStockApi;
