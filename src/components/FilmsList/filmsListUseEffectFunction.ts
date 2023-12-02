import { SetStateAction } from "react";
import fetchUserId from "../../API/fetchUserId";
import { ICookieSetOptions, IFilm, cookiesNames } from "../../constants";
import {
  IAction,
  IFilters,
  filtersReducerTypes,
} from "../../context/filtersContext";
import fetchFilmsWithPaginationData from "../../API/fetchFilmsWithPaginationData";

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
      fetchFilmsWithPaginationData({
        accountId,
        searchQuery: filters.searchQuery,
        page: filters.paginationPage,
        checkedSortingType: filters.checkedSortingType,
      })
        .then(
          ({
            films,
            paginationTotalPages,
          }: {
            films: IFilm[];
            paginationTotalPages: number;
          }) => {
            setFilms(films);
            filtersDispatch({
              type: filtersReducerTypes.setTotalPages,
              paginationTotalPages: paginationTotalPages,
            });
          },
          (err) => {
            console.error(err);
            setIsFetchFilmsFailed(true);
          }
        )
        .finally(() => {
          setIsLoading(false);
        });
    },
    (err) => {
      setIsFetchAccountIdFailed(true);
      setIsFetchFilmsFailed(true);
      setIsLoading(false);
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
