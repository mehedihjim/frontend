import { baseApi } from "./baseApi";

const feedStockApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create New User
    createFeedOrder: build.mutation({
      query: (data) => ({
        url: `/feed-order/store`,
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
    }),
    // Create a feed order return
    returnFeedOrder: build.mutation({
      query: (data) => ({
        url: `/feed-order/return/${data?.feed_order_id}`,
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
    }),
    // Get Feed Order List by Farmer Id
    getFeedOrderListByFarmerId: build.query({
      query: (farmer_id) => ({
        url: `/feed-order/list`,
        method: "GET",
        params: {
          farmer_id: farmer_id ? farmer_id : undefined,
          per_page: 100,
        },
      }),
    }),
    // Get Feed Order List by Farmer Id
    changeFeedOrderStatusById: build.query({
      query: ({ feed_order_id, status }) => ({
        url: `/feed-order/status/${feed_order_id}`,
        method: "GET",
        params: {
          status: status ? status : undefined,
        },
      }),
    }),
    // Get Feed Order List by Farmer Id
    getSingleFeedOrderDetails: build.query({
      query: (feed_order_id) => ({
        url: `/feed-order/${feed_order_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateFeedOrderMutation,
  useReturnFeedOrderMutation,
  useGetFeedOrderListByFarmerIdQuery,
  useChangeFeedOrderStatusByIdQuery,
  useGetSingleFeedOrderDetailsQuery,
} = feedStockApi;
