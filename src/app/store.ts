import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { errorSlice as error } from "../slices/error";
import { genresSlice } from "../API/genres";

const reducers = combineSlices(error, genresSlice);
const middleware = [genresSlice.middleware];

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware);
  },
});

export default store;

export type storeType = ReturnType<typeof reducers>;
