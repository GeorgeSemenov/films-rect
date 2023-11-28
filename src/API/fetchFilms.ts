import fetchData from "./fetchData";
import { IFilm, URLs, IFavoriteFilm } from "../constants";
import fetchAllFavoriteFilms from "./fetchFavoriteFilms";

export async function fetchPopularFilmsWithPaginationData(
  accountId: number,
  page?: number
) {
  return await fetchFilms(URLs.popular, accountId, page);
}

export async function fetchTopRatedFilmsWithPaginationData(
  accountId: number,
  page?: number
) {
  return await fetchFilms(URLs.topRated, accountId, page);
}

async function fetchFilms(url: string | URL, accountId: number, page?: number) {
  const pageQuery = page === 0 || !page ? "" : `?page=${page}`;
  let response;
  try {
    response = await fetchData({ url: url + pageQuery });
  } catch (err) {
    console.error("error in fetchFilms", err);
    response = { results: [dummyFilm] };
    throw err;
  }
  let favoriteFilms: IFavoriteFilm[];
  try {
    favoriteFilms = await fetchAllFavoriteFilms(accountId);
  } catch (err) {
    console.error(`error in fetching favorite films`, err);
    throw err;
  }
  const serverFilms = response.results;
  const films = serverFilms.map((film: IFilm) => {
    return {
      ...film,
      isFavorite: favoriteFilms.some((ff) => ff.id === film.id),
      href: `/film/${film.id}`,
    };
  });
  return { films: films, paginationTotalPages: response.total_pages };
}

const dummyFilm: IFilm = {
  id: -1,
  isFavorite: false,
  href: "!#",
  title: "похоже не удалось подгрузить фильмы",
  release_date: "1989-50-70",
  genre_ids: [12],
};
