import React from "react";
import Slider from "@mui/material/Slider";

export default function RangeComponent({
  minMaxRange,
  className = "",
  value,
  onChange,
}: propsInterface) {
  // const [value, setValue] = React.useState<number[]>(initialRange);
  // const handleChange = (event: Event, newValue: number | number[]) => {
  //   console.log(newValue);
  //   setValue(newValue as number[]);
  // };
  return (
    <Slider
      className={className}
      min={minMaxRange[0]}
      max={minMaxRange[1]}
      getAriaLabel={() => "Year range"}
      value={value}
      onChange={onChange}
      valueLabelDisplay="auto"
    />
  );
}

interface propsInterface {
  minMaxRange: [number, number];
  className?: string;
  value: [number, number];
  onChange: (e: Event, newValue: number | number[]) => void;
}
