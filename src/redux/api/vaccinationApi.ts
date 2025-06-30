import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const vaccinationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Add New Vaccination
    addVaccination: build.mutation({
      query: (data) => ({
        url: `/batch-vaccination`,
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
    }),

    // All Vaccinations for a batch
    singleVaccination: build.query({
      query: (batch_id) => ({
        url: `/batch-vaccination/${batch_id}`,
        method: "GET",
      }),
    }),

    // Delete Single Vaccine Entry
    deleteVaccine: build.mutation({
      query: (vaccine_id) => ({
        url: `/batch-vaccination/${vaccine_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddVaccinationMutation,
  useSingleVaccinationQuery,
  useDeleteVaccineMutation,
} = vaccinationApi;
