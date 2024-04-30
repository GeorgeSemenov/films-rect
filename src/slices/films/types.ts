import { IDocFilm } from "../../API/films/types";

export type FilmsDataType = {
  totalPages: number;
  films: IDocFilm[];
};
