import { IFetchedFilmsDataWithPaginationData } from "../constants";
import { filtersSortingTypes } from "../context/filtersContext";
import fetchSearchedFilms from "./fetchSearchedFilmsWithPaginationData";
import {
  fetchPopularFilmsWithPaginationData,
  fetchTopRatedFilmsWithPaginationData,
} from "./fetchTopRatedOrPopularFilms";

export default async function fetchFilmsWithPaginationData({
  accountId,
  searchQuery,
  page,
  checkedSortingType,
}: {
  accountId: number;
  searchQuery?: string;
  page: number;
  checkedSortingType: string;
}): Promise<IFetchedFilmsDataWithPaginationData> {
  if (!filtersSortingTypes && !searchQuery) {
    throw new Error(`error in fetchFilms. There must be one or two of this: checkedSortingTypes or searchQuery.
    fetchFilms get data: accountId = ${accountId}, searchQuery = ${searchQuery}, page = ${page}, checkedSortingType = ${checkedSortingType}`);
  }

  if (searchQuery) {
    return fetchSearchedFilms(searchQuery, page, accountId);
  } else {
    switch (checkedSortingType) {
      case filtersSortingTypes.byPopularity: {
        return fetchPopularFilmsWithPaginationData(accountId, page);
      }
      // case filtersSortingTypes.byRating:{}
      default: {
        return fetchTopRatedFilmsWithPaginationData(accountId, page);
      }
    }
  }
}
