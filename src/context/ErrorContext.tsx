import React, { createContext, useContext, useState } from "react";

const DisplayedErrorContext = createContext<IDisplayedError | null>(null);
const DisplayedErrorDispatchContext = createContext<React.Dispatch<
  React.SetStateAction<IDisplayedError | null>
> | null>(null);

export default function ErrorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [displayedError, setDisplayedError] = useState<IDisplayedError | null>(
    null
  );
  return (
    <DisplayedErrorContext.Provider value={displayedError}>
      <DisplayedErrorDispatchContext.Provider value={setDisplayedError}>
        {children}
      </DisplayedErrorDispatchContext.Provider>
    </DisplayedErrorContext.Provider>
  );
}

export function useDisplayedError() {
  return useContext(DisplayedErrorContext);
}

export function useDisplayedErrorDispatchContext() {
  return useContext(DisplayedErrorDispatchContext);
}

export interface IDisplayedError {
  error: Error;
  displayDuration?: string;
  displayDelay?: string;
}
