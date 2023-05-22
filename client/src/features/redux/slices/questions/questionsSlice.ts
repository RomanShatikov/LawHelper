import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { QuestionSliceType, QuestionType } from '../../../../types/questions/questionType';
import { FavoriteType } from '../../../../types/favorite/favoriteType';
import { DelFavoriteArg } from './favoritesThunk';

const initialState: QuestionSliceType = {
  questions: [],
  favorites: [],
  currentQuestion: null,
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<QuestionType[]>) => {
      state.questions = action.payload;
    },
    setFavorites: (state, action: PayloadAction<FavoriteType[]>) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action: PayloadAction<FavoriteType>) => {
      state.favorites.push(action.payload);
    },
    delFavorite: (state, action: PayloadAction<DelFavoriteArg>) => {
      const foundFavoriteIndex = state.favorites.findIndex(
        (favorite) =>
          favorite.questionId === action.payload.questionId &&
          favorite.userId === action.payload.userId,
      );
      if (foundFavoriteIndex !== -1) {
        state.favorites.splice(foundFavoriteIndex, 1);
      }
    },
    setCurrentQuestion: (state, action: PayloadAction<QuestionType>) => {
      state.currentQuestion = action.payload;
    },
  },
});

export const { setQuestions, setCurrentQuestion, setFavorites, addFavorite, delFavorite } =
  questionsSlice.actions;

export default questionsSlice.reducer;
