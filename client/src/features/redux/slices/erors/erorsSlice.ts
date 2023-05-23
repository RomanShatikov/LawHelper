import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ErorsState = {
  EmailEror: string;
  loginPasswordEror: string;
};

const initialState: ErorsState = {
  EmailEror: '',
  loginPasswordEror: '',
};

export const erorsSlice = createSlice({
  name: 'eror',
  initialState,
  reducers: {
    setEmailEror: (state, action: PayloadAction<string>) => {
      state.EmailEror = action.payload;
    },
    setPasswordEror: (state, action: PayloadAction<string>) => {
      state.loginPasswordEror = action.payload;
    },
  },
});

export const { setEmailEror, setPasswordEror } = erorsSlice.actions;

export default erorsSlice.reducer;
