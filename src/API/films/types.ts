import { IGenre } from "../genres/types";

export interface IFilm extends IDocFilm {
  slogan?: string;
  persons: [
    {
      id: number;
      photo?: string;
      name: string;
    }
  ];
  budget?: {
    currency: string;
    value: number;
  };
}

export interface IDocFilm {
  id: number;
  description: string;
  shortDescription: string;
  genres: IGenre[];
  name: string;
  poster: { previewUrl?: string; url?: string };
  rating: { kp: number };
  year: number;
}

export interface IFetchedFilmsResponse {
  docs: IDocFilm[];
  pages: number;
}
