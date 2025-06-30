import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";


export const usersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMp: build.query({
            query: () => ({
                url: `/mp-info`,
                method: "GET",
            }),
            providesTags: [{ type: tagTypes.user, id: 'LIST' }],
        }),

        getClub: build.query({
            query: () => ({
                url: `/club`,
                method: "GET",
            }),
            providesTags: [{ type: tagTypes.user, id: 'LIST' }],
        }),

        getInstitute: build.query({
            query: () => ({
                url: `/education-institute`,
                method: "GET",
            }),
            providesTags: [{ type: tagTypes.user, id: 'LIST' }],
        }),

        getAdmin: build.query({
            query: () => ({
                url: `/admin-users`,
                method: "GET",
            }),
            providesTags: [{ type: tagTypes.user, id: 'LIST' }],
        }),

        getSportsOfficer: build.query({
            query: () => ({
                url: `/sports-officer`,
                method: "GET",
            }),
            providesTags: [{ type: tagTypes.user, id: 'LIST' }],
        }),

        createAdminUser: build.mutation({
            query: (data) => ({
                url: `/admin-users/store`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            }),
            invalidatesTags: [{ type: tagTypes.user, id: 'LIST' }],
        }),

        getSingleAdminUser: build.query({
            query: (id) => ({
                url: `/admin-users/edit/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: tagTypes.user, id }],
        }),

        updateAdminUser: build.mutation({
            query: (data) => ({
                url: `/admin-users/update/${data.id}`,
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: tagTypes.user, id }],
        }),

        roleWiseUser: build.query({
            query: (role_name) => ({
                url: `/role-wise-users`,
                method: "GET",
                params:{role_name} 
            }),
            providesTags: [{ type: tagTypes.user, id: 'LIST' }],
        }),
    }),
});

export const {
    useGetMpQuery,
    useGetClubQuery,
    useGetInstituteQuery,
    useGetAdminQuery,
    useGetSportsOfficerQuery,
    useCreateAdminUserMutation,
    useGetSingleAdminUserQuery,
    useUpdateAdminUserMutation,
    useRoleWiseUserQuery,
} = usersApi;
