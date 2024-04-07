import { createContext, useContext } from "react";
import React from "react";
import { useImmerReducer } from "use-immer";
const paginationTotalPagesInitialValue = 5;
const paginationTotalPagesMaxValue = 500;

const FiltersContext = createContext<IFilters | null>(null);
const FiltersDispatchContext = createContext<React.Dispatch<IAction> | null>(
  null
);

export default function FiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, filtersDispatch] = useImmerReducer(filtersReducer, {
    ...filtersInitialValues,
  });
  return (
    <FiltersContext.Provider value={filters}>
      <FiltersDispatchContext.Provider value={filtersDispatch}>
        {children}
      </FiltersDispatchContext.Provider>
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  return useContext(FiltersContext);
}

export function useFiltersDispatch() {
  return useContext(FiltersDispatchContext);
}

function filtersReducer(
  draft: IFilters,
  {
    type,
    checkedSortingType,
    years,
    checkedGenres,
    genres,
    paginationPage,
    paginationTotalPages,
    searchQuery,
  }: IAction
) {
  switch (type) {
    case filtersReducerTypes.changeSorting: {
      //
      if (checkedSortingType) {
        draft.checkedSortingType = checkedSortingType;
      }
      break;
    }
    case filtersReducerTypes.changeYears: {
      //
      if (years) {
        draft.years = years;
      }
      break;
    }
    case filtersReducerTypes.setCheckedGenres: {
      //
      if (checkedGenres) {
        draft.checkedGenres = checkedGenres;
      }
      break;
    }
    case filtersReducerTypes.setGenres: {
      //
      if (genres) {
        draft.genres = genres;
      }
      break;
    }
    case filtersReducerTypes.changePaginationPage: {
      //
      if (paginationPage) {
        draft.paginationPage = paginationPage;
      }
      break;
    }
    case filtersReducerTypes.setTotalPages: {
      //
      paginationTotalPages = paginationTotalPages
        ? paginationTotalPages
        : paginationTotalPagesInitialValue; // чтобы paginationTotalPages точно был не undefined
      paginationTotalPages =
        paginationTotalPages > paginationTotalPagesMaxValue
          ? paginationTotalPagesMaxValue
          : paginationTotalPages;
      draft.paginationTotalPages = paginationTotalPages;
      break;
    }
    case filtersReducerTypes.setSearchQuery: {
      //
      draft.searchQuery = searchQuery;
      break;
    }
    case filtersReducerTypes.resetFilters: {
      Object.assign(draft, filtersInitialValues);
      break;
    }
    default: {
      console.error("unexpected type in filtersReducer");
    }
  }
}

export const filtersReducerTypes = {
  changeSorting: "changeSorting",
  setGenres: "setGenres",
  setCheckedGenres: "setCheckedGenres",
  changeYears: "changeYears",
  changePaginationPage: "changePaginationPage",
  setTotalPages: "setTotalPages",
  setSearchQuery: "setSearchQuery",
  resetFilters: "resetFilters",
};

//Перепонос(в API genres)
export interface IGenre {
  id: number;
  name: string;
}

//Перепонос
export interface IFilters {
  years: [number, number];
  minMaxYears: [number, number];
  filtersSortingTypes: IfiltersSortingTypes[];
  checkedSortingType: string;
  genres: IGenre[];
  checkedGenres: IGenre[];
  paginationTotalPages: number;
  paginationPage: number;
  searchQuery?: string;
}

//Перепонос
export interface IfiltersSortingTypes {
  value: string;
  label: string;
  selected: boolean;
}

//не нужен
export interface IAction {
  type: string;
  sortingType?: string;
  checkedSortingType?: string;
  years?: [number, number];
  checkedGenres?: IGenre[];
  genres?: IGenre[];
  paginationPage?: number;
  paginationTotalPages?: number;
  searchQuery?: string;
}

//Переворот
export const filtersSortingTypes = {
  byPopularity: "byPopularity",
  byRating: "byRating",
};

//Переврот
export const filtersInitialValues: IFilters = {
  filtersSortingTypes: [
    {
      value: filtersSortingTypes.byPopularity,
      label: "По популярности",
      selected: true,
    },
    {
      value: filtersSortingTypes.byRating,
      label: "По рэйтингу",
      selected: false,
    },
  ],
  checkedSortingType: filtersSortingTypes.byPopularity,
  genres: [
    {
      id: 28,
      name: "боевик",
    },
    {
      id: 12,
      name: "приключения",
    },
    {
      id: 16,
      name: "мультфильм",
    },
    {
      id: 35,
      name: "комедия",
    },
  ],
  checkedGenres: [],
  years: [1960, 2023],
  minMaxYears: [1950, 2023],
  paginationTotalPages: 5,
  paginationPage: 1,
  searchQuery: "",
};
