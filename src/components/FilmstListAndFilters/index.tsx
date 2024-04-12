import React from "react";
import Filters from "../Filters";
import FilmsList from "../FilmsList";
import { useGetGenresQuery } from "../../API/genres";
import useActions from "../../hooks/useActions";
import useFilters from "../../hooks/useFilters";
import { useGetFilmsQuery } from "../../API/films";
import { IFilm } from "../../API/films/types";

export default function FilmsListAndFilters() {
  const {
    isLoading: isLoadingGenres,
    data: fetchedGenres,
    error: errorFetchedGenres,
  } = useGetGenresQuery();

  const filters = useFilters();
  const {
    isLoading: isLoadingFilms,
    error: errorFetchedFilms,
    data: fetchedFilmsData,
  } = useGetFilmsQuery(filters);

  const { setGenres, setError, setTotalPaginationPages, setFilms } =
    useActions();

  //локальная инициализация фильтров, фильмов и избранных фильмов
  if (!isLoadingGenres && !isLoadingFilms) {
    if (errorFetchedGenres || errorFetchedFilms) {
      setError({ error: new Error("Невозможно подгрузить данные ") });
    } else {
      initiateFiltersByFetchedData();

      const films: IFilm[] = fetchedFilmsData?.results
        ? fetchedFilmsData?.results
        : [];
      setFilms(films);
    }
  }

  function initiateFiltersByFetchedData() {
    if (fetchedGenres) setGenres(fetchedGenres);
    if (fetchedFilmsData?.total_pages)
      setTotalPaginationPages(fetchedFilmsData?.total_pages);
  }
  return (
    <div style={{ display: "flex" }}>
      <Filters initiateFiltersByFetchedData={initiateFiltersByFetchedData} />
      <FilmsList />
    </div>
  );
}
