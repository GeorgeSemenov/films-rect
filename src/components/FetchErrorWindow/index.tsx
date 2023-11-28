import React from "react";

export default function FetchErrorWindow() {
  return (
    <div style={{ textAlign: "center", padding: "15px" }}>
      <h2>Увы, нам не удалось подгрузить данные с сервера</h2>
      <p>Возможно вам стоит использовать VPN</p>
    </div>
  );
}
