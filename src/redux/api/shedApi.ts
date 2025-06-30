import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const shedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Shed
    createShed: build.mutation({
      query: (data) => ({
        url: `/sheds`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.shed],
    }),

    // Get All Sheds
    getSheds: build.query({
      query: () => ({
        url: `/sheds`,
        method: "GET",
      }),
      providesTags: [tagTypes.shed],
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
        data,
      }),
      invalidatesTags: [tagTypes.shed],
    }),

    // Delete Shed
    deleteShed: build.mutation({
      query: (shed_id) => ({
        url: `/sheds/${shed_id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.shed],
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
