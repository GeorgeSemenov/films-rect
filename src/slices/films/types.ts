import { IFilm } from "../../API/films/types";

export type FilmsDataType = {
  totalPages: number;
  films: IFilm[];
};
