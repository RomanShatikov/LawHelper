// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type {
  ActiveType,
  FetchingUserType,
  GuestType,
  NonActiveType,
  UserFromBackend,
  UserType,
} from '../../../../types/user/userType';

// Define the initial state using that type
const initialState: UserType = {
  status: 'fetching',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => action.payload,
    logoutUser: (state: ActiveType, action: PayloadAction<GuestType['status']>) => ({
      status: action.payload,
    }),
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
