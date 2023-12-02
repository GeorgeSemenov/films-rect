import { IFilm } from "../constants";

export default function handleFilmsHref(unhandledFilms: IFilm[]) {
  return unhandledFilms.map((film: IFilm) => {
    return { ...film, href: `/film/${film.id}` };
  });
}
