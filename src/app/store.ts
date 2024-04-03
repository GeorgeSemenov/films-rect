import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { errorSlice } from "../slices/error";
import { genresSlice } from "../slices/genres";

const reducers = combineSlices(errorSlice, genresSlice);
const middleware = [genresSlice.middleware];

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware);
  },
});

export default store;

export type storeType = ReturnType<typeof reducers>;
