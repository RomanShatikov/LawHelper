import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RequestType } from '../../../../types/request/requestType';

type RequestInitStateSlice = {
  requests: RequestType[];
};

const initialState:RequestInitStateSlice = {
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
      const foundIndex = state.requests.findIndex((el: RequestType) => el.id === action.payload);
      if (foundIndex !== -1) state.requests.splice(foundIndex, 1);
    },
    appendRequest: (state, action: PayloadAction<RequestType>) => {
      state.requests.push(action.payload);
    },
  },
});

export const { setRequest, deleteRequest, appendRequest } = requestSlice.actions;

export default requestSlice.reducer;
