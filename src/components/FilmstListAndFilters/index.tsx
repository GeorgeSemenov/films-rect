import React from "react";
import Filters from "../Filters";
import FilmsList from "../FilmsList";
import { useGetGenresQuery } from "../../API/genres";
import useActions from "../../hooks/useActions";
import useFilters from "../../hooks/useFilters";
import {
  useGetFilmsPopularQuery,
  useGetFilmsTopRatedQuery,
} from "../../API/films";
import { sortingValuesType } from "../../slices/filters/types";
import { IFilm } from "../../API/films/types";

export default function FilmsListAndFilters() {
  const {
    isLoading: isLoadingGenres,
    data: fetchedGenres,
    error: errorFetchedGenres,
  } = useGetGenresQuery();

  let fetchedFilmsRequest;
  const filters = useFilters();
  const sortedByPopularity: sortingValuesType = "byPopularity";
  if (filters?.checkedSortingType === sortedByPopularity) {
    fetchedFilmsRequest = useGetFilmsPopularQuery();
  } else {
    fetchedFilmsRequest = useGetFilmsTopRatedQuery();
  }
  const { setGenres, setError, setTotalPaginationPages } = useActions();

  //локальная инициализация фильтров, фильмов и избранных фильмов
  if (!isLoadingGenres && !fetchedFilmsRequest.isLoading) {
    if (errorFetchedGenres || fetchedFilmsRequest.isError) {
      setError({ error: new Error("Невозможно подгрузить данные ") });
    } else {
      initiateFiltersByFetchedData();
      if (fetchedFilmsRequest.data?.total_pages)
        setTotalPaginationPages(fetchedFilmsRequest.data?.total_pages);

      const films: IFilm[] = fetchedFilmsRequest.data?.results
        ? fetchedFilmsRequest.data?.results
        : [];
    }
  }

  // const {} = useGet
  function initiateFiltersByFetchedData() {
    if (fetchedGenres) setGenres(fetchedGenres);

    //TODO нужно ещё добавить полное колличество страниц
  }
  return (
    <div style={{ display: "flex" }}>
      <Filters initiateFiltersByFetchedData={initiateFiltersByFetchedData} />
      <FilmsList />
    </div>
  );
}
