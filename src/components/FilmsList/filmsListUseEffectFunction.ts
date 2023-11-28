import { SetStateAction } from "react";
import {
  fetchPopularFilmsWithPaginationData,
  fetchTopRatedFilmsWithPaginationData,
} from "../../API/fetchFilms";
import fetchUserId from "../../API/fetchUserId";
import { ICookieSetOptions, IFilm, cookiesNames } from "../../constants";
import {
  IAction,
  IFilters,
  filtersReducerTypes,
  sortingTypes,
} from "../../context/filtersContext";

export default function filmsListUseEffectFunction({
  setIsFetchFilmsFailed,
  setIsFetchAccountIdFailed,
  filters,
  setFilms,
  setIsLoading,
  filtersDispatch,
  setCookie,
}: {
  setIsFetchFilmsFailed: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFetchAccountIdFailed: React.Dispatch<React.SetStateAction<boolean>>;
  filters: IFilters;
  setFilms: React.Dispatch<React.SetStateAction<IFilm[]>>;
  setIsLoading: (value: React.SetStateAction<boolean>) => void;
  filtersDispatch: React.Dispatch<IAction>;
  setCookie: (
    name: string,
    value: any,
    options?: ICookieSetOptions | undefined
  ) => void;
}) {
  fetchUserId().then(
    (accountId: number) => {
      setCookie(cookiesNames.accountId, accountId, { maxAge: 3600 * 24 });
      switch (filters.checkedSortingType) {
        case sortingTypes.byPopularity: {
          fetchPopularFilmsWithPaginationData(
            accountId,
            filters.paginationPage
          ).then(
            ({
              films,
              paginationTotalPages,
            }: {
              films: never[];
              paginationTotalPages: number;
            }) => {
              setFilms(films);
              setIsLoading(false);
              filtersDispatch({
                type: filtersReducerTypes.setTotalPages,
                paginationTotalPages: paginationTotalPages,
              });
            },
            (err) => {
              console.error(err);
              setIsFetchFilmsFailed(true);
            }
          );
          break;
        }
        case sortingTypes.byRating: {
          fetchTopRatedFilmsWithPaginationData(
            accountId,
            filters.paginationPage
          ).then(
            ({ films, paginationTotalPages }) => {
              setFilms(films);
              setIsLoading(false);
              filtersDispatch({
                type: filtersReducerTypes.setTotalPages,
                paginationTotalPages: paginationTotalPages,
              });
            },
            (err) => {
              console.error(err);
              setIsFetchFilmsFailed(true);
            }
          );
          break;
        }
      }
    },
    (err) => {
      setIsFetchAccountIdFailed(true);
      console.error(err);
    }
  );

  return () => {
    //Создаю cleanUp функцию она запускается каждый раз, перед useEffect и в момент
    //Когда компонент удаляется
    setIsLoading(true);
    setIsFetchFilmsFailed(false);
    setIsFetchAccountIdFailed(false);
  };
}
