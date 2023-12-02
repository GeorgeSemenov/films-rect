import { IconButton } from "@mui/material";
import "./styles.scss";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import React from "react";
import { useState } from "react";

export default function SearchBar({
  className = "",
  onSearch,
}: {
  className?: string;
  onSearch: (searchQuery?: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className={"search-bar " + className}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          onSearch(searchQuery);
        }
      }}
    >
      <TextField
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        label="Search"
        className="searc-bar__input"
        style={{ width: "100%" }}
      />
      <IconButton
        className="search-bar__button"
        onClick={() => {
          onSearch(searchQuery);
        }}
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
}
