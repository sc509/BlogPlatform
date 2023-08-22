import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArticlesResponse, EditUser, LoginUser, NewUser, UserResponse } from './types.ts';
import Cookies from 'js-cookie';

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
    createUser: builder.mutation<UserResponse, NewUser>({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: { user: newUser },
      }),
    }),
    loginUser: builder.mutation<UserResponse, LoginUser>({
      query: (loginUser) => ({
        url: 'users/login',
        method: 'POST',
        body: { user: loginUser },
      }),
    }),
    editUser: builder.mutation<UserResponse, EditUser>({
      query: (editUser) => ({
        url: 'user',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: { user: editUser },
      }),
    }),
  }),
});

export const {
  useGetArticlesListQuery,
  useGetArticleBySlugQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useEditUserMutation,
} = articleApi;
