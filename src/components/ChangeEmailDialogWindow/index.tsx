import React, { useState } from "react";
import DialogWindow from "../DialogWindow";
import isEmailCorrect from "../../utils/isEmailCorrect";
import { useCookies } from "react-cookie";
import { cookiesNames } from "../../constants";

export default function ChangeEmailDialogWindow({
  setIsNeedToShowChangeLoginWindow,
  isNeedToShowChangeLoginWindow,
}: {
  isNeedToShowChangeLoginWindow: boolean;
  setIsNeedToShowChangeLoginWindow: (isNeed: boolean) => void;
}) {
  const [newEmail, setNewEmail] = useState("");
  const [errorText, setErrorText] = useState<string | undefined>(undefined);
  const [cookies, setCookies] = useCookies([cookiesNames.email]);
  return (
    <DialogWindow
      title={`Текущий email : ${cookies[cookiesNames.email]}`}
      isNeedModalWindow={isNeedToShowChangeLoginWindow}
      inputBlocks={[
        {
          label: "Сменить логин на",
          inputId: "changeLoginId",
          isFocused: true,
          onChange: (e) => {
            setNewEmail("" + e.target.value);
          },
        },
      ]}
      errorMessage={errorText}
      onClose={() => {
        setIsNeedToShowChangeLoginWindow(false);
      }}
      handleSubmit={() => {
        if (isEmailCorrect(newEmail)) {
          setCookies(cookiesNames.email, newEmail, { maxAge: 3600 * 24 });
          setErrorText(undefined);
          setIsNeedToShowChangeLoginWindow(false);
        } else {
          setErrorText("Email is incorrect!");
        }
      }}
    />
  );
}
