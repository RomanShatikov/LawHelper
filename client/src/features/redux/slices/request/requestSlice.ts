import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit';
import type { QuestionType } from '../../../../types/questions/questionType';
import type { RequestType } from '../../../../types/request/requestType';


const initialState = {
  requests: [],
};

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setRequest: (state, action: PayloadAction<RequestType[]>) => {
      state.requests = action.payload;
    },
    deleteRequest: (state, action: PayloadAction<RequestType['id']>) => {
      const foundIndex = state.requests.findIndex((el) => el.id === action.payload);
      if (foundIndex!== -1) 
      state.requests.splice(foundIndex, 1);
  },
}
});

export const { setRequest, deleteRequest } = requestSlice.actions;

export default requestSlice.reducer;
