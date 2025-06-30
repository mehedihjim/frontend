import { baseApi } from "./baseApi";

export const shedDataApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get All Sheds
    getShedMonitoringData: build.query<any, string | void>({
      query: (device_id?: string) => ({
        url: `/shed-monitoring/single/data`,
        method: "GET",
        params: {
          device_id: device_id ? device_id : undefined,
        },
      }),
    }),

    // Get IoT Device List by Shed ID
    getIotDevicesByShed: build.query({
      query: (shed_id) => ({
        url: `/iot-devices/by-shad/${shed_id}`,
        method: "GET",
      }),
    }),

    // Add IoT Devices
    addIotDevcies: build.mutation({
      query: (data) => ({
        url: `/iot-devices/store`,
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
    }),

    // Get All Sheds
    getSingleShedMonitoringData: build.query<any, string | void>({
      query: (device_id: string) => ({
        url: `/shed-monitoring/data-by-device/${device_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetShedMonitoringDataQuery,
  useGetIotDevicesByShedQuery,
  useAddIotDevciesMutation,
  useGetSingleShedMonitoringDataQuery,
} = shedDataApi;
