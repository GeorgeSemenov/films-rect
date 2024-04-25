//полное API можно найти тут : https://developer.themoviedb.org/reference/search-movie
export const filmLinkPrefix = "film";

export const URL_BASE = "https://api.kinopoisk.dev/v1.4";

export const urlBase = "https://api.themoviedb.org";
export const genresRelativeUrl = "/3/genre/movie/list?language=ru";
export const filmsPopularRelativeUrl = "/3/movie/popular?language=ru";
export const filmsTopRatedRelativeUrl = "/3/movie/top_rated?language=ru";
export const accountIdRelativeUrl = "/3/account/account_id?language=ru";
export const searchFilmsQueryUrl = "/3/search/movie?query="; //Нужно в конец строки добавить запрос для поиска
export const URLs = {
  popular: new URL("/3/movie/popular", urlBase),
  topRated: new URL("/3/movie/top_rated", urlBase),
  genres: new URL("/3/genre/movie/list?language=ru", urlBase),
  accountId: new URL("/3/account/account_id", urlBase),
};
export const imgServerPrefix = "https://image.tmdb.org/t/p/w220_and_h330_face/";
export const imgPostersServerPrefix =
  "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";

export const KINOPOISK_TOKEN = "3SVTEEX-Y8HMTYJ-J3ENEFG-WC1N623";
export const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTQ1NzY5MzEwNWQyZjVjYzJhZDZjZGQyYmVkNTM1ZCIsInN1YiI6IjY0YTI4NmFkZDQwMGYzMDBlYmZlOWNhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BxFsDdf-OSp32s3Luex-TVZq_yG_CaBjr2SrWBirjyk";

export const cookiesNames = {
  isAuthorized: "isAuthorized",
  email: "email",
  accountId: "accountId",
};
