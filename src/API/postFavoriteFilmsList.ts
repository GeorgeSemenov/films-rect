import { urlBase } from "../constants";
import fetchData from "./fetchData";

export async function postFavoriteFilm(
  accountId: number,
  filmId: number,
  isFavorite: boolean
) {
  fetchData({
    url: `${urlBase}/3/account/${accountId}/favorite`,
    method: "POST",
    body: {
      media_type: "movie",
      media_id: filmId,
      favorite: isFavorite,
    },
  });
}

export function addFilmToFavorites(accountId: number, filmId: number) {
  postFavoriteFilm(accountId, filmId, true);
}

export function removeFilmFromFavorites(accountId: number, filmId: number) {
  postFavoriteFilm(accountId, filmId, false);
}
