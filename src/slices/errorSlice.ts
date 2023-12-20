import { createSlice } from "@reduxjs/toolkit";

const initialState: IDisplayedError = {
  error: null,
};
const defaultDisplayDuration = "1s";
const defaultDisplayDelay = "0s";

const errorSlice = createSlice({
  name: "error",
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
export interface IDisplayedError {
  error: Error | null;
  displayDuration?: string;
  displayDelay?: string;
}

export default errorSlice.reducer;

export const { actions } = errorSlice;
