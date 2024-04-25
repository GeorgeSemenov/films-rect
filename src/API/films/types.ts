import { Url } from "url";

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
  href: string;
}

export interface IFetchedFilmsResponse {
  results: IFilm[];
  total_pages: number;
}

export interface IFetchedFilmResponse {
  credits: ICredits;
  details: IDetails;
}

interface IDetails {
  title: string;
  budget: number;
  genres: { name: string }[];
  popularity: number;
  poster_path?: string | Url;
}
interface ICredits {
  cast: ICast[];
}
interface ICast {
  name: string;
}
