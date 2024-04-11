import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FilmCard from "../FilmCard";
import { IFilm, cookiesNames } from "../../constants";
import {
  filtersInitialValues,
  useFilters,
  useFiltersDispatch,
} from "../../context/filtersContext";
import getFilmYear from "../../utils/getFilmYear";
import FetchErrorWindow from "../FetchErrorWindow";
import filmsListUseEffectFunction from "./filmsListUseEffectFunction";
import { useCookies } from "react-cookie";
import useActions from "../../hooks/useActions";
import useFilms from "../../hooks/useFilms";

export default function FilmsList() {
  // const films = useFilms();
  // const {setFilms} = useActions();
  const [films, setFilms] = useState<IFilm[]>([]);
  const [isFetchFilmsFailed, setIsFetchFilmsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const filters = useFilters() ?? filtersInitialValues;
  const [currentFiltersState, setCurrentFiltersState] = useState({
    curPage: filters.paginationPage,
    curSortingType: filters.checkedSortingType,
  }); // Это состояние которое запомнил компонент FilmsList
  const func = () => {
    console.warn(`filtersDispatch out of context`);
  };
  const filtersDispatch = useFiltersDispatch() ?? func;
  const [, setCookie] = useCookies([cookiesNames.accountId]);
  if (
    currentFiltersState.curPage !== filters.paginationPage ||
    currentFiltersState.curSortingType !== filters.checkedSortingType
  ) {
    //Если один из параметров состояния фильтров, которое запомнил компонент FilmsList - изменится, значит будут подгружаться новые фильмы и нужно выставить флаг, что загрузка началась
    setIsLoading(true);
    setCurrentFiltersState({
      curPage: filters.paginationPage,
      curSortingType: filters.checkedSortingType,
    });
  }
  const { setError } = useActions();
  useEffect(() => {
    filmsListUseEffectFunction({
      setIsFetchFilmsFailed,
      filters,
      setFilms,
      setIsLoading,
      filtersDispatch,
      setCookie,
      setError,
    });
  }, [filters.checkedSortingType, filters.paginationPage, filters.searchQuery]);
  const filteredFilmsList = films.filter((film: IFilm) => {
    let isGenresSuitable = !filters.checkedGenres.length;
    let isYearsSuitable = false;
    if (!isGenresSuitable) {
      isGenresSuitable = true;
      for (const checkedGenre of filters.checkedGenres) {
        if (!film.genre_ids.includes(checkedGenre.id)) {
          isGenresSuitable = false;
          break;
        }
      }
    }
    isYearsSuitable =
      getFilmYear(film) >= filters.years[0] &&
      getFilmYear(film) <= filters.years[1];
    return isGenresSuitable && isYearsSuitable;
  });
  function updateFilms(func: (films: IFilm[]) => IFilm[]): void {
    const newFilms = func(films);
    setFilms([...newFilms]);
  }
  return (
    <>
      {isFetchFilmsFailed ? (
        <FetchErrorWindow />
      ) : (
        <ul style={{ display: "flex", flexWrap: "wrap" }}>
          {isLoading ? (
            <CircularProgress style={{ width: 150, height: 150 }} />
          ) : filteredFilmsList.length === 0 ? (
            <p>
              Установленным фильтрам не соответсвтует ни один фильм на этой
              странице
            </p>
          ) : (
            filteredFilmsList.map((film: IFilm) => {
              return (
                <li
                  key={film.id}
                  style={{
                    flexShrink: "0",
                    width: "296px",
                    marginBottom: "15px",
                    marginRight: "15px",
                  }}
                >
                  <FilmCard film={film} updateFilms={updateFilms} />
                </li>
              );
            })
          )}
        </ul>
      )}
    </>
  );
}
