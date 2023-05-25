import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { QuestionType } from '../../../../types/questions/questionType';
import type { FavoriteType, FavoriteArg } from '../../../../types/favorite/favoriteType';

type QuestionInitStateSlice = {
  questions: QuestionType[];
  favorites: FavoriteType[];
  currentQuestion: QuestionType | null;
};

const initialState: QuestionInitStateSlice = {
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
    addQuestion: (state, action: PayloadAction<QuestionType>) => {
      state.questions.unshift(action.payload);
    },
    addFavorite: (state, action: PayloadAction<FavoriteType>) => {
      state.favorites.push(action.payload);
    },
    delFavorite: (state, action: PayloadAction<FavoriteArg>) => {
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

export const {
  setQuestions,
  addQuestion,
  setCurrentQuestion,
  setFavorites,
  addFavorite,
  delFavorite,
} = questionsSlice.actions;

export default questionsSlice.reducer;
