import { IMeta } from "@/types/common";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";

import { instance as axiosInstance } from "./axiosInstance";
import { getToken } from "@/app/auth/services/auth.service"; // <-- adjust path if needed

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" },
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      meta?: IMeta;
      contentType?: string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, contentType }) => {
    try {
      const token = getToken();

      const headers: Record<string, string> = {
        "Content-Type": contentType || "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const result: any = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      if (result.status !== 200) {
        return {
          error: {
            status: result.status,
            errors: result.errors,
            message: result.message,
          },
        };
      }
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err?.response?.status,
          data: err?.response?.data || err.message,
        },
      };
    }
  };
