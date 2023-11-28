import React, { createContext, useContext, useState } from "react";
import { useImmerReducer } from "use-immer";
useImmerReducer;
const IsAuthorizedContext = createContext<boolean>(false);
const SetIsAuthorizedContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

export function useIsAuthorized() {
  return useContext(IsAuthorizedContext);
}

export function useSetIsAuthorized() {
  return useContext(SetIsAuthorizedContext);
}

export default function IsAuthorizedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  return (
    <IsAuthorizedContext.Provider value={isAuthorized}>
      <SetIsAuthorizedContext.Provider value={setIsAuthorized}>
        {children}
      </SetIsAuthorizedContext.Provider>
    </IsAuthorizedContext.Provider>
  );
}
