import type { PayloadAction } from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit'
import type { ThemeType } from '../../../../types/theme/themeType';


type ThemeInitStateSlice = {
  themes: ThemeType[],
};


const initialState: ThemeInitStateSlice = {
  themes: [],
};

export const themeSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    setThemes: (state, action: PayloadAction<ThemeType[]>) => {
      state.themes = action.payload;
    },
    deleteTheme: (state, action: PayloadAction<ThemeType['id']>) => {
      const foundIndex = state.themes.findIndex((el:ThemeType) => el.id === action.payload);
      if (foundIndex!== -1) 
      state.themes.splice(foundIndex, 1);
   },
  }
});

export const { setThemes, deleteTheme } = themeSlice.actions;
export default themeSlice.reducer;
