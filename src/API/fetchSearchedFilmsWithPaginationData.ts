import {
  IFetchFilmsResponse,
  IFetchedFilmsDataWithPaginationData,
  urlBase,
} from "../constants";
import handleFilms from "../scripts/handleFilms";
import fetchData from "./fetchData";

export default async function fetchSearchedFilmsWithPaginationData(
  query: string,
  page: number,
  accountId: number
): Promise<IFetchedFilmsDataWithPaginationData> {
  const response: IFetchFilmsResponse = await fetchData({
    method: "GET",
    url: `${urlBase}/3/search/movie?query=${query}&page=${page}`,
  });
  const films = await handleFilms(response.results, accountId);
  return { films: films, paginationTotalPages: response.total_pages };
}
