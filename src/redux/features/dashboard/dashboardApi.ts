import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types"; // Make sure to define tagTypes

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDashboardData: build.query({
            query: (type) => ({
                url: `/dashboard?type=${type}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: (result, error, type) =>
                result
                ? [{ type: tagTypes.dashboard, id: type }]
                : [{ type: tagTypes.dashboard, id: 'PARTIAL-LIST' }],
        }),
    }),
})

export const { useGetDashboardDataQuery } = dashboardApi;
