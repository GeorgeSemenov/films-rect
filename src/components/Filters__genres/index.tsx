import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Checkbox from "@mui/material/Checkbox";
import useFilters from "../../hooks/useFilters";
import useActions from "../../hooks/useActions";
import { IGenre } from "../../API/genres/types";
import { useGetGenresQuery } from "../../API/genres";

export default function Filters__genres({
  className = "",
}: {
  className?: string;
}) {
  const { setCheckedGenres, setError, setGenres } = useActions();
  const { error: fetchGenresError, data: uploadedGenres } = useGetGenresQuery();
  if (fetchGenresError) {
    setError({ error: new Error("Ошибка при загрузке списка жанров") });
  } else {
    if (uploadedGenres) setGenres(uploadedGenres);
  }
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { genres } = useFilters();

  function handleGenreCheck(e: any, checkedGenres: IGenre[]) {
    setCheckedGenres(checkedGenres);
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
