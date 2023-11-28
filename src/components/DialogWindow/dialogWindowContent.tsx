import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import "./styles.scss";

export default function DialogWindowContent({
  inputBlocks,
  errorMessage,
  handleSubmit,
  submitButtonText,
}: {
  handleSubmit: () => void;
  submitButtonText: string;
  inputBlocks: {
    label: string;
    inputId: string;
    inputPlaceholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isFocused?: boolean;
  }[];
  errorMessage?: string;
}) {
  const focusedInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (focusedInputRef.current) {
      focusedInputRef.current.focus();
    }
  });
  return (
    <div className="popup-window__wrapper">
      {inputBlocks.map((block, index) => (
        <div key={index} className="popup-window__input-block">
          <label htmlFor={block.inputId} className="popup-window__label">
            {block.label}
          </label>
          <input
            ref={block.isFocused ? focusedInputRef : null}
            className="popup-window__input"
            id={block.inputId}
            placeholder={block.inputPlaceholder}
            onChange={block.onChange}
          ></input>
        </div>
      ))}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
        className="popup-window__submit-button"
      >
        {submitButtonText}
      </Button>
    </div>
  );
}
