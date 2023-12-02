import { IFilm } from "../constants";
import handleFavoriteFilms from "./handleFavoriteFilms";
import handleFilmsHref from "./handleFilmsHref";

export default async function handleFilms(
  unhandledFilms: IFilm[],
  accountId: number
) {
  let handledFilms = await handleFavoriteFilms(unhandledFilms, accountId);
  handledFilms = handleFilmsHref(handledFilms);

  return handledFilms;
}
