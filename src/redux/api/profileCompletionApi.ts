import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"; // Assuming you have a User interface defined

interface UpdateProfilePayload {
  data: any; // Define a specific type if possible
  id: string;
}

export const profileCompleteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Club Section
    clubProfile: build.mutation({
      query: ({ data, id }) => ({
        url: `/club-profile/update/${id}`,
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: [{ type: tagTypes.user, id: "CURRENT" }],
    }),
    getClubProfile: build.query({
      query: (user_id) => ({
        url: `/club-profile/${user_id}`,
        method: "GET",
      }),
      providesTags: (result, error, user_id) => [
        { type: tagTypes.user, id: user_id },
      ],
    }),

    // Institute Section
    instituteProfile: build.mutation({
      query: ({ data, id }) => ({
        url: `/education-institute-profile/update/${id}`,
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: [{ type: tagTypes.user, id: "CURRENT" }],
    }),
    getInstituteProfile: build.query({
      query: (user_id) => ({
        url: `/education-institute-profile/${user_id}`,
        method: "GET",
      }),
      providesTags: (result, error, user_id) => [
        { type: tagTypes.user, id: user_id },
      ],
    }),

    // MP Section
    mpProfile: build.mutation({
      query: ({ data, id }) => ({
        url: `/mp-profile/update/${id}`,
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: [{ type: tagTypes.user, id: "CURRENT" }],
    }),

    getMpProfile: build.query({
      query: (user_id) => ({
        url: `/mp-profile/${user_id}`,
        method: "GET",
      }),
      providesTags: (result, error, user_id) => [
        { type: tagTypes.user, id: user_id },
      ],
    }),

    // Common Section
    commonProfile: build.mutation({
      query: ({ data, id }) => ({
        url: `/profile/update/${id}`,
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: [{ type: tagTypes.user, id: "CURRENT" }],
    }),

    getCommonProfile: build.query({
      query: (user_id) => ({
        url: `/profile/${user_id}`,
        method: "GET",
      }),
      providesTags: (result, error, user_id) => [
        { type: tagTypes.user, id: user_id },
      ],
    }),
  }),
});

export const {
  useClubProfileMutation,
  useGetClubProfileQuery,
  useInstituteProfileMutation,
  useGetInstituteProfileQuery,
  useMpProfileMutation,
  useGetMpProfileQuery,
  useCommonProfileMutation,
  useGetCommonProfileQuery,
} = profileCompleteApi;
