import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export type ProfileState = UserType & {
  isLoggedIn: boolean;
  accessToken?: string;
  refreshToken?: string;
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isLoggedIn: false,
  } as ProfileState,
  reducers: {
    signIn: (state, { payload }) => {
      const profile = { ...payload, isLoggedIn: true };
      localStorage.setItem('profile', JSON.stringify(profile));
      return profile;
    },
    signOut: (state, { payload }) => {
      localStorage.removeItem('profile');
      return { isLoggedIn: false };
    },
    newBalance: (state, { payload }: { payload: number }) => {
      const profile = { ...state, balance: payload };
      localStorage.setItem('profile', JSON.stringify(profile));
      return profile;
    },
  },
});

export const { signIn, signOut, newBalance } = profileSlice.actions;

export const profileSelector = ({ profile }: RootState) => profile;

export default profileSlice.reducer;
