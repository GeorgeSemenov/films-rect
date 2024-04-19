import React from "react";
import Filters from "../Filters";
import FilmsList from "../FilmsList";
import { useGetGenresQuery } from "../../API/genres";
import useActions from "../../hooks/useActions";
import useFilters from "../../hooks/useFilters";
import { useGetFavoriteFilmsQuery, useGetFilmsQuery } from "../../API/films";
import { FilmsDataType } from "../../slices/films/types";
import { useGetUserQuery } from "../../API/user";
import { CircularProgress } from "@mui/material";

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

  const {
    isLoading: isLoadingUser,
    error: errorFetchedUser,
    data: fetchedUser,
  } = useGetUserQuery();

  let isFavFilmsLoaded = false;
  if (fetchedUser) {
    isFavFilmsLoaded = useGetFavoriteFilmsQuery({
      user: fetchedUser,
      page: 1,
    }).isLoading;
  }
  const { setGenres, setError, setFilmsData, setUser } = useActions();

  //локальная инициализация фильтров, фильмов и избранных фильмов
  if (!isLoadingGenres && !isLoadingFilms && !isLoadingUser) {
    if (errorFetchedGenres || errorFetchedFilms || errorFetchedUser) {
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
      if (fetchedUser) {
        setUser(fetchedUser);
      }
    }
  }

  function initiateFiltersByFetchedData() {
    if (fetchedGenres) setGenres(fetchedGenres);
  }
  return (
    <div style={{ display: "flex" }}>
      <Filters initiateFiltersByFetchedData={initiateFiltersByFetchedData} />
      {isLoadingUser ? (
        <CircularProgress style={{ width: 150, height: 150 }} />
      ) : fetchedUser ? (
        <FilmsList user={fetchedUser} />
      ) : (
        <p>Не удалось подгрузить данные о пользователе</p>
      )}
    </div>
  );
}
