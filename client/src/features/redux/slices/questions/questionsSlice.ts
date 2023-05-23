import type{ PayloadAction} from '@reduxjs/toolkit';
import {createSlice } from '@reduxjs/toolkit';
import type { QuestionType } from '../../../../types/questions/questionType';
import type { FavoriteType } from '../../../../types/favorite/favoriteType';

const initialState = {
  questions: [],
  favorites: [],
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
}});

export const { setQuestions, setFavorites, addQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;
