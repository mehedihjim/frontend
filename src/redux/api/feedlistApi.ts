import build from "next/dist/build";
import { baseApi } from "./baseApi";

const feedlistApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
         getFeedlist : build.query({
            query : () =>({
                url:`/feed-list`,
                method:'GET'
            })
         }),
         createFeedlist : build.mutation({
            query: (data) => ({
                url : `/feed-list`,
                method : 'POST',
                contentType : 'application/json',
                data : data
            }),
         }),
         updateFeedlist : build.mutation({
            query: ({data,feellist_id}) => ({
                url:`/feed-list/${feellist_id}`,
                method:'PUT',
                contentType:'application/json',
                data:data
            })
         }),
         deleteFeedlist : build.mutation({
            query: (feedlist_id) => ({
                url:`/feed-list/${feedlist_id}`,
                method:'DELETE'
            })
         })
    })
});

export const {useCreateFeedlistMutation,useGetFeedlistQuery,useUpdateFeedlistMutation,useDeleteFeedlistMutation} = feedlistApi;