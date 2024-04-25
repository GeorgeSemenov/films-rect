import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { errorSlice as error } from "../slices/error";
import { api } from "../API/api";
import { kinopoiskApi } from "../API/kinopoiskApi";
import { filters } from "../slices/filters";
import { filmsSlice as filmsData } from "../slices/films";
import { favoriteFilmsSlice as favFilms } from "../slices/favoriteFilms";
import { userSlice as user } from "../slices/user";

const reducers = combineSlices(
  favFilms,
  filters,
  error,
  api,
  kinopoiskApi,
  filmsData,
  user
);
const middleware = [api.middleware, kinopoiskApi.middleware];

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware);
  },
});

export default store;

export type storeType = ReturnType<typeof reducers>;
