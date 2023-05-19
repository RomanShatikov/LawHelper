import type { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import questionReducer from './redux/slices/questions/questionsSlice';
import userReducer from './redux/slices/user/userSlice'

export const store = configureStore({
  reducer: {
    question: questionReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export type ThunkActionCreater<PayloadType = void, ReturnType = void> = (
  payload: PayloadType,
) => AppThunk<ReturnType>;
