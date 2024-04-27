import { FILMS_RELATIVE_URL } from "../../constants";
import { IFavoriteFilm } from "../../slices/favoriteFilms/types";
import { IFilters, sortingValuesType } from "../../slices/filters/types";
import { api } from "../api";
import { IFetchedFilmResponse, IFetchedFilmsResponse } from "./types";

const filmsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFilm: build.query<IFetchedFilmResponse, number>({
      providesTags: ["films"],
      query: (filmId) => `${FILMS_RELATIVE_URL}/${filmId}`,
    }),
    getFilms: build.query<
      IFetchedFilmsResponse,
      { page?: number; limit?: number }
    >({
      providesTags: ["films"],
      query: ({ page = 1, limit = 20 }) =>
        `${FILMS_RELATIVE_URL}?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useGetFilmQuery, useGetFilmsQuery } = filmsApi;
