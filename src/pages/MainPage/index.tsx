import React from "react";
import FilmsApp from "../../components/FilmsApp";
import ErrorProvider from "../../context/ErrorContext";
export default function MainPage() {
  return (
    <ErrorProvider>
      <FilmsApp />;
    </ErrorProvider>
  );
}
