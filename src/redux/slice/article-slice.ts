import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  articleList: [],
  favoritesCounts:0,
  likedArticles: {},
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
    updateLikes: (state, action: PayloadAction<{ slug: string, newCount: number }>) => {
      const article = state.articleList.find(a => a.slug === action.payload.slug);
      if (article) {
        article.favoritesCount = action.payload.newCount;
      }
    },
  },
});

export const {actions:articleActions, reducer: articleReducer} = articleSlice