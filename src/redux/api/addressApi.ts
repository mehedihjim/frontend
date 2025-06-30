import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
export const addressApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    division: build.query({
      query: () => ({
        url: `/division`,
        method: "GET",
      }),
      providesTags: [{ type: tagTypes.address, id: 'Division' }],
    }),

    district: build.query({
      query: () => ({
        url: `/district`,
        method: "GET",
      }),
      providesTags: [{ type: tagTypes.address, id: 'District' }],
    }),

    districtByDivisionId: build.query({
      query: (div_id) => ({
        url: `/district-by-division-id/${div_id}`,
        method: "GET",
      }),
      providesTags: (result, error, div_id) => [{ type: tagTypes.address, id: `District_${div_id}` }],
    }),

    upzilla: build.query({
      query: () => ({
        url: `/upazila`,
        method: "GET",
      }),
      providesTags: [{ type: tagTypes.address, id: 'Upazila' }],
    }),

    upzillaByDistrictId: build.query({
      query: (div_id) => ({
        url: `/upazila-by-district-id/${div_id}`,
        method: "GET",
      }),
      providesTags: (result, error, div_id) => [{ type: tagTypes.address, id: `Upazila_${div_id}` }],
    }),

    constituencyByDistrictId: build.query({
      query: (div_id) => ({
        url: `/get-constituency-info?district_id=${div_id}`,
        method: "GET",
      }),
      providesTags: (result, error, div_id) => [{ type: tagTypes.address, id: `Constituency_${div_id}` }],
    }),

    unionByUpzillaId: build.query({
      query: (div_id) => ({
        url: `/union-by-upazila-id/${div_id}`,
        method: "GET",
      }),
      providesTags: (result, error, div_id) => [{ type: tagTypes.address, id: `Union_${div_id}` }],
    }),

    districtById: build.query({
      query: (id) => ({
        url: `/district-by-id/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.address, id: `District_${id}` }],
    }),
  }),
});

// Destructure the API hooks for use in components
export const {
  useDivisionQuery,
  useDistrictQuery,
  useUpzillaQuery,
  useDistrictByDivisionIdQuery,
  useUpzillaByDistrictIdQuery,
  useConstituencyByDistrictIdQuery,
  useUnionByUpzillaIdQuery,
  useDistrictByIdQuery,
} = addressApi;