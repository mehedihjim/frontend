"use clint";
import { authKey } from "@/constants/authKey";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types/common";
import { getFromLocalStorage } from "@/utils/local-storage";

import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: ResponseSuccessType = {
      status: response?.status || 200,
      data: response?.data || response,
      meta: response?.data?.meta,
      message: response?.data?.message || "Success",
    };
    return responseObject;
  },
  async function (error) {
    const responseObject: IGenericErrorResponse = {
      status: error?.data?.statusCode || 500,
      message: error?.message || "Something went wrong!!!",
      errors: error?.response?.data?.errors || error?.response?.data.message,
    };
    return responseObject;
  },
);

export { instance };
