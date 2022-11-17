import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export type SessionNew = {
  [key: string]: {
    currentSession: SessionType;
    lastSession: SessionType;
  };
};

export type SystemState = {
  isReady: boolean;
  currentSessions: {
    [key: string]: SessionType;
  };
  lastSessions: {
    [key: string]: SessionType;
  };
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
