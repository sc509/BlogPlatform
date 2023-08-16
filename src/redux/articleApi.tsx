import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArticlesResponse } from './types.ts';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
  }),
  endpoints: (builder) => ({
    getArticlesList: builder.query<ArticlesResponse, { page: number }>({
      query: ({ page }) => `articles?limit=5&offset=${(page - 1) * 5}`,
    }),
    getArticleBySlug: builder.query<ArticlesResponse, string>({
      query: (slug) => `articles/${slug}`,
    }),
  }),
});

export const { useGetArticlesListQuery, useGetArticleBySlugQuery } = articleApi;
