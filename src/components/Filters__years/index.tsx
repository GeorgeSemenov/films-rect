import React from "react";
import RangeComponent from "../RangeComponent";
import useFilters from "../../hooks/useFilters";
import useActions from "../../hooks/useActions";

export default function Filters__years({ className }: { className: string }) {
  const { setYears } = useActions();

  const filters = useFilters();

  function onChange(e: Event, newValue: number | number[]) {
    if (!Array.isArray(newValue)) {
      console.error(
        `error in Filters__years range slider return value not in array`
      );
      return;
    }

    const [minYear, maxYear] = newValue;

    setYears([minYear, maxYear]);
  }
  return (
    <>
      <RangeComponent
        className={className}
        minMaxRange={filters.minMaxYears}
        value={filters.years}
        onChange={onChange}
      />
    </>
  );
}
