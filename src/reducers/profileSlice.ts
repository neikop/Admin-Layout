import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export type ProfileState = {
  isLoggedIn?: boolean;
  accessToken?: string;
  refreshToken?: string;
  balance?: number;
  incId?: string;
  id?: string;
  email?: string;
  emailVerified?: boolean;
  username?: string;
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {} as ProfileState,
  reducers: {
    signIn: (state, { payload }) => {
      const profile = { ...state, ...payload, isLoggedIn: true };
      localStorage.setItem('profile', JSON.stringify(profile));
      return profile;
    },
    signOut: (state, { payload }) => {
      localStorage.removeItem('profile');
      localStorage.removeItem('pageTracking');
      return { isLoggedIn: false };
    },
    newBalance: (state, { payload }) => {
      const profile = { ...state, ...payload };
      localStorage.setItem('profile', JSON.stringify(profile));
      return profile;
    },
  },
});

export const { signIn, signOut, newBalance } = profileSlice.actions;

export const profileSelector = ({ profile }: RootState) => profile;

export default profileSlice.reducer;
