import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<>) => {
        action.payload,
    },
  },
});

export const { setQuestions} = questionsSlice.actions;

export default questionsSlice.reducer;
