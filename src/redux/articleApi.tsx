import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Article, ArticleResponse,
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
      query: ({ page }) => ({
        url: `articles?limit=5&offset=${(page - 1) * 5}`,
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }),
    }),
    getArticleBySlug: builder.query<ArticleResponse, string>({
      query: (slug) => ({
        url: `articles/${slug}`,
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }),
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
    putLike: builder.mutation<Article, { favoritedArticle: Article; slug: string }>({
      query: ({ favoritedArticle, slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: { article: favoritedArticle },
      }),
    }),
    deleteLike: builder.mutation<Article, { unFavoritedArticle: Article; slug: string }>({
      query:({ unFavoritedArticle , slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: {article: unFavoritedArticle},
      })
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
    useDeleteLikeMutation,
} = articleApi;
