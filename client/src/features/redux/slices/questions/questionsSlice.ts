<<<<<<< HEAD
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { QuestionType } from '../../../../types/questions/questionType';
import { FavoriteType } from '../../../../types/favorite/favoriteType';
=======
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { QuestionSliceType, QuestionType } from '../../../../types/questions/questionType';
>>>>>>> d98ecf9 (answercomponents)

const initialState: QuestionSliceType = {
  questions: [],
<<<<<<< HEAD
  favorites: [],
=======
  currentQuestion: null,
>>>>>>> d98ecf9 (answercomponents)
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<QuestionType[]>) => {
      state.questions = action.payload;
    },
<<<<<<< HEAD
    setFavorites: (state, action: PayloadAction<FavoriteType[]>) => {
      state.favorites = action.payload;
=======
    setCurrentQuestion: (state, action: PayloadAction<QuestionType>) => {
      state.currentQuestion = action.payload;
>>>>>>> d98ecf9 (answercomponents)
    },
  },
});

<<<<<<< HEAD
export const { setQuestions, setFavorites } = questionsSlice.actions;
=======
export const { setQuestions, setCurrentQuestion } = questionsSlice.actions;
>>>>>>> d98ecf9 (answercomponents)

export default questionsSlice.reducer;
