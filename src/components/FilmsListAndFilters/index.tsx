import React, { useEffect, useState } from "react";
import Filters from "../Filters";
import FilmsList from "../FilmsList";
import { useGetGenresQuery } from "../../API/genres";
import useActions from "../../hooks/useActions";
import useFilters from "../../hooks/useFilters";
import { useGetFilmsQuery } from "../../API/films";
import { FilmsDataType } from "../../slices/films/types";
import { useGetUserQuery } from "../../API/user";
import { CircularProgress } from "@mui/material";
import { IFetchedFilmsResponse } from "../../API/films/types";

export default function FilmsListAndFilters() {
  const filters = useFilters();
  // const [fetchedFilmsData, setFetchedFilmsData] =
  //   useState<IFetchedFilmsResponse>({ results: [], total_pages: 1 });
  // const [isLoadingFilms, setIsLoadingFilms] = useState<boolean>(true);
  // const [errorFetchedFilms, setErrorFetchedFilms] = useState("");
  const { setGenres, setError, setFilmsData, setUser } = useActions();
  // useEffect(() => {
  //   const {
  //     data: fetchedFilmsData,
  //     isLoading: isLoadingFilms,
  //     error: errorFetchedFilms,
  //   } = useGetFilmsQuery(filters);
  //   if (fetchedFilmsData) {
  //     setFetchedFilmsData(fetchedFilmsData);
  //     setFilmsData(fetchedFilmsData);
  //     setIsLoadingFilms(false);
  //   }
  //   if (errorFetchedFilms) {
  //     setError({ error: new Error(JSON.stringify(errorFetchedFilms)) });
  //     setErrorFetchedFilms(JSON.stringify(errorFetchedFilms));
  //   }
  // }, [filters]);
  const {
    isLoading: isLoadingGenres,
    data: fetchedGenres,
    error: errorFetchedGenres,
  } = useGetGenresQuery();

  const {
    isLoading: isLoadingFilms,
    error: errorFetchedFilms,
    data: fetchedFilmsData,
  } = useGetFilmsQuery(filters);

  const {
    isLoading: isLoadingUser,
    error: errorFetchedUser,
    data: fetchedUser,
    isError: isFetchedUserError,
  } = useGetUserQuery();

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
      {isLoadingUser && isLoadingFilms ? (
        <CircularProgress style={{ width: 150, height: 150 }} />
      ) : fetchedUser ? (
        <FilmsList user={fetchedUser} />
      ) : (
        isFetchedUserError && <p>Не удалось подгрузить данные с сервера</p>
      )}
    </div>
  );
}
