
import { baseApi } from "./baseApi";

export const incomeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getIncome : build.query({
            query : () => ({
                url : `/incomes`,
                method : 'GET'
            }),
        }),

        createIncome : build.mutation({
            query: (data) => ({
                url : `/incomes/store`,
                method : 'POST',
                contentType : 'application/json',
                data : data
            }),
        }),

        updateIncome: build.mutation({
            query: ({income_id,data}) => ({
                url:`/incomes/update/${income_id}`,
                method: 'PUT',
                contentType : "application/json",
                data: data
            })
        }),

        deleteIncome : build.mutation({
            query: (income_id) => ({
                url :`/incomes/delete/${income_id}`,
                method : 'DELETE'
            }),
        }),
        filterIncome : build.mutation({
            query: (batch_id) => ({
                url :`/incomes/filter-batch?batch_id=${batch_id}`,
                method : 'POST',
                contentType : 'application/json',
            }),
        })
    })
});

export const {
    useGetIncomeQuery,
    useCreateIncomeMutation,
    useDeleteIncomeMutation,
    useUpdateIncomeMutation,
    useFilterIncomeMutation
} = incomeApi;