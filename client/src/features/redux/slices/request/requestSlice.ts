import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestType } from '../../../../types/request/requestType';


const initialState = {
  requests: [],
};

export const requestSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setRequest: (state, action: PayloadAction<RequestType[]>) => {
      state.requests = action.payload;
    },
    appendRequest: (state, action: PayloadAction<RequestType>) => {
      state.requests.push(action.payload);
    },
  },
});

export const { setRequest, appendRequest } = requestSlice.actions;

export default requestSlice.reducer;
