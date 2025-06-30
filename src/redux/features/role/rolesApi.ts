import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../api/baseApi";

export const rolesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getRoles: build.query({
            query: () => ({
                url: '/roles',
                method: 'GET',
            }),
            providesTags: (result) =>
                result ?
                    [
                        { type: tagTypes.role, id: 'LIST' },
                        ...result.data.map(({ id }: { id: string | number }) => ({ type: tagTypes.role, id }))
                    ]
                    :
                    [{ type: tagTypes.role, id: 'LIST' }],

        }),
        addRole: build.mutation({
            query: (data) => ({
                url: '/roles',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            }),
            invalidatesTags: [{ type: tagTypes.role, id: 'LIST' }],
        }),

        getRole: build.query({
            query: (id) => ({
                url: `/roles/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: tagTypes.role, id }],
        }),
        updateRole: build.mutation({
            query: (data) => ({
                url: `/roles/${data.id}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: tagTypes.role, id }],
        }),
    }),
});

export const { useGetRolesQuery, useAddRoleMutation, useGetRoleQuery, useUpdateRoleMutation } = rolesApi;
