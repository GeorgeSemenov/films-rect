import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { errorSlice as error } from "../slices/error";
import { api } from "../API/api";
import { filters } from "../slices/filters";
import { filmsSlice as filmsData } from "../slices/films";
import { favoriteFilmsSlice as favFilms } from "../slices/favoriteFilms";

const reducers = combineSlices(favFilms, filters, error, api, filmsData);
const middleware = [api.middleware];

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware);
  },
});

export default store;

export type storeType = ReturnType<typeof reducers>;
