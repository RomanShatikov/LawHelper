import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { QuestionType } from '../../../../types/questions/questionType';

const initialState = {
  questions: [],
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<QuestionType>) => {
      state.questions = action.payload;
    },
  },
});

export const { setQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;
