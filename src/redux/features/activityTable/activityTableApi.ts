import { baseApi } from "@/redux/api/baseApi";

export const activityTableApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getActivityTable: build.query({
            query: ({
                date,
                user_id,
            }) => ({
                url: '/activity-log',
                method: 'GET',
                params: {
                    date,
                    user_id,}

            })
        }),
    })

});

export const {
    useGetActivityTableQuery

} = activityTableApi;
