import { configureStore } from '@reduxjs/toolkit';
import notification from './notificationSlice';
import profile from './profileSlice';
import system from './systemSlice';

export const store = configureStore({
  reducer: {
    notification,
    profile,
    system,
  },
});

export type RootState = ReturnType<typeof store.getState>;
