import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  articleCount:0,
};
export const paginationSlice = createSlice({
  name: 'Pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setArticleCount: (state,action) => {
      state.articleCount = action.payload;
    }
  },
});

export const { actions, reducer: paginationReducer } = paginationSlice;
