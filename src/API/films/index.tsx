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
        //https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&genres.name=
        // genres.name=+драма&genres.name=+криминал
        let genresQuery = "";
        if (checkedGenres.length > 0) {
          const genresString;
          genresQuery = "&genres.name=";
        }
        return `${FILMS_RELATIVE_URL}?page=${page}&filmsLimit=${filmsLimit}${genresQuery}`;
      },
    }),
  }),
});

export const { useGetFilmQuery, useGetFilmsQuery } = filmsApi;
