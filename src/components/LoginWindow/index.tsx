import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import { useCookies } from "react-cookie";
import { cookiesNames } from "../../constants";
import isEmailCorrect from "../../utils/isEmailCorrect";

export default function LoginWindow() {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const [isCorrectInput, setIsCorrectInput] = useState(true);
  const [email, setEmail] = useState("");
  const [, setCookie] = useCookies([cookiesNames.isAuthorized]);
  return (
    <form
      className="login-form"
      onSubmit={(e) => {
        e.preventDefault();
        const answer = isEmailCorrect(email);
        setIsCorrectInput(answer);
        if (isEmailCorrect(email)) {
          setCookie(cookiesNames.isAuthorized, true, { maxAge: 3600 * 24 });
          setCookie(cookiesNames.email, email, { maxAge: 3600 * 24 });
        }
      }}
    >
      <div className="login-form__wrapper">
        <span className="login-form__header">
          Для отображения списков фильмов необоходимо авторизоваться
          <br />
          Вы можете просто выдумать email и ввести его. <br />
          Никаких писем отправленно не будет
        </span>
        <TextField
          inputRef={inputRef}
          name="email"
          label="Введите email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="email"
          className="login-form__input"
          onFocus={() => {
            setIsCorrectInput(true);
          }}
        />
        {!isCorrectInput && (
          <span className="login-form__error-message">
            email должен быть в формате
            <br />
            example@email.kek
          </span>
        )}
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className="login-form__send-button"
        >
          Отправить
        </Button>
      </div>
    </form>
  );
}
// jsx
// import React, { useState } from 'react';
// import { TextField, Button } from '@mui/material';

// const MyForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Действия при отправке формы, например, отправка данных на сервер
//     console.log(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextField
//         name="name"
//         label="Имя"
//         value={formData.name}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         name="email"
//         label="Email"
//         value={formData.email}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         name="message"
//         label="Сообщение"
//         value={formData.message}
//         onChange={handleChange}
//         fullWidth
//         multiline
//         rows={4}
//         margin="normal"
//       />
//       <Button type="submit" variant="contained" color="primary">
//         Отправить
//       </Button>
//     </form>
//   );
// };

// export default MyForm;
