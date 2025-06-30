import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `/auth/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: loginData,
      }),
      invalidatesTags: [
        tagTypes.sportsItem,
        tagTypes.admin,
        tagTypes.user,
        tagTypes.permission,
        tagTypes.role,
        tagTypes.sportsType,
        tagTypes.sportsItemCategory,
        tagTypes.requisition,
        tagTypes.application,
        tagTypes.stock,
        tagTypes.dashboard,
        tagTypes.achievement,
        tagTypes.address,
        tagTypes.organization,
        tagTypes.sportsOfficers,
        { type: tagTypes.user, id: "CURRENT" },
      ],
    }),

    register: build.mutation({
      query: (registerData) => ({
        url: `/register`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: registerData,
      }),
      invalidatesTags: [{ type: tagTypes.user, id: "CURRENT" }],
    }),

    userLogout: build.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
        data: {},
        invalidatesTags: [
          tagTypes.sportsItem,
          tagTypes.admin,
          tagTypes.user,
          tagTypes.permission,
          tagTypes.role,
          tagTypes.sportsType,
          tagTypes.sportsItemCategory,
          tagTypes.requisition,
          tagTypes.application,
          tagTypes.stock,
          tagTypes.dashboard,
          tagTypes.achievement,
          tagTypes.address,
          tagTypes.organization,
          tagTypes.sportsOfficers,
          { type: tagTypes.user, id: "CURRENT" },
        ],
      }),
    }),
    resendOtp: build.mutation({
      query: (data) => ({
        url: `/resent-otp`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }),
    }),

    verifyOtp: build.mutation({
      query: (data) => ({
        url: `/otp-verify`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }),
    }),

    // Uncomment and define types for additional mutations if needed
    changePassword: build.mutation<
      any,
      { current_password: string; password: string; c_password: string }
    >({
      query: (data) => ({
        url: `/auth/password/update`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }),
      invalidatesTags: [{ type: tagTypes.user, id: "CURRENT" }],
    }),

    forgotPassword: build.mutation({
      query: (data) => ({
        url: `/password-reset-request`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: tagTypes.user, id: "CURRENT" }],
    }),

    resetPassword: build.mutation<
      any,
      { token: string; password: string; c_password: string; mobile: string }
    >({
      query: (data) => ({
        url: `/password-reset-verify`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: tagTypes.user, id: "CURRENT" }],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useRegisterMutation,
  useUserLogoutMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  // Uncomment and export hooks for additional mutations if needed
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
