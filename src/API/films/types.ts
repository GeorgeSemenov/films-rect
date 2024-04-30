import { Url } from "url";
import { IGenre } from "../genres/types";

export interface IDocFilm {
  id: number;
  description: string;
  shortDescription: string;
  genres: IGenre[];
  name: string;
  poster: { previewUrl: string; url: string };
  rating: { kp: number };
  year: number;
}

export interface IFetchedFilmsResponse {
  docs: IDocFilm[];
  pages: number;
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
