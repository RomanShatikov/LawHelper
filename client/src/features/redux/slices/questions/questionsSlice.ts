import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { QuestionSliceType, QuestionType } from '../../../../types/questions/questionType';
import type { FavoriteType } from '../../../../types/favorite/favoriteType';

const initialState: QuestionSliceType = {
  questions: [],
  currentQuestion: null,
  favorites: [],
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<QuestionType[]>) => {
      state.questions = action.payload;
    },
    setCurrentQuestion: (state, action: PayloadAction<QuestionType>) => {
      state.currentQuestion = action.payload;
    },
    setFavorites: (state, action: PayloadAction<FavoriteType[]>) => {
      state.favorites = action.payload;
    },
  },
});

export const { setQuestions, setFavorites, setCurrentQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;
