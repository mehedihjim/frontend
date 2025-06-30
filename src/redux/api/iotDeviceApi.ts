import { baseApi } from "./baseApi";

export const iotDeviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Add IoT Devices
    generateIotDevices: build.mutation({
      query: (data) => ({
        url: `/device/list/store`,
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
    }),
    // Get All Device Model
    getAllIotDeviceModel: build.query({
      query: () => ({
        url: `/device/model/name`,
        method: "GET",
      }),
    }),

    // Get Device List By Device Model
    getDeviceByModel: build.query({
      query: (model_id) => ({
        url: `/device/filter-by/model/${model_id}`,
        method: "GET",
      }),
    }),

    // Get Device List By Farmer ID
    getDeviceListByFarmerID: build.query({
      query: (params) => ({
        url: `/shed-monitoring/single/data`,
        method: "GET",
        params: {
          device_id: params.device_id ? params.device_id : undefined,
        },
      }),
    }),

    // Single Device Info By Device ID
    getSingleDeviceByDeviceID: build.query({
      query: (params) => ({
        url: `/shed-monitoring/device/info`,
        method: "GET",
        params: {
          device_id: params.device_id ? params.device_id : undefined,
        },
      }),
    }),
    // Add Device Control
    addDeviceControl: build.mutation({
      query: (data) => ({
        url: `/iot/shed-monitoring/control-device`,
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
    }),
  }),
});

export const {
  useGenerateIotDevicesMutation,
  useGetAllIotDeviceModelQuery,
  useGetDeviceByModelQuery,
  useGetDeviceListByFarmerIDQuery,
  useGetSingleDeviceByDeviceIDQuery,
  useAddDeviceControlMutation,
} = iotDeviceApi;
