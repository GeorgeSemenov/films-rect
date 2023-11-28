import React from "react";
import RangeComponent from "../RangeComponent";
import {
  useFilters,
  useFiltersDispatch,
  filtersReducerTypes,
} from "../../context/filtersContext";

export default function Filters__years({ className }: IProps) {
  const filtersDispatch = useFiltersDispatch();
  const filters = useFilters();
  const initialYears: [number, number] = filters?.minMaxYears ?? [1950, 2023];
  const years: [number, number] = filters?.years ?? initialYears;

  function onChange(e: Event, newValue: number | number[]) {
    if (!Array.isArray(newValue)) {
      console.error(
        `error in Filters__years range slider return value not in array`
      );
    }
    const minYear = Array.isArray(newValue)
      ? newValue[0] ?? initialYears[0]
      : initialYears[0];
    const maxYear = Array.isArray(newValue)
      ? newValue[1] ?? initialYears[1]
      : initialYears[1];

    filtersDispatch?.({
      type: filtersReducerTypes.changeYears,
      years: [minYear, maxYear],
    });
  }
  return (
    <>
      <RangeComponent
        className={className}
        minMaxRange={[1950, 2023]}
        value={years}
        onChange={onChange}
      />
    </>
  );
}

interface IProps {
  className: string;
}
