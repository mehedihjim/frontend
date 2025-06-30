import { tagTypes } from "@/redux/tag-types"; // Ensure you have tagTypes for permissions
import { baseApi } from "../../api/baseApi";

export const permissionsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPermissions: build.query({
            query: () => ({
                url: '/permissions',
                method: 'GET',
            }),
            providesTags: (result) =>
                result ?
                    [
                        { type: tagTypes.permission, id: 'LIST' },
                        ...result.data.map(({ id }: { id: number }) => ({ type: tagTypes.permission, id }))
                    ]
                    :
                    [{ type: tagTypes.permission, id: 'LIST' }],
        }),
    }),
});

export const { useGetPermissionsQuery } = permissionsApi;
