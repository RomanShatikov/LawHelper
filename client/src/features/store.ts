import type { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './redux/slices/questions/questionsSlice';
import themeReducer from './redux/slices/themes/themeSlice';
import userReducer from './redux/slices/user/userSlice';
import requestReducer from './redux/slices/request/requestSlice';
import documentReducer from './redux/slices/documents/documentSlice'
import erorsReducer from './redux/slices/erors/erorsSlice';

export const store = configureStore({
  reducer: {
    question: questionReducer,
    theme: themeReducer,
    user: userReducer,
    request: requestReducer,
    document: documentReducer,
    eror: erorsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export type ThunkActionCreater<PayloadType = void, ReturnType = void> = (
  payload: PayloadType,
) => AppThunk<ReturnType>;
