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
  filters,
  setFilms,
  setIsLoading,
  filtersDispatch,
  setCookie,
  setError,
}: {
  setError: any;
  setIsFetchFilmsFailed: React.Dispatch<React.SetStateAction<boolean>>;
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
            setError({
              error: new Error("can't fetch accountId puk puk hooks"),
              displayDuration: "1s",
            });
            setIsFetchFilmsFailed(true);
          }
        )
        .finally(() => {
          setIsLoading(false);
        });
    },
    (err) => {
      setError({
        error: new Error(`can't reach server`),
        displayDelay: "1s",
        displayDuration: "5s",
      });

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
  };
}
