//полное API можно найти тут : https://developer.themoviedb.org/reference/search-movie
export const filmLinkPrefix = "film";

export const URL_BASE = "https://api.kinopoisk.dev/v1.4";

export const urlBase = "https://api.themoviedb.org"; //удалить
export const genresRelativeUrl = "/3/genre/movie/list?language=ru";
export const filmsPopularRelativeUrl = "/3/movie/popular?language=ru";
export const filmsTopRatedRelativeUrl = "/3/movie/top_rated?language=ru";
export const accountIdRelativeUrl = "/3/account/account_id?language=ru";
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
