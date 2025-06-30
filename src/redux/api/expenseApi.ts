import build from "next/dist/build";
import { baseApi } from "./baseApi";

export const expenseApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getExpense: build.query({
            query: () => ({
                url: `/expense`,
                method: 'GET'
            }),
        }),
        createExpense: build.mutation({
            query: (data) => ({
                url: `/expense/store`,
                method: 'POST',
                contentType: 'application/json',
                data: data
            }),
        }),
        updateExpense: build.mutation({
            query: ({ expense_id, data }) => ({
                url: `/expense/update/${expense_id}`,
                method: 'PUT',
                contentType: 'application/json',
                data: data
            }),
        }),
        deleteExpense: build.mutation({
            query: (expense_id) => ({
                url: `/expense/delete/${expense_id}`,
                method: 'DELETE'
            }),
        }),
        filterExpense: build.mutation({
            query: (data) => ({
                url: `/expense/filter-batch?batch_id=${data}`,
                method: 'POST',
                contentType: 'application/json',
            }),
        })
    }),
});

export const {
    useGetExpenseQuery,
    useCreateExpenseMutation,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation,
    useFilterExpenseMutation
} = expenseApi;