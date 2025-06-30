import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../api/baseApi";

export const chartsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getUserPercentage: build.query({
            query: ({
                from_date,
                to_date
            }) => ({
                url: '/user-percentage',
                method: 'GET',
                params: {
                    from_date,
                    to_date
                },
            }),
            providesTags: [tagTypes.charts],

        }),

        getRequisitionPercentage: build.query({
            query: ({
                from_date,
                to_date
            }) => ({
                url: '/requisition-percentage',
                method: 'GET',
                params: {
                    from_date,
                    to_date
                },
            }),
            providesTags: [tagTypes.charts],
        }),

    }),
});

export const { useGetUserPercentageQuery, useGetRequisitionPercentageQuery } = chartsApi;
