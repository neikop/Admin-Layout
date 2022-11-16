import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type SessionMap = {
  [key: string]: SessionType;
};

type SessionNew = {
  [key: string]: {
    currentSession: SessionType;
    lastSession: SessionType;
  };
};

export type SystemState = {
  isReady: boolean;
  currentSessions: SessionMap;
  lastSessions: SessionMap;
};

const systemSlice = createSlice({
  name: 'system',
  initialState: { isReady: false } as SystemState,
  reducers: {
    initSession: (state, { payload }: { payload: SystemState }) => {
      state = { ...payload, isReady: true };
      return state;
    },
    newSession: (state, { payload }: { payload: SessionNew }) => {
      Object.keys(payload).forEach((level) => {
        state.lastSessions[level] = payload[level].lastSession;
        state.currentSessions[level] = payload[level].currentSession;
      });
      return state;
    },
  },
});

export const { initSession, newSession } = systemSlice.actions;

export const systemSelector = ({ system }: RootState) => system;

export default systemSlice.reducer;
