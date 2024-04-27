//полное API можно найти тут : https://developer.themoviedb.org/reference/search-movie
export const filmLinkPrefix = "film";

export const URL_BASE = "https://api.kinopoisk.dev/";
export const GENRES_RELATIVE_URL =
  "v1/movie/possible-values-by-field?field=genres.name";
export const FILMS_RELATIVE_URL = "v1.4/movie";
export const searchFilmsQueryUrl = "/3/search/movie?query=";

export const imgServerPrefix = "https://image.tmdb.org/t/p/w220_and_h330_face/";
export const imgPostersServerPrefix =
  "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";

export const TOKEN = "3SVTEEX-Y8HMTYJ-J3ENEFG-WC1N623";

export const cookiesNames = {
  isAuthorized: "isAuthorized",
  email: "email",
  accountId: "accountId",
};
