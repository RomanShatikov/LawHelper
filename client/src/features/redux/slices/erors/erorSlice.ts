import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { QuestionType } from '../../../../types/questions/questionType';
import { RequestType } from '../../../../types/request/requestType';

const initialState = {
  erors: {
    loginEmail: '',
    loginPassword: '',
  },
};

export const erorsSlice = createSlice({
  name: 'erors',
  initialState,
  reducers: {
    setRequest: (state, action: PayloadAction<RequestType[]>) => {
      state.requests = action.payload;
    },
  },
});

export const { setRequest } = requestSlice.actions;

export default requestSlice.reducer;
