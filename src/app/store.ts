import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { errorSlice as error } from "../slices/error";
import { api } from "../API/api";
import { filters } from "../slices/filters";
import { filmsSlice as films } from "../slices/films";

const reducers = combineSlices(filters, error, api, films);
const middleware = [api.middleware];

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware);
  },
});

export default store;

export type storeType = ReturnType<typeof reducers>;
