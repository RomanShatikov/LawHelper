import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ErorsState = {
  loginEmailEror: string;
  loginPasswordEror: string;
};

const initialState: ErorsState = {
  loginEmailEror: '',
  loginPasswordEror: '',
};

export const erorsSlice = createSlice({
  name: 'eror',
  initialState,
  reducers: {
    setEmailEror: (state, action: PayloadAction<string>) => {
      state.loginEmailEror = action.payload;
    },
    setPasswordEror: (state, action: PayloadAction<string>) => {
      state.loginPasswordEror = action.payload;
    },
  },
});

export const { setEmailEror, setPasswordEror } = erorsSlice.actions;

export default erorsSlice.reducer;
