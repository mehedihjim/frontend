import build from "next/dist/build";
import { baseApi } from "./baseApi";

export const prescriptionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        storeManualPrescription: build.mutation({
            query: (data) => ({
                url: `/manual-prescription/store`,
                method: "POST",
                contentType: "multipart/form-data",
                data: data,
            }),
        }),
        deletePrescription: build.mutation({
            query: (id) => ({
                url: `/prescription/delete/${id}`,
                method: "DELETE",
            }),
        }),
       storePrescription : build.mutation({
            query: (data) => ({
                url: `/prescription/store`,
                method: "POST",
                contentType: "multipart/form-data",
                data: data,
            }),
        }), 
        prescritptionListByStatus: build.query({
            query: (status) => ({
                url: `/prescription/list?status=${status}`,
                method: "GET",
            }),
        }),
        singlePrescription: build.query({
            query: (id) => ({
                url: `/prescription/${id}`,
                method: "GET",
            }),
        }),
        prescribeMedicineStore: build.mutation({
            query: (data) => ({
                url: `/prescribe-medicine/store`,
                method: "POST",
                contentType: "application/json",                
                data: data,
            }),
        }),
    }),
});

export const { useStoreManualPrescriptionMutation, useDeletePrescriptionMutation, useStorePrescriptionMutation, usePrescritptionListByStatusQuery, useSinglePrescriptionQuery, usePrescribeMedicineStoreMutation } = prescriptionApi;