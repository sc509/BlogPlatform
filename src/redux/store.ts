import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {articleApi} from "./articleApi.tsx";
import {paginationReducer} from "./slice/pagination-slice.ts";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "./slice/auth-slice.ts";
import {userReducer} from "./slice/user-slice.ts";
import {articleReducer} from "./slice/article-slice.ts";

const rootReducer = combineReducers({
    article: articleReducer,
    user: userReducer,
    auth: authReducer,
    pagination: paginationReducer,
    [articleApi.reducerPath]: articleApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector