import { baseApi } from "./baseApi";

const dailyupdateApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDailyUpdate: build.query({
            query: () => ({
                url: `/daily-updates/list`,
                method: "GET",
            }),
        }),
        createDailyUpdate: build.mutation({
            query: (data) => ({
                url: `/daily-updates/store`,
                method: "POST",
                contentType: "application/json",
                data: data,
            }),
        }),
        updateDailyUpdate: build.mutation({
            query: ({ data, dailyupdate_id }) => ({
                url: `/daily-updates/update/${dailyupdate_id}`,
                method: "PUT",
                contentType: "application/json",
                data: data,
            }),
        }),
        deleteDailyUpdate: build.mutation({
            query: (dailyupdate_id) => ({
                url: `/daily-updates/delete/${dailyupdate_id}`,
                method: "DELETE",
            }),
        }),
        filterByBatchDailyUpdate: build.query({
            query: (batch_id) => ({
                url: `/daily-updates/filter?batch_id=${batch_id}`,
                method: "POST",
            })
        })
    }),
});

export const {
    useGetDailyUpdateQuery,
    useCreateDailyUpdateMutation,
    useUpdateDailyUpdateMutation,
    useDeleteDailyUpdateMutation,
    useFilterByBatchDailyUpdateQuery
} = dailyupdateApi;