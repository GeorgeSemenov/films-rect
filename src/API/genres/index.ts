import { TOKEN } from "../../constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URLs } from "../../constants";
import { IGenre } from "../../context/filtersContext";

export const genresSlice = createApi({
  reducerPath: "themovieDBApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "URLs.genres.toString()",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set("content-type", "application/json");
      headers.set("Authorization", `Bearer ${TOKEN}`);
      return headers;
    },
  }),
  tagTypes: ["genres"],
  endpoints: (build) => ({
    getGenres: build.query<IGenre[], void>({
      query: () => "/pidr/",
      transformResponse(baseQueryReturnValue: { genres: IGenre[] }, meta, arg) {
        console.warn(`meta = `, meta);
        console.warn(`art = `, arg);
        return baseQueryReturnValue?.genres;
      },
    }),
  }),
});

export const { useGetGenresQuery } = genresSlice;
