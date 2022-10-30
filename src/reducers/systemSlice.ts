import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const systemSlice = createSlice({
  name: "system",
  initialState: {},
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
