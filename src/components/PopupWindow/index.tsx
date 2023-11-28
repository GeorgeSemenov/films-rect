import React from "react";
import "./styles.scss";

export default function PopupWindow({
  message,
  className = "",
  animationDuration = "5s",
  animationDelay = "0s",
}: {
  message: string;
  className?: string;
  animationDuration?: string;
  animationDelay?: string;
}) {
  return (
    <p
      className={`popup-window ${className}`}
      style={{
        animationDuration: animationDuration,
        animationDelay: animationDelay,
      }}
    >
      {message}
    </p>
  );
}
