import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Article,
  ArticlesResponse,
  CreateArticle,
  DeleteArticle,
  EditArticle,
  EditUser,
  LoginUser,
  NewUser,
  UserResponse,
} from './types.ts';
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
    createArticle: builder.mutation<Article, CreateArticle>({
      query: (createArticle) => ({
        url: '/articles ',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: { article: createArticle },
      }),
    }),
    editArticle: builder.mutation<Article, EditArticle>({
      query: (editArticle) => ({
        url: `articles/${editArticle.slug}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: { article: editArticle },
      }),
    }),
    deleteArticle: builder.mutation<DeleteArticle, string>({
      query: (slug) => ({
        url: `/articles/${slug} `,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }),
    }),
    putLike: builder.mutation<Article, string>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite `,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
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
  useCreateArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  usePutLikeMutation,
} = articleApi;
