import { FILMS_RELATIVE_URL } from "../../constants";
import { IFilters } from "../../slices/filters/types";
import { api } from "../api";
import { IFetchedFilmResponse, IFetchedFilmsResponse } from "./types";

const filmsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFilm: build.query<IFetchedFilmResponse, number>({
      providesTags: ["films"],
      query: (filmId) => `${FILMS_RELATIVE_URL}/${filmId}`,
    }),
    getFilms: build.query<IFetchedFilmsResponse, IFilters>({
      providesTags: ["films"],
      query: ({ paginationPage: page = 1 }) => {
        const filmsLimit = 20;
        return `${FILMS_RELATIVE_URL}?page=${page}&filmsLimit=${filmsLimit}`;
      },
    }),
  }),
});

export const { useGetFilmQuery, useGetFilmsQuery } = filmsApi;
