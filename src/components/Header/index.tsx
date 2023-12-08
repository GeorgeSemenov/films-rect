import React, { useRef, useState } from "react";
import "./styles.scss";
import Link from "@mui/material/Link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import { useCookies } from "react-cookie";
import { cookiesNames } from "../../constants";
import ChangeEmailDialogWindow from "../ChangeEmailDialogWindow";
import { useDisplayedErrorDispatchContext } from "../../context/ErrorContext";

export default function Header() {
  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const [cookies] = useCookies([cookiesNames.isAuthorized]);
  const [isNeedToShowChangeLoginWindow, setIsNeedToShowChangeLoginWindow] =
    useState(false);
  const displayedErrorDispatch = useDisplayedErrorDispatchContext();
  return (
    <>
      <header className="films-app-header">
        <Link style={{ color: "white", cursor: "pointer" }} href="/">
          FILMS
        </Link>
        <IconButton
          ref={iconButtonRef}
          onClick={() => {
            if (iconButtonRef.current) {
              iconButtonRef.current.blur();
            }
            setIsNeedToShowChangeLoginWindow(true);
            if (displayedErrorDispatch) {
              if (!cookies[cookiesNames.isAuthorized]) {
                displayedErrorDispatch({
                  error: new Error("You are not authorized yet"),
                });
              }
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.warn(
                `account icon isn't allowed to key pressed by enter`
              );
            }
          }}
          disabled={!cookies[cookiesNames.isAuthorized]}
        >
          <AccountCircleIcon style={{ color: "white" }} />
        </IconButton>
      </header>
      {isNeedToShowChangeLoginWindow && cookies[cookiesNames.isAuthorized] && (
        <ChangeEmailDialogWindow
          setIsNeedToShowChangeLoginWindow={setIsNeedToShowChangeLoginWindow}
          isNeedToShowChangeLoginWindow={isNeedToShowChangeLoginWindow}
        />
      )}
    </>
  );
}
