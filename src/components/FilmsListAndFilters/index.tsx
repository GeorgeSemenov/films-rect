import React from "react";
import Filters from "../Filters";
import FilmsList from "../FilmsList";
import { useGetGenresQuery } from "../../API/genres";
import useActions from "../../hooks/useActions";
import useFilters from "../../hooks/useFilters";
import { useGetFilmsQuery } from "../../API/films";
import { FilmsDataType } from "../../slices/films/types";

export default function FilmsListAndFilters() {
  const {
    isLoading: isLoadingGenres,
    data: fetchedGenres,
    error: errorFetchedGenres,
  } = useGetGenresQuery();

  // const {} = useGetFavorigeFilms();
  const filters = useFilters();
  const {
    isLoading: isLoadingFilms,
    error: errorFetchedFilms,
    data: fetchedFilmsData,
  } = useGetFilmsQuery(filters);

  const { setGenres, setError, setFilmsData } = useActions();

  //локальная инициализация фильтров, фильмов и избранных фильмов
  if (!isLoadingGenres && !isLoadingFilms) {
    if (errorFetchedGenres || errorFetchedFilms) {
      setError({ error: new Error("Невозможно подгрузить данные ") });
    } else {
      initiateFiltersByFetchedData();
      const filmsData: FilmsDataType = {
        films: fetchedFilmsData?.results ? fetchedFilmsData?.results : [],
        totalPages: fetchedFilmsData?.total_pages
          ? fetchedFilmsData?.total_pages
          : 1,
      };
      setFilmsData(filmsData);
    }
  }

  function initiateFiltersByFetchedData() {
    if (fetchedGenres) setGenres(fetchedGenres);
  }
  return (
    <div style={{ display: "flex" }}>
      <Filters initiateFiltersByFetchedData={initiateFiltersByFetchedData} />
      <FilmsList />
    </div>
  );
}
