import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectComponent({
  placeholder,
  label = "Сортировать по",
  selectOptions,
  className = "",
  value,
  handleChange,
}: PropsInterface) {
  return (
    <>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select
        className={className}
        variant="standard"
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={handleChange}
        label={label}
        sx={{ width: "100%" }}
      >
        {placeholder && (
          <MenuItem value="">
            <em>{placeholder}</em>
          </MenuItem>
        )}
        {selectOptions.map((slct: SelectOptionIntreface) => {
          return (
            <MenuItem key={slct.value} value={slct.value}>
              {slct.label}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}

interface PropsInterface {
  placeholder?: string;
  label: string;
  selectOptions: SelectOptionIntreface[];
  className?: string;
  handleChange: (e: SelectChangeEvent) => void;
  value: string;
}

interface SelectOptionIntreface {
  value: string;
  label: string;
}
