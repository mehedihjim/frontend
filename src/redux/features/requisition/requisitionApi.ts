import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../api/baseApi";

export const requisitionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addRequisition: build.mutation({
      query: (data) => ({
        url: `/requisition/store`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }),
      invalidatesTags: [{ type: tagTypes.requisition, id: "LIST" }],
    }),
    getAllReuisition: build.query({
      query: ({ show }) => ({
        url: `/requisition`,
        method: "GET",
        params: { show },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: tagTypes.requisition, id: "LIST" },
              ...result.data.info.map(({ id }: { id: number }) => ({
                type: tagTypes.requisition,
                id,
              })),
            ]
          : [{ type: tagTypes.requisition, id: "LIST" }],
    }),

    getAllOrgRequisition: build.query({
      query: ({ show }) => ({
        url: `/internal-requisition`,
        method: "GET",
        params: { show },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: tagTypes.requisition, id: "LIST" },
              ...result.data.info.map(({ id }: { id: number }) => ({
                type: tagTypes.requisition,
                id,
              })),
            ]
          : [{ type: tagTypes.requisition, id: "LIST" }],
    }),
    requisitionDetails: build.query({
      query: ({ id }) => ({
        url: `/requisition-details?req_id=${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [
        { type: tagTypes.requisition, id },
      ],
    }),
    orgRequisitionDetails: build.query({
      query: ({ id }) => ({
        url: `/internal-requisition-details?req_id=${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [
        { type: tagTypes.requisition, id },
      ],
    }),
    approveRequisition: build.mutation({
      query: ({ data, id }) => ({
        url: `/requisition/approved-requisition?req_id=${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.requisition, id },
      ],
    }),
    approveInternalRequisition: build.mutation({
      query: ({ data, id }) => ({
        url: `/internal-requisition/approved-requisition?req_id=${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.requisition, id },
      ],
    }),
    rejectRequisition: build.mutation({
      query: ({ data, id }) => ({
        url: `/requisition/reject-requisition?req_id=${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.requisition, id },
      ],
    }),
    rejectInternalRequisition: build.mutation({
      query: ({ data, id }) => ({
        url: `/internal-requisition/reject-requisition?req_id=${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.requisition, id },
      ],
    }),
    addInternalRequisition: build.mutation({
      query: (data) => ({
        url: `/internal-requisition/store`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }),
      invalidatesTags: [{ type: tagTypes.requisition, id: "LIST" }],
    }),

    requisitionChartMonthWise: build.query({
      query: ({
        from_date,
        to_date,
      }: {
        from_date: string;
        to_date: string;
      }) => ({
        url: `/month-wise-requisition`,
        method: "GET",
        params: { from_date, to_date },
      }),
    }),
  }),
});

export const {
  useAddRequisitionMutation,
  useAddInternalRequisitionMutation,
  useGetAllReuisitionQuery,
  useGetAllOrgRequisitionQuery,
  useRequisitionDetailsQuery,
  useOrgRequisitionDetailsQuery,
  useRejectRequisitionMutation,
  useRejectInternalRequisitionMutation,
  useApproveRequisitionMutation,
  useApproveInternalRequisitionMutation,
  useRequisitionChartMonthWiseQuery,
} = requisitionApi;
