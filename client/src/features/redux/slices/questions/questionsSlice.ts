import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { QuestionSliceType, QuestionType } from '../../../../types/questions/questionType';

const initialState: QuestionSliceType = {
  questions: [],
  currentQuestion: null,
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
  },
});

export const { setQuestions, setCurrentQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;
