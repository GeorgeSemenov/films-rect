import React from "react";
import Filters from "../Filters";
import FilmsList from "../FilmsList";
import { useGetGenresQuery } from "../../API/genres";
import useActions from "../../hooks/useActions";
import useFilters from "../../hooks/useFilters";
import { useGetFilmsQuery } from "../../API/films";
import { FilmsDataType } from "../../slices/films/types";
import { useGetUserQuery } from "../../API/user";
import { CircularProgress } from "@mui/material";

export default function FilmsListAndFilters() {
  const filters = useFilters();
  const { setGenres, setError, setFilmsData, setUser } = useActions();
  const {
    isLoading: isLoadingGenres,
    data: fetchedGenres,
    error: errorFetchedGenres,
  } = useGetGenresQuery();

  // const {
  //   isLoading: isLoadingFilms,
  //   error: errorFetchedFilms,
  //   data: fetchedFilmsData,
  // } = useGetFilmsQuery({});

  // if (!isLoadingFilms) console.warn(fetchedFilmsData);
  const {
    isLoading: isLoadingUser,
    error: errorFetchedUser,
    data: fetchedUser,
    isError: isFetchedUserError,
  } = useGetUserQuery();

  if (fetchedGenres) setGenres(fetchedGenres);
  //локальная инициализация фильтров, фильмов и избранных фильмов
  // if (!isLoadingGenres && !isLoadingFilms && !isLoadingUser) {
  //   if (errorFetchedGenres || errorFetchedFilms || errorFetchedUser) {
  //     setError({ error: new Error("Невозможно подгрузить данные ") });
  //   } else {
  //     const filmsData: FilmsDataType = {
  //       films: fetchedFilmsData?.results ? fetchedFilmsData?.results : [],
  //       totalPages: fetchedFilmsData?.total_pages
  //         ? fetchedFilmsData?.total_pages
  //         : 1,
  //     };
  //     setFilmsData(filmsData);
  //     if (fetchedUser) {
  //       setUser(fetchedUser);
  //     }
  //   }
  // }

  return (
    <div style={{ display: "flex" }}>
      <Filters />
      {isLoadingUser ? (
        <CircularProgress style={{ width: 150, height: 150 }} />
      ) : fetchedUser ? (
        <FilmsList user={fetchedUser} />
      ) : (
        isFetchedUserError && <p>Не удалось подгрузить данные с сервера</p>
      )}
    </div>
  );
}
