import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Organizer({ email, password }) {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    edrpou: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: formData.name,
        company_name: formData.organization,
        EDRPOU: formData.edrpou,
        email,
        password,
      }),
    };

    fetch("http://localhost:8888/auth/register_org.php", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        toast.success("Успішно зареєструвався!");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => toast.error(error));
  };

  return (
    <div className="login-form container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ПІБ"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          placeholder="Назва організації"
          name="organization"
          value={formData.organization}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          placeholder="Код ЄДРПОУ"
          name="edrpou"
          value={formData.edrpou}
          onChange={handleInputChange}
          required
        />
        <button>Зареєтруватися</button>
      </form>
      <div className="login-form__bottom-text">
        <p>Вже маєте акаунт?</p>
        <NavLink to="/login">Увійти</NavLink>
      </div>
      <Toaster />
    </div>
  );
}
