import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articleList: [],
};

export const articleSlice = createSlice({
  name: 'ArticleList',
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articleList = action.payload;
    },
    deleteArticleFromStore: (state, action) => {
      state.articleList = state.articleList.filter(article => article.slug !== action.payload);
    },
    addArticleToStore: (state, action) => {
      state.articleList.unshift(action.payload);
    },
  },
});

export const {actions:articleActions, reducer: articleReducer} = articleSlice