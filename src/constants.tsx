//полное API можно найти тут : https://developer.themoviedb.org/reference/search-movie
export const selectValues = {};

//Перенёс в api/films/types
export interface IFilm {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  isFavorite: boolean;
  href: string;
}

//Перенёс в api/films/types
export interface IFavoriteFilm {
  id: number;
}

export interface ICookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | "none" | "lax" | "strict";
}

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

//Зачем это?
export const films = [
  {
    href: "#!",
    alt: "string",
    title: "Мартица",
    rate: 9,
    isFavorite: true,
  },
  {
    href: "#!",
    alt: "string",
    title: "Терминатор 2 ",
    rate: 9,
    isFavorite: false,
  },
  {
    href: "#!",
    alt: "string",
    title: "Зелёная дуля",
    rate: 9,
    isFavorite: false,
  },
  {
    href: "#!",
    alt: "string",
    title: "Терминатор 3",
    rate: 9,
    isFavorite: false,
  },
];

export const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTQ1NzY5MzEwNWQyZjVjYzJhZDZjZGQyYmVkNTM1ZCIsInN1YiI6IjY0YTI4NmFkZDQwMGYzMDBlYmZlOWNhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BxFsDdf-OSp32s3Luex-TVZq_yG_CaBjr2SrWBirjyk";

export const filmDataInitialvalue = {
  credits: { cast: [{ name: "" }] },
  details: {
    title: "",
    budget: 0,
    genres: [{ name: "" }],
    popularity: 0,
    poster_path: "",
  },
};

export const cookiesNames = {
  isAuthorized: "isAuthorized",
  email: "email",
  accountId: "accountId",
};

//Взадчем это?
export interface IFetchedFilmsDataWithPaginationData {
  //Когда мы запрашиваем фильмы вместе со
  //списком фильмов мы должны получить и колличество страниц в списке
  films: IFilm[];
  paginationTotalPages: number;
}

//Перенёс в api/films/index.ts (переименовал в IFetchedFilms)
export interface IFetchFilmsResponse {
  results: IFilm[];
  total_pages: number;
}
