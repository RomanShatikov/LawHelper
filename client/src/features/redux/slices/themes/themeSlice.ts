import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ThemeType } from '../../../../types/theme/themeType';

const initialState = {
  themes: [],
};

export const themeSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    setThemes: (state, action: PayloadAction<ThemeType[]>) => {
      state.themes = action.payload;
    },
  },
});

export const { setThemes } = themeSlice.actions;
export default themeSlice.reducer;
