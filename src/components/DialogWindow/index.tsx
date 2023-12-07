import { Dialog, DialogTitle } from "@mui/material";
import React from "react";
import "./styles.scss";
import DialogWindowContent from "./dialogWindowContent";

export default function DialogWindow({
  title,
  submitButtonText = "Отправить",
  inputBlocks,
  onClose,
  handleSubmit,
  errorMessage,
  isNeedModalWindow,
}: {
  title?: string;
  submitButtonText?: string;
  errorMessage?: string;
  isNeedModalWindow: boolean;
  inputBlocks: {
    label: string;
    inputId: string;
    inputPlaceholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isFocused?: boolean;
  }[];
  handleSubmit: () => void;
  onClose?: () => void;
}) {
  return (
    <Dialog
      onClose={onClose}
      open={isNeedModalWindow}
      className="dialog-window"
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          handleSubmit();
        }
      }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      {/* Пришлось содержимое Dialog выложить в отдельный компонент, потому что, если просто указать 
      содержимое в данном компоненте, то черезе useRef и useEffect не удаётся получить ссылку на input 
      который должен быть в фокусе */}
      <DialogWindowContent
        inputBlocks={inputBlocks}
        errorMessage={errorMessage}
        submitButtonText={submitButtonText}
        handleSubmit={handleSubmit}
      />
    </Dialog>
  );
}
