import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const shedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create New User
    createShed: build.mutation({
      query: (data) => ({
        url: `/sheds`,
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
      invalidatesTags: [{ type: tagTypes.user, id: "CURRENT" }],
    }),

    // Get All Sheds
    getSheds: build.query({
      query: () => ({
        url: `/sheds`,
        method: "GET",
      }),
    }),

    // Get Shed List by Farmer ID
    getShedByFarmer: build.query({
      query: (farmer_id) => ({
        url: `/farmer/shad/list/${farmer_id}`,
        method: "GET",
      }),
    }),

    // Update Shed
    updateShed: build.mutation({
      query: ({ data, shed_id }) => ({
        url: `/sheds/${shed_id}`,
        method: "PUT",
        contentType: "application/json",
        data: data,
      }),
    }),

    // Delete Shed
    deleteShed: build.mutation({
      query: (shed_id) => ({
        url: `/sheds/${shed_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateShedMutation,
  useGetShedsQuery,
  useGetShedByFarmerQuery,
  useUpdateShedMutation,
  useDeleteShedMutation,
} = shedApi;
