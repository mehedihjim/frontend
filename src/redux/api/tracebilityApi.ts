import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const tracebilityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create New User
    tracebilityPost: build.mutation({
      query: (data) => ({
        url: `/batch-traceability`,
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
    }),

    singleTracebility: build.query({
      query: (batch_id) => ({
        url: `/batch-traceability/${batch_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useTracebilityPostMutation, useSingleTracebilityQuery } =
  tracebilityApi;
