import { FILMS_RELATIVE_URL, searchFilmsQueryUrl } from "../../constants";
import { IFilters } from "../../slices/filters/types";
import { api } from "../api";
import { IFetchedFilmsResponse, IFilm } from "./types";

const filmsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFilm: build.query<IFilm, number>({
      providesTags: ["films"],
      query: (filmId) => `${FILMS_RELATIVE_URL}/${filmId}`,
    }),
    getFilms: build.query<IFetchedFilmsResponse, IFilters>({
      providesTags: ["films"],
      query: ({ checkedGenres, searchQuery, paginationPage: page = 1 }) => {
        const filmsLimit = 20;
        if (searchQuery) {
          return `${searchFilmsQueryUrl}?page=${page}&limit=${filmsLimit}&query=${searchQuery}`;
        }
        const genresQuery = checkedGenres.reduce(
          (cur, next) => (cur += `&genres.name=${next.name}`),
          ""
        );

        return `${FILMS_RELATIVE_URL}?page=${page}&filmsLimit=${filmsLimit}${genresQuery}`;
      },
    }),
  }),
});

export const { useGetFilmQuery, useGetFilmsQuery } = filmsApi;
