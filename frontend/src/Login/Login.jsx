import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8888/auth/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        toast.success("Помилка логування!");
        const error = await response.json();
        setErrorMessage(error.message);
      } else {
        toast.success("Успішно залогінився!");
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-form container">
      {errorMessage && <p className="form__errors">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Увійти</button>
      </form>
      <div className="login-form__bottom-text">
        <p>Немає акаунту?</p>
        <NavLink to="/register">Зареєтруватися</NavLink>
      </div>
      <Toaster />
    </div>
  );
}
