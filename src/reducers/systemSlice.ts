import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export type SystemState = {
  currentSessions?: any;
  lastSessions?: any;
  countdownByZone?: any;
};
const systemSlice = createSlice({
  name: 'system',
  initialState: {} as SystemState,
  reducers: {
    save: (state, { payload }) => {
      state = { ...state, ...payload };
      return state;
    },
  },
});

export const { save: saveSystem } = systemSlice.actions;

export const systemSelector = ({ system }: RootState) => system;

export default systemSlice.reducer;
