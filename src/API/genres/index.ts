import { GENRES_RELATIVE_URL } from "../../constants";
import { api } from "../api";
import { IGenre } from "./types";

const genresApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query<IGenre[], void>({
      query: () => GENRES_RELATIVE_URL,
    }),
  }),
});

export const { useGetGenresQuery } = genresApi;
