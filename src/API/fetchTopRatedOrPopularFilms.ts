import fetchData from "./fetchData";
import {
  IFetchFilmsResponse,
  IFetchedFilmsDataWithPaginationData,
  IFilm,
  URLs,
} from "../constants";
import handleFilms from "../scripts/handleFilms";

export async function fetchPopularFilmsWithPaginationData(
  accountId: number,
  page?: number
): Promise<IFetchedFilmsDataWithPaginationData> {
  return await fetchTopRatedOrPopularFilms(URLs.popular, accountId, page);
}

export async function fetchTopRatedFilmsWithPaginationData(
  accountId: number,
  page?: number
): Promise<IFetchedFilmsDataWithPaginationData> {
  return await fetchTopRatedOrPopularFilms(URLs.topRated, accountId, page);
}

async function fetchTopRatedOrPopularFilms(
  url: string | URL,
  accountId: number,
  page?: number
): Promise<IFetchedFilmsDataWithPaginationData> {
  const pageQuery = page === 0 || !page ? "" : `?page=${page}`;
  let response: IFetchFilmsResponse;
  try {
    response = await fetchData({ url: url + pageQuery });
  } catch (err) {
    console.error("error in fetchTopRatedOrPopularFilms", err);
    response = { results: [dummyFilm], total_pages: 1 };
    throw err;
  }

  const serverFilms = response.results;
  const films = await handleFilms(serverFilms, accountId);

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
