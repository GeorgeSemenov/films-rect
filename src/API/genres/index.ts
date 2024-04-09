import { genresRelativeUrl } from "../../constants";
import { api } from "../api";
import { IGenre } from "./types";

const genresApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query<IGenre[], void>({
      query: () => genresRelativeUrl,
      transformResponse(baseQueryReturnValue: { genres: IGenre[] }, meta, arg) {
        return baseQueryReturnValue?.genres;
      },
    }),
  }),
});

export const { useGetGenresQuery } = genresApi;
