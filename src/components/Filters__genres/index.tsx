import React, { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  useFilters,
  filtersReducerTypes,
  useFiltersDispatch,
  filtersInitialValues,
  IGenre,
} from "../../context/filtersContext";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Checkbox from "@mui/material/Checkbox";
import fetchGenres from "../../API/fetchGenres";

export default function Filters__genres({ className = "" }: propsInterface) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const filtersDispatch = useFiltersDispatch();
  const filters = useFilters();
  const genres = filters?.genres ?? filtersInitialValues.genres;

  function setNewGenres(newGenres: IGenre[], isForFetchGenres = true) {
    if (typeof filtersDispatch === "function") {
      filtersDispatch({
        type: isForFetchGenres
          ? filtersReducerTypes.setGenres
          : filtersReducerTypes.setCheckedGenres,
        [isForFetchGenres ? "genres" : "checkedGenres"]: newGenres,
      });
    } else {
      console.warn("filtersDispatch isn't in context");
    }
  }

  useEffect(() => {
    fetchGenres().then((genres) => {
      setNewGenres(genres);
    });
  }, []);

  function handleGenreCheck(e: any, checkedGenres: IGenre[]) {
    setNewGenres(checkedGenres, false);
  }
  return (
    <Autocomplete
      onChange={handleGenreCheck}
      className={className}
      multiple
      id="tags-standard"
      options={genres}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label="жанры" />
      )}
    />
  );
}

interface propsInterface {
  className?: string;
}
