import { createSlice } from "@reduxjs/toolkit";
import { IDisplayedError } from "./types";

const initialState: IDisplayedError = {
  error: null,
};
const defaultDisplayDuration = "1s";
const defaultDisplayDelay = "0s";

export const errorSlice = createSlice({
  name: "errorSlice",
  initialState, // инициированно выше
  reducers: {
    setError: (state, { payload }: { payload: IDisplayedError }) => {
      state.error = payload.error;
      state.displayDelay = payload.displayDelay
        ? payload.displayDelay
        : defaultDisplayDelay;
      state.displayDuration = payload.displayDuration
        ? payload.displayDuration
        : defaultDisplayDuration;
    },
  },
});
4;

export const { actions, reducer } = errorSlice;
