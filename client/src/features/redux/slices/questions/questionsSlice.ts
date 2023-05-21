import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { QuestionType } from '../../../../types/questions/questionType';
import { FavoriteType } from '../../../../types/favorite/favoriteType';

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
  },
});

export const { setQuestions, setFavorites } = questionsSlice.actions;

export default questionsSlice.reducer;
