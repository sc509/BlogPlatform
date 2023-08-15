import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ArticlesResponse} from "./types.ts";

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://blog.kata.academy/api/"
    }),
    endpoints: (builder) => ({
        getArticlesList: builder.query<ArticlesResponse, void>({
            query: () => `articles`,
        })
    })
});

export const {useGetArticlesListQuery} = articleApi
console.log('test: ', useGetArticlesListQuery);
