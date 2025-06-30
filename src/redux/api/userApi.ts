import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create New User
    addUser: build.mutation({
      query: ({ data }) => ({
        url: `/users`,
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: [{ type: tagTypes.user, id: "CURRENT" }],
    }),

    // Get All User Data
    getUsers: build.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
    }),

    // Get All Farmers
    getAllFarmers: build.query({
      query: () => ({
        url: `/farmers`,
        method: "GET",
      }),
    }),

    // Get User by User Type
    getUsersByType: build.query({
      query: (user_type) => ({
        url: `/users-by-type`,
        method: "GET",
        params: {
          user_type: user_type ? user_type : undefined,
        },
      }),
    }),
    // Get User by User ID
    getUsersById: build.query({
      query: (user_id) => ({
        url: `/users/${user_id}`,
        method: "GET",
      }),
    }),

    // Update User
    updateUser: build.mutation({
      query: ({ data, user_id }) => ({
        url: `/users/update/${user_id}`,
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
    }),

    // Delete User
    deleteUser: build.mutation({
      query: (user_id) => ({
        url: `/users/${user_id}`,
        method: "DELETE",
      }),
    }),
    changePassword:build.mutation(
      {
        query: (data) => ({
          url: `/auth/password/update`,
          method: "POST",
          contentType: "application/json",
          data: data,
        }),
      }
    ),
    profilePhotoUpdate:build.mutation({
      query: (data) => ({
        url: `/users/profile-picture`,
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
    }),
    loggedUser: build.query({
      query: () => ({
        url: `/login-user`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetUsersQuery,
  useGetUsersByTypeQuery,
  useGetAllFarmersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLoggedUserQuery,
  useGetUsersByIdQuery,
  useChangePasswordMutation,
  useProfilePhotoUpdateMutation,
} = usersApi;
