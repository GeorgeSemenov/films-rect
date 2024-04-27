import React from "react";
import Filters from "../Filters";
import FilmsList from "../FilmsList";
import { useGetGenresQuery } from "../../API/genres";
import useActions from "../../hooks/useActions";
import { useGetFilmsQuery } from "../../API/films";
import { FilmsDataType } from "../../slices/films/types";
import { CircularProgress } from "@mui/material";

export default function FilmsListAndFilters() {
  const { setGenres, setError, setFilmsData } = useActions();
  const {
    isLoading: isLoadingGenres,
    data: fetchedGenres,
    error: errorFetchedGenres,
  } = useGetGenresQuery();

  const {
    isLoading: isLoadingFilms,
    error: errorFetchedFilms,
    data: fetchedFilmsData,
  } = useGetFilmsQuery({});

  //локальная инициализация фильтров, фильмов и избранных фильмов
  if (!isLoadingGenres && !isLoadingFilms) {
    if (errorFetchedGenres || errorFetchedFilms) {
      setError({ error: new Error("Невозможно подгрузить данные ") });
    } else {
      if (fetchedGenres) setGenres(fetchedGenres);
      const filmsData: FilmsDataType = {
        films: fetchedFilmsData?.docs ? fetchedFilmsData?.docs : [],
        totalPages: fetchedFilmsData?.pages ? fetchedFilmsData?.pages : 1,
      };
      setFilmsData(filmsData);
    }
  }

  return (
    <div style={{ display: "flex" }}>
      {isLoadingFilms ? <CircularProgress /> : <Filters />}
      <FilmsList />
    </div>
  );
}
